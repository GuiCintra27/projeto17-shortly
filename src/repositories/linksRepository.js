import connectionDB from "../database/database.js";

export async function insertUrl(user, url, shortUrl, visitCount) {
    return connectionDB.query(`
        INSERT INTO urls ("userOwner", url, "shortUrl", "visitCount")
        VALUES ($1, $2, $3, $4)
    `,
        [user, url, shortUrl, visitCount]
    );
}

export async function selectUrl(shortUrl){
    return connectionDB.query(`
    SELECT url
    FROM urls
    WHERE "shortUrl" = $1
    `,
        [shortUrl]
    );
}