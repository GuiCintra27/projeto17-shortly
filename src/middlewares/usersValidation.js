import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import connectionDB from "../database/database.js";
import { signInModel, signUpModel } from "../models/usersModel.js";

export async function signUpValidation(req, res, next) {
    const { email, password } = req.body;
    const { error } = signUpModel.validate(req.body, { abortEarly: false });

    try {
        const user = await connectionDB.query(`
        SELECT *
        FROM users
        WHERE email = $1`,
            [email]
        );

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
        } else if (user.rows.length > 0) {
            return res.status(409).send("User already exists");
        }

        const passwordHash = bcrypt.hashSync(password, 10)

        req.password = passwordHash;

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function signInValidation(req, res, next) {
    const { email, password } = req.body;

    const { error } = signInModel.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const user = await connectionDB.query(`
        SELECT id, password 
        FROM users
        WHERE email = $1
        `,
            [email]
        );

        if (user.rows.length === 0 || !bcrypt.compareSync(password, user.rows[0].password)) {
            return res.sendStatus(401);
        }

        const token = uuidv4();

        req.token = token;
        req.userId = user.rows[0].id;

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getUserValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const session = await connectionDB.query(`
        SELECT "userId"
        FROM sessions
        WHERE token = $1
        `,
            [token]
        );

        if (session.rows.length === 0) {
            return res.sendStatus(401);
        }

        const userUrls = await connectionDB.query(`
        SELECT *
        FROM urls
        WHERE "userOwner" = $1
        `,
            [session.rows[0].userId]
        );

        if (userUrls.rows.length === 0) {
            const userData = await connectionDB.query(`
                SELECT users.id, users.name, 
                0 AS "visitCount", ARRAY[]::TEXT[] as "shortenedUrls"
                FROM users
                WHERE users.id = $1
                `,
                [session.rows[0].userId]
            );

            if (userData.rows.length === 0) {
                return res.sendStatus(404);
            }

            req.userData = userData.rows[0];
        } else {
            const userData = await connectionDB.query(`
                SELECT users.id, users.name, 
                    SUM(urls."visitCount") AS "visitCount", json_agg(
                        json_build_object(
                            'id', urls.id, 'shortUrl', urls."shortUrl", 'url', urls.url, 'visitCount', urls."visitCount"
                        )
                    ) AS "shortenedUrls"
                FROM users
                    JOIN urls 
                        ON users.id = urls."userOwner"
                WHERE users.id = $1
                GROUP BY users.id
                `,
                [session.rows[0].userId]
            );

            if (userData.rows.length === 0) {
                return res.sendStatus(404);
            }

            req.userData = userData.rows[0];
        }

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getRankingValidation(req, res, next) {
    try {
        const ranking = await connectionDB.query(`
        SELECT us.id, us.name, 
        COUNT(ur.*) AS "linksCount", sum(ur."visitCount") AS "visitCount" 
        FROM users AS us 
            JOIN urls AS ur 
                ON ur."userOwner" = us.id 
        GROUP BY us.id 
            ORDER BY "visitCount" DESC
                LIMIT 10
        `);

        if (ranking.rows.length === 0) {
            return res.status(200).send([]);
        }

        req.ranking = ranking.rows;

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}