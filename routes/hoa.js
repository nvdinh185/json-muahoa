const express = require('express');
const router = express.Router();

const hoaController = require('../controllers/HoaController');
const middleware = require('../middleware/Middleware');

router.get('/', hoaController.getListHoa);
router.get('/type', hoaController.getListLoaiHoa);
router.get('/:id', middleware.authorize, hoaController.getUserById);

router.post('/login', hoaController.postLogin);
router.post('/add', middleware.uploadFile, hoaController.postAddHoa);
router.put('/update', middleware.authorize, middleware.uploadFile, hoaController.postUpdate);
router.delete('/delete/:id', middleware.authorize, hoaController.postDelete);

module.exports = router;
