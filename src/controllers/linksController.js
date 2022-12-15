import connectionDB from "../database/database.js";
const date = new Date();

export async function createShortenUrl(req, res) {
    const { url } = req.body;
    const user = req.userId;
    const shortUrl = req.shortenedUrl;

    try {
        await connectionDB.query(`
        INSERT INTO urls ("userOwner", url, "shortUrl", "visitCount", "createdAt")
        VALUES ($1, $2, $3, $4, $5)
        `,
            [user, url, shortUrl, 0, date]
        );

        return res.send(shortUrl).status(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getUrl(req, res) {
    const url = req.url;

    return res.status(200).send(url);
}

export async function openUrl(req, res) {
    const { shortUrl } = req.params;

    try {
        const url = await connectionDB.query(`
        SELECT url
        FROM urls
        WHERE "shortUrl" = $1
        `,
            [shortUrl]
        );

        return res.redirect(302, url.rows[0].url);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    return res.sendStatus(204);
}