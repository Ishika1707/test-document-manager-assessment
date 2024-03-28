const express = require("express");
const router = express.Router();
const upload = require("../common/multerFile.js");
const {
  AddFile, login
} = require("../api/controller.js");
const {getFilesByUserId, deleteFile, getVersion} = require("./controller");

router.post("/upload", upload.single("file"), AddFile);
router.post("/login", login);
router.get("/file", getFilesByUserId);
router.delete("/file", deleteFile);
router.post("/file-version", getVersion);

module.exports = router;
