const express = require("express");
const router = express.Router();
const upload = require("../common/multerFile.js");
const {
  AddFile, login
} = require("../api/controller.js");
const {getFilesByUserId, deleteFile} = require("./controller");

router.post("/upload", upload.single("file"), AddFile);
router.post("/login", login);
router.get("/file", getFilesByUserId);
router.delete("/file", deleteFile);

module.exports = router;
