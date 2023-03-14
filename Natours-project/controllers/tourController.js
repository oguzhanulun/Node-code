const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// ); >>>> this for dumb db

/*exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};*/
//checkid middleware mongodb kullanımındaki validationlardan dolayı gereksiz kaldı

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'bad request',
//       message: 'Your tour should include name and price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    //BUİLD QUERY
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    const query = Tour.find(JSON.parse(queryStr));
    //{difficulty:"easy", duration:{$gte:5}}>> gte = greater then and equal
    // gte, gt, lte, lt
    /*
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: easy,
    // });
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals(5);
    */
    //EXECUTE QUERY
    const tours = await query;

    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  // const id = req.params.id * 1; // string 1 ile çarpıldığında sayıya dönüşür. kısa yoldan sayıya döndürme taktiği
  // const tour = tours.find((el) => el.id === id);
  try {
    const tour = await Tour.findById(req.params.id); //Tour.findOne({_id:req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTours = new Tour({})
    // newTours.save()
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data send',
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};
