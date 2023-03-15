const express = require('express');
const router = express.Router();

const hoaHandler = require('./hoa.handler');
const hoaMiddleware = require('./hoa.middleware');

// routes
router.get('/', getListHoa);
router.get('/type', getListHoaType);
router.get('/hoa', getHoaById);

router.post('/add', hoaMiddleware.uploadFile, postAddHoa);
router.post('/edit', hoaMiddleware.uploadFile, postEditHoa);
router.post('/delete', postDeleteHoa);

module.exports = router;

function getListHoa(req, res, next) {
    hoaHandler.getListHoa()
        .then(listHoa => res.json(listHoa))
        .catch(err => next(err));
}

function getListHoaType(req, res, next) {
    hoaHandler.getListHoaType()
        .then(listHoa => res.json(listHoa))
        .catch(err => next(err));
}

function getHoaById(req, res, next) {
    hoaHandler.getHoaById(req.query)
        .then(hoaById => res.json(hoaById))
        .catch(err => next(err));
}

function postAddHoa(req, res, next) {
    hoaHandler.postAddHoa(req.form_data)
        .then(result => res.json(result))
        .catch(err => next(err));
}

function postEditHoa(req, res, next) {
    hoaHandler.postEditHoa(req.form_data)
        .then(result => res.json(result))
        .catch(err => next(err));
}

function postDeleteHoa(req, res, next) {
    hoaHandler.postDeleteHoa(req.body)
        .then(result => res.json(result))
        .catch(err => next(err));
}