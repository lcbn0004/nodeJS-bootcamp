///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  instances of the EventEmitter       Desc                    Example             Impt events    Impt Functions
//
//  READABLE streams                    Streams from which      http requests       data           pipe()
//                                      we can read(consume)    fs read streams     end            read()
//                                      data
//
//  WRITABLE streams                    Streams to which we     http responses      drain          write()
//                                      can write data          fs write streams    finish         end()
//
//  DUPLEX streams                      Streams that are        net web socket
//                                      both readable and
//                                      writable
//
//  TRANSFORM streams                   Duplex streams that     zlib Gzip creation
//                                      transform data as it
//                                      is written or read

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  ///////////////////////////////
  // Solution #1
  // Loading the whole data

  // fs.readFile('./2-how-node-works/final/test-file.txt', (err, data) => {
  //     if(err) {
  //         console.log(err);
  //     }
  //     res.end(data)
  // })

  ///////////////////////////////
  // Solution #2
  // Loading chunks of data

  //   const readable = fs.createReadStream(
  //     './2-how-node-works/final/test-file.txt'
  //   );
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end('File not found!');
  //   });

  ///////////////////////////////
  // Solution #3
  // Loading chunks of data

  const readable = fs.createReadStream(
    './2-how-node-works/final/test-file.txt'
  );
  readable.on('error', (err) => {
    console.log(err);
    res.statusCode = 500;
    res.end('File not found!');
  });
  readable.pipe(res);
  // readableSource.pipe(writeableDestination)
});

/////////////////////////////////
// Starting the server

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening...');
});
