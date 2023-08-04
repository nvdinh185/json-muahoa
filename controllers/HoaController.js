const config = require('../config.json');
const jwt = require('jsonwebtoken');

const mysql = require('mysql');

const configDB = {
    host: "localhost",
    user: "root",
    password: "123456",
    database: "shophoa"
};

class HoaController {

    // [GET] /hoa
    async getListHoa(req, res, next) {
        try {
            var conn = mysql.createConnection(configDB);

            const sqlSelect = `SELECT li.id, li.name, li.image, lo.name AS ten_loai_hoa FROM list_hoa AS li
            JOIN loai_hoa AS lo ON li.cat_id=lo.id`;
            const listHoa = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(listHoa);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /hoa/type
    async getListLoaiHoa(req, res, next) {
        try {
            var conn = mysql.createConnection(configDB);

            const sqlSelect = `SELECT * FROM loai_hoa`;
            const listLoaiHoa = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(listLoaiHoa);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [GET] /user/:id
    async getUserById(req, res, next) {
        var id = req.params.id;
        try {
            var conn = mysql.createConnection(configDB);

            const sqlSelect = `SELECT * FROM users WHERE id = '${id}'`;
            const userById = await new Promise((resolve, reject) => {
                conn.query(sqlSelect, function (err, results) {
                    if (err) reject(err);
                    resolve(results);
                });
            });
            res.status(200).send(userById[0]);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [POST] /user/login
    async postLogin(req, res, next) {
        try {
            var conn = mysql.createConnection(configDB);

            const user = await new Promise((resolve, reject) => {
                conn.query(`SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                })
            })
            // console.log(user[0]);
            if (user && user[0]) {
                const token = jwt.sign({ id: user[0].id, role: user[0].role }, config.secret, {
                    expiresIn: '600000'//10 phút
                });
                const { password, ...userWithoutPassword } = user[0];
                var result = {
                    ...userWithoutPassword,
                    token
                }
                res.status(200).send(result);
            } else {
                throw new Error("Cannot find users!");
            }
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [PUT] /user/add
    async postAddHoa(req, res, next) {
        function generateUuid() {
            return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        var { name, type, file } = req.form_data;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`INSERT INTO list_hoa(id, name, image, cat_id) VALUES (?, ?, ?, ?)`,
                    [generateUuid(), name, file, type], (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    });
            })
            res.status(200).send(result);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [PUT] /user/update
    async postUpdate(req, res, next) {
        var { id, email, fullname, file } = req.form_data;
        // Nếu có chọn ảnh thì update ảnh, nếu không thì lấy lại ảnh cũ
        var avatarSql = file ? `avatar = "${file}"` : `avatar = avatar`;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`UPDATE users SET email = '${email}', fullname = '${fullname}',
                ${avatarSql} WHERE id = '${id}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            })
            res.status(200).send(result);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }

    // [DELETE] /user/delete/:id
    async postDelete(req, res, next) {
        var id = req.params.id;
        try {
            var conn = mysql.createConnection(configDB);

            const result = await new Promise((resolve, reject) => {
                conn.query(`DELETE FROM users WHERE id = '${id}'`, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            })
            res.status(200).send(result);
        } catch (err) {
            next(err);
        } finally {
            conn.end();
        }
    }
}

module.exports = new HoaController();
