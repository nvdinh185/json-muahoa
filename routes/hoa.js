const express = require('express');
const router = express.Router();

const hoaController = require('../controllers/HoaController');
const middleware = require('../middleware/Middleware');

router.get('/', hoaController.getListHoa);
router.get('/type', hoaController.getListLoaiHoa);
router.get('/:id', hoaController.getHoaById);

router.post('/add', middleware.uploadFile, hoaController.postAddHoa);
router.put('/edit', middleware.uploadFile, hoaController.postEditHoa);
router.delete('/delete/:id', hoaController.postDelHoa);

router.post('/login', hoaController.postLogin);

module.exports = router;
