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