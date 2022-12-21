import { createSession, insertUser } from "../repositories/usersRepository.js";

export async function signUp(req, res) {
    const { name, email } = req.body;
    const password = req.password;

    try {
        await insertUser(name, email, password);

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
        await createSession(token, userId);
        
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