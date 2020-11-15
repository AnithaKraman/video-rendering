const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const logger = require('./config/Logger');
const app = express();
var path = require('path')
const noSqlDS = require('./store/noSqlDataStore');
const Constants = require('./config/Constants');
var MongoClient = require('mongodb').MongoClient;

// const sampleRoutes = require('./routes/sampleRoutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

// app.use(sampleRoutes);



app.route('/view-course')
  .get(function (req, res) {
    logger.debug("******************* Entered Routes ********************************")
    try {
      noSqlDS.listTitles().then(
        function (data) {
          // logger.debug(data)
          logger.debug("******************* Exited Routes Successfully ********************************");
          res.send({ data: data });
        }
      ).catch(function (err) {
        logger.debug("Promise rejection error: " + err.stack);
        logger.debug("******************* Exited Routes With Failure ********************************");
        res.sendStatus(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
      }
      );
    } catch (e) {
      console.log(e)
      res.sendStatus(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
    }
  })
  .post(async function (req, res) {
    logger.debug('post invoked')
    // const videoObj = req.body
    const videoObj = req.query
    logger.debug(videoObj)
    let validationErrors = ''
    // logger.debug("validationErrors in route = " + validationErrors)
    if (validationErrors) {
      // logger.error("invalid object")
      res.status(Constants.Response.CODE_BAD_REQUEST).send(Constants.Response.DESC_BAD_REQUEST);
    } else {
      // logger.debug("valid object")
      try {
        noSqlDS.getVideo(videoObj).then(
          function (result) {
            logger.debug(result)
            var id = result.id
            var embed_url = result.embed_url
            var title = result.title
            var day = result.day
            var video = result.video
            // logger.debug(id, embed_url)
            logger.debug("******************* Exited Routes Successfully ********************************");
            res.send({ id: id, embed_url: embed_url, title: title, day: day, video: video });
            // res.end();
          }
        ).catch(function (err) {
          logger.error("Promise rejection error: " + err.stack);
          logger.debug("******************* Exited Routes With Failure ********************************");
          res.sendStatus(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
        }
        );
      } catch (e) {
        logger.error(e)
        res.sendStatus(Constants.Response.CODE_INTRNL_SERV_ERR).send(Constants.Response.DESC_INTRNL_SERV_ERR);
      }
    }
  })




app.listen(Constants.Server.PORT, () => {
  console.log("Node Server started at " + Constants.Server.PORT + ", waiting for requests....");
});
