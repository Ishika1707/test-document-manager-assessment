const fs = require("fs");
const path = require("path");
const {
  findUser,
  findExistingFile,
} = require("../api/service.js");
const {findUserByEmail, passwordMatch} = require("./service");

const filePath = path.join(__dirname, "../contants/userData.json");

//Add File with Versions
const AddFile = async (req, res) => {
  try {
    const { path } = req.file;
    const { userId } = req.body;
    fs.readFile(filePath, "utf8", async (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const userData = JSON.parse(data);
      const user = await findUser(userData, userId);

      if (!user) {
        res.status(400).json({ success: false, message: "User not found" });
        return;
      }
      const existingFileIndex = await findExistingFile(user, path);

      if (existingFileIndex !== -1) {
        const existingFile = user.filePath[existingFileIndex];
        const newVersion = existingFile.version + 1;
        user.filePath.splice(existingFileIndex, 0, {
          url: path,
          version: newVersion,
          name: path.match(/[^/\\]+(?=\.\w+$)/)[0],
        });
      } else {
        user.filePath.push({
          url: path,
          version: 0,
          name: path.match(/[^/\\]+(?=\.\w+$)/)[0],
        });
      }
      const updatedJsonData = JSON.stringify(userData, null, 2);
      fs.writeFile(filePath, updatedJsonData, (err) => {
        if (err) {
          console.error(err);
          res
            .status(500)
            .json({ success: false, message: "Error writing file" });
          return;
        }

        res
          .status(200)
          .json({ success: true, message: "File Added successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        fs.readFile(filePath, "utf8", async (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const userData = JSON.parse(data);
            const user = await findUserByEmail(userData, email);
            const password_Match = await passwordMatch(userData, password);

            if (!user) {
                res.status(400).json({ success: false, message: "User not found" });
                return;
            }
            if (!password_Match) {
                res
                    .status(400)
                    .json({ success: false, message: "Invalid Credentials" });
                return;
            }
            res.status(200).json({
                success: true,
                message: "User Login successfully",
                data: user,
            });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
  AddFile, login
};
