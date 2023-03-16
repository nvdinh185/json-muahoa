const config = require('../config.json');
const jwt = require('jsonwebtoken');

const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/shophoa.db';
const db = new sqlite3.Database(dbFile);

db.serialize();

module.exports = {
    getListHoa,
    getListTypeHoa,
    getHoaById,
    postAddHoa,
    postEditHoa,
    postDeleteHoa
}

async function getListHoa() {
    const listHoa = await new Promise((resolve, reject) => {
        db.all(`SELECT * FROM hoa JOIN loaihoa ON hoa.type = loaihoa.type_id`, (err, row) => {
            if (err) reject(err);
            resolve(row);
        })
    })
    return listHoa;
}

async function getListTypeHoa() {
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

async function postEditHoa(formData) {
    return new Promise((resolve, reject) => {
        db.run(`UPDATE hoa SET name = '${formData.ten}', type = '${formData.loaihoa}', amount = '${formData.soluong}',
        price = '${formData.giaban}', image = "${formData.file ? formData.file : 'image'}" WHERE id = '${formData.id}'`, function (err) {
            if (err) {
                reject(new Error(err.message));
            }
            resolve(this.changes);
        });
    })
}

async function postDeleteHoa(body) {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM hoa WHERE id = ${body.id}`, function (err) {
            if (err) {
                reject(new Error(err.message));
            }
            resolve(this.changes);
        });
    })
}