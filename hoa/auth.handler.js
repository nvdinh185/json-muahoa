const config = require('../config.json');
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/shophoa.db';

module.exports = {
    postLogin
}

async function postLogin(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();

        const user = await new Promise((resolve, reject) => {
            db.each(`SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        // console.log(user);
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.username }, config.secret, {
                expiresIn: '600000'//10 phút
            });
            const { password, ...userWithoutPassword } = user;
            var result = {
                ...userWithoutPassword,
                token
            }
            res.json(result);
        } else {
            throw new Error("Cannot find users!");
        }
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}