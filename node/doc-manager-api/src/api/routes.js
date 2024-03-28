const express = require("express");
const router = express.Router();
const upload = require("../common/multerFile.js");
const {
  AddFile, login
} = require("../api/controller.js");

router.post("/upload", upload.single("file"), AddFile);
router.post("/login", login);

module.exports = router;
