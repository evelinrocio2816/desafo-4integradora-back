const express = require("express");
const router = express.Router();
const passport = require("passport");
const UserController = require("../controllers/user.controllers.js");
const userController = new UserController();
const upload = require("../middleware/multer.js");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", passport.authenticate("jwt", { session: false }), userController.profile);
router.post("/logout", userController.logout);
router.get("/admin", passport.authenticate("jwt", { session: false }), userController.admin);
router.post("/requestPasswordReset", userController.requestPasswordReset); 
router.post('/reset-password', userController.resetPassword);

router.put('/premium/:uid', userController.togglePremium)


router.post('/:uid/documents', upload.fields([{ name: 'document' }, { name: 'products' }, { name: 'profile' }]), userController.uploadDocuments);

module.exports = router