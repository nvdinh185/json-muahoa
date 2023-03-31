const express = require('express');
const router = express.Router();

const hoaHandler = require('./hoa.handler');
const hoaMiddleware = require('./hoa.middleware');

// routes
router.get('/', hoaHandler.getListHoa);
router.get('/type', hoaHandler.getListTypeHoa);
router.get('/hoa', hoaHandler.getHoaById);

router.post('/add', hoaMiddleware.uploadFile, hoaHandler.postAddHoa);
router.post('/edit', hoaMiddleware.uploadFile, hoaHandler.postEditHoa);
router.post('/delete', hoaHandler.postDeleteHoa);

module.exports = router;