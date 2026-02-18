require("dotenv").config()
const db = require("./models")
const server = require("./app")


const PORT = process.env.PORT || 8000;

db.sequelize.sync({force: true}).then(() => {
    console.log("All models were synchronized successfully.");

    server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
})