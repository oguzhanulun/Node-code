const mongoose = require('mongoose');
const dotenv = require('dotenv');

// UNHANDLED REJECTİONS
process.on('unhandledRejection', (err) => {
  console.log('unhandled rejection >>>>> shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

//UNCAUGHT EXCEPTIONS

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception >>>>> shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});
////////////////////////////////
dotenv.config({ path: './config.env' });
const app = require('./app');

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(db).then(() => {
  console.log('DB connection successfull');
  console.log(process.env.NODE_ENV);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
