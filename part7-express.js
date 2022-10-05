const e = require('express');
const express = require('express');
const fs = require('fs');
const { addAbortSignal } = require('stream');
const morgan = require('morgan');

const app = express();

////////////////////////////////
// Middlewares

app.use(morgan('dev'));

// Middleware for JSON type transactions
app.use(express.json());

// Middleware that logs 'Hello from the middleware 👋' in transactions
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

// Middleware that adds requestTime to req
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////////////////////////////////////////////////////////////////////
// INTRODUCTION

// app.get('/', (req, res) => {
//   // HTML response
// //   res.status(200).send('Hello from the server side!');
//   // JSON response
//     res
//       .status(200)
//       .json({ message: 'Hello from the server side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port: ${port}...`);
// });

//////////////////////////////////////////////////////////////////////////////
// START

// JSON.parse --> converts the JSON string to JavaScript Object
const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/4-natours/after-section-06/dev-data/data/tours-simple.json`
  )
);

//////////////////////////////////////
// Simplified CRUD operations

const endpointsModule = require(`${__dirname}/part7-endpoints.js`);
const allTours = endpointsModule.allTours;
const tourByID = endpointsModule.tourByID;

const callbacksModule = require(`${__dirname}/part7-callbacks.js`);
const getAllTour = callbacksModule.getAllTour;
const getTourByID = callbacksModule.getTourByID;
const postTour = callbacksModule.postTour;
const patchTour = callbacksModule.patchTour;
const deleteTour = callbacksModule.deleteTour;

// // GET all tours
// app.get(allTours, getAllTour);
// // GET tour
// app.get(tourByID, getTourByID);
// // CREATE new tour
// app.post(allTours, postTour);
// // UDATE tour
// app.patch(tourByID, patchTour);
// // DELETE tour
// app.delete(tourByID, deleteTour);

///////////////////////////////////////
// More simplified CRUD

app.route(allTours).get(getAllTour).post(postTour);
app.route(tourByID).get(getTourByID).patch(patchTour).delete(deleteTour);

//////////////////////////////////////
// Endpoint - GET - all tours

// route handler
// app.get('/api/v1/tours', (req, res) => {
//   // status 200 means OK
//   res.status(200).json({
//     status: 'Success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

//////////////////////////////////////
// Endpoint - GET - tour id

// app.get('/api/v1/tours/:id', (req, res) => {
//   // converts req.params.id string value to number
//   const id = req.params.id * 1;
//   // iterate tours
//   // tours.find() return the elements that is true
//   // in this case, the value of :id that equals el.id
//   const tour = tours.find((el) => el.id === id);

//   // if(id > tours.length) {
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid id',
//     });
//   }

//   console.log(tours[id]);
//   console.log(tours[id] === undefined);
//   // status 200 means OK
//   res.status(200).json({
//     status: 'Success',
//     tour: tour,
//   });
//   res.send(tours[req.id]);
// });

//////////////////////////////////////
// Endpoint - POST - creating tour

// app.post('/api/v1/tours', (req, res) => {
//   //   console.log(req.body);
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign(
//     {
//       id: newId,
//     },
//     req.body
//   );

//   tours.push(newTour);

//   // JSON.stringiry --> converts the JavaScript Object to JSON string
//   // writeFile(path, data, callback)
//   fs.writeFile(
//     `${__dirname}/4-natours/after-section-06/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       // status 201 means created
//       res.status(201).json({
//         status: 'Success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// });

//////////////////////////////////////
// Endpoint - PATCH - updating tour

// app.patch('/api/v1/tours/:id', (req, res) => {
//   // converts req.params.id string value to number
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     // if(!tour) {
//     return res.status(404).json({
//       status: 'failed',
//       message: `ID: ${id} not found`,
//     });
//   }

//   res.status(200).json({
//     status: 'success',
//     'updated tour': tours[id],
//   });
// });

//////////////////////////////////////
// Endpoint - DELETE - deleting tour

// app.delete('/api/v1/tours/:id', (req, res) => {
//   // converts req.params.id string value to number
//   const id = req.params.id * 1;
//   if (id > tours.length) {
//     // if(!tour) {
//     return res.status(404).json({
//       status: 'failed',
//       message: `ID: ${id} not found`,
//     });
//   }

//   // 204 no content
//   res.status(204).json({
//     status: 'success',
//     'updated tour': null,
//   });
// });

//////////////////////////////////////
// Server creation

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});

exports.tours = tours;
