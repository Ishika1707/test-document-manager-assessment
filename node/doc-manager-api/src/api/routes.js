const express = require("express");
const router = express.Router();
const upload = require("../common/multerFile.js");
const {
  AddFile
} = require("../api/controller.js");

router.post("/upload", upload.single("file"), AddFile);

module.exports = router;
