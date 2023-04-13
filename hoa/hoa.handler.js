const sqlite3 = require('sqlite3').verbose();
const dbFile = './database/shophoa.db';

module.exports = {
    getListHoa,
    getListTypeHoa,
    getHoaById,
    postAddHoa,
    postEditHoa,
    postDeleteHoa
}

async function getListHoa(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const listHoa = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM hoa JOIN loaihoa ON hoa.type = loaihoa.type_id`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(listHoa);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function getListTypeHoa(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const listHoaType = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM loaihoa`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(listHoaType);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function getHoaById(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        const hoaById = await new Promise((resolve, reject) => {
            db.each(`SELECT * FROM hoa JOIN loaihoa ON hoa.type = loaihoa.type_id WHERE hoa.id = ${req.query.id}`, (err, row) => {
                if (err) reject(err);
                resolve(row);
            })
        })
        res.json(hoaById);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function postAddHoa(req, res, next) {
    var formData = req.form_data;
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        var result = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO hoa (name, type, amount, price, image) VALUES (?, ?, ?, ?, ?)`,
                [formData.ten, formData.loaihoa, formData.soluong, formData.giaban, formData.file], function (err) {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    resolve(this.changes);
                });
        })
        res.json(result);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function postEditHoa(req, res, next) {
    var formData = req.form_data;
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        var result = await new Promise((resolve, reject) => {
            db.run(`UPDATE hoa SET name = '${formData.ten}', type = '${formData.loaihoa}', amount = '${formData.soluong}',
        price = '${formData.giaban}', image = "${formData.file ? formData.file : 'image'}" WHERE id = '${formData.id}'`, function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
        })
        res.json(result);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}

async function postDeleteHoa(req, res, next) {
    try {
        var db = new sqlite3.Database(dbFile);
        db.serialize();
        var result = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM hoa WHERE id = ${req.body.id}`, function (err) {
                if (err) {
                    reject(new Error(err.message));
                }
                resolve(this.changes);
            });
        })
        res.json(result);
    } catch (err) {
        next(err);
    } finally {
        db.close();
    }
}