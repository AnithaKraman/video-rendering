const logger = require('../config/Logger');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://dev_user:test@dev.mtjwu.mongodb.net/codepannu?retryWrites=true&w=majority';

exports.createMessage = function (messageObj) {
  logger.debug("################### Entered SQLDataStore ################################");
  let DATA = {
    name: messageObj.name,
    email: messageObj.email,
    message: messageObj.messagefield,
    created_on: new Date()
  };
  logger.debug(DATA)
  logger.debug("################### Entered SQLDataStore ################################");
  return new Promise(function (resolve, reject) {
    // Create the db connection
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        // return res.send({ message: "Mongo connection failed" })
        reject(new Error('Ooops, something broke!'));
      } else {
        var dbObj = client.db('codepannu')
        var dbCollection = dbObj.collection("messages")
        dbCollection.insertOne(DATA, function (err, res) {
          if (err) {
            client.close();
            reject(new Error('Ooops, something broke!'));
          }
          else {
            logger.debug("1 document inserted")
            client.close();
            resolve(true)
          }
        })
      }
      // assert.equal(null, err);
      // mongodb=db;
    });
  });
};



exports.createAssignment = function (assignmentObj) {
  logger.debug("################### Entered SQLDataStore ################################");
  logger.debug(assignmentObj.name, assignmentObj.email, assignmentObj.level, assignmentObj.day, assignmentObj.answer1)
  let DATA = {
    name: assignmentObj.name,
    email: assignmentObj.email,
    level: assignmentObj.level,
    day: assignmentObj.day,
    answer: assignmentObj.answer1,
    created_on: new Date()
  };
  logger.debug(DATA)
  return new Promise(function (resolve, reject) {
    // Create the db connection
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        // return res.send({ message: "Mongo connection failed" })
        reject(new Error('Ooops, something broke!'));
      } else {
        var dbObj = client.db('codepannu')
        var dbCollection = dbObj.collection("assignments")
        dbCollection.insertOne(DATA, function (err, res) {
          if (err) {
            client.close();
            reject(new Error('Ooops, something broke!'));
          }
          else {
            logger.debug("1 document inserted")
            client.close();
            resolve(true)
          }
        })
      }
      // assert.equal(null, err);
      // mongodb=db;
    });
  });
};



exports.listTitles = function () {
  logger.debug("################### Entered SQLDataStore ################################");
  return new Promise(function (resolve, reject) {
    // Create the db connection
    MongoClient.connect(url, function (err, client) {
      if (err) {
        // return res.send({ message: "Mongo connection failed" })
        reject(new Error('Ooops, something broke!'));
      } else {
        var dbObj = client.db('codepannu')
        var dbCollection = dbObj.collection("videos")
        dbCollection.find({}).toArray(function (err, data) {
          if (err) {
            client.close();
            reject(new Error('Ooops, something broke!'));
          }
          else {
            logger.debug(data)
            client.close();
            resolve(data)
          }
        })
      }
      // assert.equal(null, err);
      // mongodb=db;
    });
  });
};



exports.getVideo = function (videoObj) {
  logger.debug("################### Entered SQLDataStore ################################");
  logger.debug(videoObj.id)
  DATA = 0
  if (videoObj.func == 'prevClick') {
    if (videoObj.id == 1) var DATA = [parseInt(videoObj.id)];
    else var DATA = parseInt(videoObj.id) - 1;
  }
  else if (videoObj.func == 'nextClick') {
    logger.debug('next click invoked')
    var DATA = parseInt(videoObj.id) + 1;
  }
  else {
    var DATA = parseInt(videoObj.id)
  }
  logger.debug('printing the data')
  logger.debug(DATA)
  return new Promise(function (resolve, reject) {
    // Create the db connection
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
      if (err) {
        // return res.send({ message: "Mongo connection failed" })
        reject(new Error('Ooops, something broke!'));
      } else {
        var dbObj = client.db('codepannu')
        var dbCollection = dbObj.collection("videos")
        dbCollection.findOne({id:DATA}, function (err, result) {
          if (err) {
            client.close();
            reject(new Error('Ooops, something broke!'));
          }
          else {
            // logger.debug("1 document inserted")
            client.close();
            resolve(result)
          }
        })
      }
      // assert.equal(null, err);
      // mongodb=db;
    });
  });
};


