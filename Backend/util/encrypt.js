// Requiring module
const bcrypt = require("bcryptjs");

// Encryption of the string password
const encrypt = async (password) => {
  bcrypt.genSalt(10, function (err, Salt) {
    bcrypt.hash(password, Salt, function (err, hash) {
      if (err) {
        console.log("Cannot encrypt");
      } else {
        return hash;
      }
    });
  });
};

const compare = (password, hash) => {
  bcrypt.compare(password, hash, async function (err, isMatch) {
    if (isMatch) {
      console.log("passwords match");
    } else {
      console.log("password dont match");
    }
  });
};

const tempp = async (pw) => {
  kk = await bcrypt.hash(pw, 10);
  console.log(kk);
  zz = await bcrypt.compare(pw, kk);
  console.log(zz);
};
