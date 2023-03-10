// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const fs = require('fs');
// const Tour = require('./../../models/tourModel');

// const tours = JSON.parse(
//   fs.readdirSync(`${__dirname}/tours-simple.json`, 'utf-8')
// );

// //IMPORT DATA TO DATABASE

// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     console.log('Data succesfully loaded');
//   } catch (error) {
//     console.log(error);
//   }
// };

// //DELETE ALL DATA FROM COLLECTİON

// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     console.log('Data succesfully deleted');
//   } catch (error) {
//     console.log(error);
//   }
// };
