const fs = require('fs');
const data = require(`${__dirname}/part7-express.js`);

const getAllTour = (req, res) => {
  try {
    console.log('Get all tour..');
    const tours = data.tours;
    // status 200 means OK
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

const getTourByID = (req, res) => {
  try {
    const tours = data.tours;
    // converts req.params.id string value to number
    const id = req.params.id * 1;
    console.log(`Get tour with id: ${id}`);
    // iterate tours
    // tours.find() return the elements that is true
    // in this case, the value of :id that equals el.id
    const tour = tours.find((el) => el.id === id);

    // if(id > tours.length) {
    if (!tour) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Invalid id',
      });
    }

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

const postTour = (req, res) => {
  try {
    const tours = data.tours;
    // Creating new tour
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign(
      {
        id: newId,
      },
      req.body
    );
    console.log('Created new tour');
    // Adding tour to the list
    tours.push(newTour);

    // JSON.stringiry --> converts the JavaScript Object to JSON string
    // writeFile(path, data, callback)
    fs.writeFile(
      `${__dirname}/4-natours/after-section-06/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        // status 201 means created
        res.status(201).json({
          status: 'Success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const patchTour = (req, res) => {
  try {
    const tours = data.tours;
    // converts req.params.id string value to number
    const id = req.params.id * 1;
    console.log(`Updated tour with id: ${id}`);
    if (id > tours.length) {
      // if(!tour) {
      return res.status(404).json({
        status: 'Failed',
        message: `ID: ${id} not found`,
      });
    }

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
    console.log('Deleted last entry');
    const tours = data.tours;
    // converts req.params.id string value to number
    const id = req.params.id * 1;
    if (id > tours.length) {
      // if(!tour) {
      return res.status(404).json({
        status: 'Failed',
        message: `ID: ${id} not found`,
      });
    }
    // deletes the entry at the end of the list
    tours.pop();
    // 204 no content
    res.status(204).json({
      status: 'Success',
      'updated tour': null,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getAllTour = getAllTour;
module.exports.getTourByID = getTourByID;
module.exports.postTour = postTour;
module.exports.patchTour = patchTour;
module.exports.deleteTour = deleteTour;
