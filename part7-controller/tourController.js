const fs = require('fs');
const path = require('path');
const writeData = require(`../part7-fileConfig/part7-writeToFile.js`);

let reqPath = path.join(
  __dirname,
  '../4-natours/after-section-06/dev-data/data/tours-simple.json'
);

const tours = JSON.parse(fs.readFileSync(reqPath));

const checkID = (req, res, next, val) => {
  console.log(`ID: ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Failed',
      message: 'Invalid ID..',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    const missingItem = [];
    if (!req.body.name) missingItem.push('name');
    if (!req.body.price) missingItem.push('price');
    return res.status(400).json({
      status: 'Failed',
      message: 'Missing ' + missingItem,
    });
  }
  next();
};

const getAllTour = (req, res) => {
  try {
    // status 200 means OK
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getTour = (req, res) => {
  try {
    // converts req.params.id string value to number
    const id = req.params.id * 1;
    // iterate tours
    // tours.find() return the elements that is true
    // in this case, the value of :id that equals el.id
    const tour = tours.find((el) => el.id === id);

    // if(id > tours.length) {
    // if (!tour) {
    //   return res.status(404).json({
    //     status: 'Failed',
    //     message: 'Invalid id',
    //   });
    // }

    // status 200 means OK
    res.status(200).json({
      status: 'Success',
      tour: tour,
    });
    res.send(tours[req.id]);
  } catch (err) {
    console.log(err);
  }
};

const createTour = (req, res) => {
  try {
    // Creating new tour
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign(
      {
        id: newId,
      },
      req.body
    );
    // Adding tour to the list
    tours.push(newTour);
    writeData.writeToFile(req, res, tours, newTour);
    console.log(
      `${__dirname}/4-natours/after-section-06/dev-data/data/tours-simple.json`
    );
    // JSON.stringiry --> converts the JavaScript Object to JSON string
    // writeFile(path, data, callback)
  } catch (err) {
    console.log(err);
  }
};

const patchTour = (req, res) => {
  try {
    // converts req.params.id string value to number
    // const id = req.params.id * 1;
    // if (id > tours.length) {
    //   // if(!tour) {
    //   return res.status(404).json({
    //     status: 'Failed',
    //     message: `ID: ${id} not found`,
    //   });
    // }

    res.status(200).json({
      status: 'Success',
      'update tour id': id,
      'updated tour': tours[id],
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTour = (req, res) => {
  try {
    // converts req.params.id string value to number
    // const id = req.params.id * 1;
    // if (id > tours.length) {
    //   // if(!tour) {
    //   return res.status(404).json({
    //     status: 'Failed',
    //     message: `ID: ${id} not found`,
    //   });
    // }
    // deletes the entry at the end of the list
    const last = tours[tours.length - 1];
    tours.pop();
    writeData.writeToFile(req, res, tours, last);
    // 204 no content
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  checkID: checkID,
  checkBody: checkBody,
  getAllTour: getAllTour,
  getTour: getTour,
  createTour: createTour,
  updateTour: patchTour,
  deleteTour: deleteTour,
};
