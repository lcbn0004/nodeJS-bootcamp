const fs = require('fs');
const path = require('path')


exports.writeToFile = (req, res, tours, tour) => {
  let reqPath = path.join(__dirname, '../4-natours/after-section-06/dev-data/data/tours-simple.json')
  fs.writeFile(
    reqPath,
    JSON.stringify(tours),
    (err) => {
      // status 201 means created
      res.status(201).json({
        status: 'Success',
        data: {
          tour: tour,
        },
      });
    }
  );
};
