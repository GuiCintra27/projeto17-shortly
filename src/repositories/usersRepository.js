import connectionDB from "../database/database.js";

export async function insertUser(name, email, password) {
    return connectionDB.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        `,
        [name, email, password]
    );
}

export async function createSession(token, userId){
    return connectionDB.query(`
    INSERT INTO sessions (token, "userId")
    VALUES ($1, $2)
    `,
        [token, userId]
    );
}