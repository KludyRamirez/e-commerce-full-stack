var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://bananauyu-default-rtdb.asia-southeast1.firebasedatabase.app",
});

module.exports = admin;
