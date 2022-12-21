import { insertUrl, selectUrl } from "../repositories/linksRepository.js";

export async function createShortenUrl(req, res) {
    const { url } = req.body;
    const user = req.userId;
    const shortUrl = req.shortenedUrl;
    const visitCount = 0;

    try {
        await insertUrl(user, url, shortUrl, visitCount);

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
        const url = await selectUrl(shortUrl);

        return res.redirect(302, url.rows[0].url);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function deleteUrl(req, res) {
    return res.sendStatus(204);
}