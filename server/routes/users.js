var express = require('express');
var router = express.Router();
const {findUser,registerUser,loginUser} = require('../controllers/user-controller')
const { isLogin } = require('../middlewares/isLogin')

router.get('/', isLogin, findUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;
