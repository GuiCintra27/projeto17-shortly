import connectionDB from "../database/database.js";

export async function signUp(req, res) {
    const { name, email } = req.body;
    const password = req.password;

    try {
        await connectionDB.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        `,
            [name, email, password]
        );

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const token = req.token;
    const userId = req.userId;

    try {
        await connectionDB.query(`
        INSERT INTO sessions (token, "userId")
        VALUES ($1, $2)
        `,
            [token, userId]
        );
        return res.send({ token }).status(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getUser(req, res) {
    const userData = req.userData;

    return res.status(200).send(userData);
}

export async function getRanking(req, res) {
    const ranking = req.ranking;

    return res.status(200).send(ranking);
}