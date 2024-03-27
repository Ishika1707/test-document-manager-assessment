const findUser = (userData, userId) => {
  const user = userData.users.find((user) => user.id === +userId);
  return user;
};

const findUserByEmail = (userData, email) => {
  const user = userData.users.find((user) => user.email === email);
  const data = {
    id: user?.id,
    name: user?.name,
    email: user?.email,
    address: user?.address,
  };
  return data;
};

const passwordMatch = (userData, password) => {
  const user = userData.users.find((user) => user.password === password);
  return user;
};

const findExistingFile = (user, path) => {
  const existingFileIndex = user.filePath.findIndex(
    (file) => file.url === path
  );
  return existingFileIndex;
};

const getVersionFile = (file, version, name) => {
  const data = file?.filePath.find(
    (ele) => ele.version == +version && ele.name == name
  );
  return data;
};

const deleteFileService = (file, version, name) => {
  const data = file?.filePath.filter(
    (ele) => ele.version == +version && ele.name == name
  );
  return data;
};

module.exports = {
  findUser,
  findExistingFile,
  getVersionFile,
  deleteFileService,
  findUserByEmail,
  passwordMatch,
};
