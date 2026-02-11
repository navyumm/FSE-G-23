const sequelize = require("../config/db.js")
const User = require("./user.model.js")(sequelize)


const db = {}
db.sequelize = sequelize;
db.User = User;

// relation


module.exports = db;