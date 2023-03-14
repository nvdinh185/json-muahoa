const config = require('../config.json');
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/shophoa.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    getListHoa,
    getListHoaType,
    getHoaById,
    // postLogin,
    postAddHoa
}

async function getListHoa() {
    const listHoa = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM hoa`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listHoa;
}

async function getListHoaType() {
    const listHoaType = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM loaihoa`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listHoaType;
}

async function getHoaById(query) {
    const hoaById = await new Promise((resolve, reject) => {
        db.each(`SELECT * FROM hoa JOIN loaihoa ON hoa.type = loaihoa.type_id WHERE hoa.id = ${query.id}`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return hoaById;
}

async function postLogin(body) {
    try {
        const users = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM users WHERE email = '${body.email}' AND password = '${body.password}'`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        // console.log(users);
        if (users && users[0]) {
            const token = jwt.sign({ id: users[0].id, role: users[0].role }, config.secret);
            const { password, ...userWithoutPassword } = users[0];
            return {
                ...userWithoutPassword,
                token
            };
        } else {
            throw new Error("Cannot find users!");
        }

    } catch (error) {
        throw new Error(error);
    }
}

async function postAddHoa(formData) {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO hoa (name, type, amount, price, image) VALUES (?, ?, ?, ?, ?)`,
            [formData.ten, formData.loaihoa, formData.soluong, formData.giaban, formData.file], function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
    })
}