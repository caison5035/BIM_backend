const app = require('./bin/app');
const config = require('./config/config');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
var path = require('path');
mongoose.Promise = global.Promise;

let server;
const connectionSuccessHandler = () => {
    console.log('Connected to MongoDB');
    server = app.listen(config.PORT, () => {
      console.log(`Listening to port ${config.PORT}`);
    });
}


const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedExceptionHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedExceptionHandler);
process.on('unhandledRejection', unexpectedExceptionHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});

// Setting the root path for the project
global.appRoot = path.resolve(__dirname);

mongoose.connect(config.DB_URL, config.DB_OPTIONS).then(() => connectionSuccessHandler());
