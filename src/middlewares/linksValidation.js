import { nanoid } from 'nanoid';
import connectionDB from "../database/database.js";

export async function createShortenUrlValidation(req, res, next) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const sessionExists = await connectionDB.query(`
        SELECT "userId"
        FROM sessions
        WHERE token = $1
        `,
            [token]
        );

        if (sessionExists.rows.length === 0) {
            return res.sendStatus(401);
        }

        if (url.substr(0, 8) !== 'https://') {
            return res.status(422).send('Invalid url. Expect "https://"');
        }

        const shortenedUrl = nanoid(14);

        req.userId = sessionExists.rows[0].userId;
        req.shortenedUrl = shortenedUrl;

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getUrlValidation(req, res, next){
    const { id } = req.params;
    console.log(id);
    try {
        const url = await connectionDB.query(`
        SELECT id, "shortUrl", url
        FROM urls
        WHERE id = $1
        `,
        [id]        
        );

        if (url.rows.length === 0){
            return res.sendStatus(404);
        }

        req.url = url.rows[0];

        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function openUrlValidation(req, res, next){
    const {shortUrl} = req.params;

    try {      
        const update = await connectionDB.query(`
        UPDATE urls
        SET "visitCount" = "visitCount" + 1
        WHERE "shortUrl" = $1
        `,
        [shortUrl]
        );
        
        if(update.rowCount === 0){
            return res.sendStatus(404);
        }
    
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

}