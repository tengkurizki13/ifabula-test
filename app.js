const env = require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
const cron = require('node-cron');
const NoteController = require('./controllers/NoteController');
// const moment = require('moment-timezone');

const port = process.env.PORT || 3030;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);


app.listen(port, () => {
  cron.schedule('0 0 * * *', async () => {
    // Menjalankan fungsi checkReturnDates setiap hari pukul 00:00
    await NoteController.checkReturnDates();
  });

  let d = new Date()
  console.log(d);
  
    console.log(`Example app listening on port ${port}`);
  });
  
