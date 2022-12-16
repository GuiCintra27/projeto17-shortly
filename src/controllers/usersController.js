import connectionDB from "../database/database.js";
const date = new Date();

export async function signUp(req, res) {
    const { name, email } = req.body;
    const password = req.password;

    try {
        await connectionDB.query(`
        INSERT INTO users (name, email, password, "createdAt")
        VALUES ($1, $2, $3, $4)
        `,
            [name, email, password, date]
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
        INSERT INTO sessions (token, "userId", "createdAt")
        VALUES ($1, $2, $3)
        `,
            [token, userId, date]
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