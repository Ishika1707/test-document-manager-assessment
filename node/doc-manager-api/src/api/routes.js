const express = require("express");
const router = express.Router();
const upload = require("../common/multerFile.js");
const {
  AddFile, login
} = require("../api/controller.js");
const {getFilesByUserId} = require("./controller");

router.post("/upload", upload.single("file"), AddFile);
router.post("/login", login);
router.get("/file", getFilesByUserId);

module.exports = router;
