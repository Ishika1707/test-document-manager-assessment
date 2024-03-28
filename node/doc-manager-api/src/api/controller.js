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

//Get User Files
const getFilesByUserId = (req, res) => {
    try {
        const { userId } = req.query;
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

            return res
                .status(200)
                .json({ success: true, message: "Files Get successfully", data: user });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

const deleteFile = async (req, res) => {
    try {
        const { userId, version, name } = req.body;

        fs.readFile(filePath, "utf8", async (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "Error reading file" });
                return;
            }

            const userData = JSON.parse(data);
            const user = await findUser(userData, userId);

            if (!user) {
                res.status(400).json({ success: false, message: "User not found" });
                return;
            }

            const fileIndex = user.filePath.findIndex(
                (file) => file.version === version && file.name === name
            );

            if (fileIndex === -1) {
                res.status(400).json({ success: false, message: "File not found" });
                return;
            }

            user.filePath.splice(fileIndex, 1); // Remove the file from user's file list

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
                    .json({ success: true, message: "File deleted successfully" });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
  AddFile, login, getFilesByUserId, deleteFile
};
