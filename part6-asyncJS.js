const fs = require('fs');
const superagent = require('superagent');

///////////////////////////////////////////////
// Defining Async read file using promise
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find the file...');
      resolve(data);
    });
  });
};

///////////////////////////////////////////////
// http request on dog-ceo API
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Could not write file...');
      resolve('success');
    });
  });
};

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// Step 4 - using async await

const getDogPic = async () => {
  try {
    const data = await readFilePro(
      `${__dirname}/3-asynchronous-JS/final/dog.txt`
    );
    console.log(`Breed: ${data}`);

    const res1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1, res2, res3]);
    const imgs = all.map(el => el.body.message)
    console.log(imgs);

    await writeFilePro('./dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};

////////////////////////////////////////////////////////////////////////////////////////////
// Step 5
(async () => {
  try {
    console.log('1: Will get dog pic!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (error) {
    console.log('Error found');
  }
})();
////////////////////////////////////////////////////////////////////////////////////////////
// Step 4
// console.log('1: Will get dog pic!');
// // const x = getDogPic();
// getDogPic()
//   .then((x) => {
//     console.log(x);
//     console.log('3: Done getting dog pics!');
//   })
//   .catch((err) => {
//     console.log('Error found');
//   });

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// Step 3 - using promise to all using then after then

// readFilePro(`${__dirname}/3-asynchronous-JS/final/dog.txt`)
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('./dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// Step 1 - Using Async

// fs.readFile(`${__dirname}/3-asynchronous-JS/final/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

///////////////////////////////////////////////
// http request on dog-ceo API

// superagent
//   .get(`https://dog.ceo/api/breed/${data}/images/random`)
//   .end((err, res) => {
//     if (err) {
//       return console.log(err.message);
//     }
//     console.log(res.body.message);

//     fs.writeFile('dog-img.txt', res.body.message, (err) => {
//       console.log('Random dog image saved to file!');
//     });
//   });

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
// Step 2 - Using Async with promist (then method)

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog-img.txt', res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log('Random dog image saved to file!');
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
