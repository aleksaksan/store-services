require('dotenv').config();
const express = require('express');
const sequelize = require('./db');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).json({message: 'working!'})
})

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelize.sync({ force: true });
    // sequelize.sync({ alter: true });

    app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });
  } catch (error) {
    console.log(error);
  }
};

start();
