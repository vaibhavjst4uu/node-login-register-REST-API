const express = require("express");
const router = express.Router();
const userCtrl = require("../Controllers/userController");
// const midd = require('../middleware/errorHandling');

// let validateCredentials = async(req,res,next)=>{
//     let {username, password} = req.body;
// }

router.get("/", (req, res) => {
  res.send("i am working");
  // res.render('home');
});


//register user
router.get("/login", userCtrl.loginForm);
router.post("/login", userCtrl.login);
router.post("/register", userCtrl.register);
router.get("/register", userCtrl.renderForm);

// router.post('/add', userCtrl.addUser);

// router.get('/register', (req,res)=>{
//     res.render('register');
// });

module.exports = router;
