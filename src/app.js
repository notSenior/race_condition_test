const express = require('express');
const sequelize = require('./config/database');

require("./db/models/userDbModel")
const User = require("./models/user")
User.create(1, 10000).catch(_ => {
  console.log("user already exists");
})

const userController = require('./controllers/userController');
const userValidator = require('./validators/userValidator');
const errorHandler = require('./middlewares/errorHandler');


const app = express();
app.use(express.json());

app.post('/update-balance', userValidator, userController.updateBalance);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.authenticate();
  console.log(`Example app listening on port ${PORT}`);
});