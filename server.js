const app = require(`${__dirname}/part7-express`)

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});