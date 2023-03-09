const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { CreateModels } = require('./src/utils/utils.js');


const {PORT} = process.env

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  server.listen(PORT, () => {
    CreateModels()
    console.log(`%s listening at port ${PORT}`); // eslint-disable-line no-console
  });
});