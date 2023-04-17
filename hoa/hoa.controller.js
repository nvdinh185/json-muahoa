const express = require('express');
const router = express.Router();

const hoaHandler = require('./hoa.handler');
const hoaMiddleware = require('./hoa.middleware');
const authHandler = require('./auth.handler');

// routes
router.get('/', hoaMiddleware.authorize, hoaHandler.getListHoa);
router.get('/type', hoaMiddleware.authorize, hoaHandler.getListTypeHoa);
router.get('/hoa', hoaMiddleware.authorize, hoaHandler.getHoaById);

router.post('/add', hoaMiddleware.uploadFile, hoaHandler.postAddHoa);
router.post('/edit', hoaMiddleware.uploadFile, hoaHandler.postEditHoa);
router.post('/delete', hoaMiddleware.authorize, hoaHandler.postDeleteHoa);

router.post('/login', authHandler.postLogin);

module.exports = router;