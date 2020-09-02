const express = require('express');
const bodyParser = require('body-parser');
const request=require('request');
const HMConstants = require('./config/HMConstants');
const logger = require('./config/HMLogger');
const sqlDS = require('./store/sqlDataStore');
const app = express();
var path = require('path')
const PORT = 3000;
// const sampleRoutes = require('./routes/sampleRoutes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

// app.use(sampleRoutes);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render(__dirname + '/views/index');
});


app.get('/assignments', function (req, res) {
    res.render(__dirname + '/views/assignments');
});


app.get('/aboutUs', function (req, res) {
  res.render(__dirname + '/views/aboutUs');
});

app.get('/python-courses', function (req, res) {
  res.render(__dirname + '/views/courses');
});

app.get('/recaptcha', function (req, res) {
  res.render(__dirname + '/views/recaptcha');
});

app.get('/list-assignments', function (req, res) {
  res.render(__dirname + '/views/listAssignments');
});

app.post('/subscribe',function (req, res) {
  console.log(req.body.name)

  // console.log(req.body.captcha)
if (req.body.captcha===undefined || req.body.captcha==='' || req.body.captcha===null){

  return (res.json({'success':false,'msg':'Please select capcha'}))
}
//secret key
const secretKey='6LfYX8QZAAAAAFOp_VwVFAVHmXXKesAWucXnmrDy'

//verify URL
const verifyURL=`https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`

//make request to verify url
request(verifyURL, (err,response,body)=>{ 
body=JSON.parse(body)
// console.log(body)
if(body.success!==undefined && !body.success){

  return res.json({'sucess':false,'msg':'failed capcha verification'})
}
return res.json({'sucess':true,'msg':'capcha verified'})
})

})



app.post('/message', async (req, res) => {
    logger.debug("******************* Entered Routes ********************************");
    const messageObj = req.body
    logger.debug("from static instance is " + messageObj)
  
    let validationErrors = ''
    // logger.debug("validationErrors in route = " + validationErrors)
    if (validationErrors) {
      logger.error("invalid object")
      res.status(HMConstants.Response.CODE_BAD_REQUEST).send(HMConstants.Response.DESC_BAD_REQUEST);
    } else {
      logger.debug("valid object")
      try {
        sqlDS.createMessage(messageObj).then(
          function (result) {
            logger.debug("******************* Exited Routes Successfully ********************************");
            // res.status(HMConstants.Response.CODE_SUCCESS).send(HMConstants.Response.CODE_SUCCESS);
            res.sendStatus(HMConstants.Response.CODE_SUCCESS)
          }
        ).catch(function (err) {
          logger.error("Promise rejection error: " + err.stack);
          logger.debug("******************* Exited Routes With Failure ********************************");
          res.status(HMConstants.Response.CODE_INTRNL_SERV_ERR).send(HMConstants.Response.DESC_INTRNL_SERV_ERR);
        }
        );
      } catch (e) {
        logger.error(e)
        res.status(HMConstants.Response.CODE_INTRNL_SERV_ERR).send(HMConstants.Response.DESC_INTRNL_SERV_ERR);
      }
    }
  });
  


  app.post('/assignments', async (req, res) => {
    logger.debug("******************* Entered Routes ********************************"); 
    const assignmentObj = req.body
    logger.debug("from static instance is " + assignmentObj.answer1)
  
    let validationErrors = ''
    // logger.debug("validationErrors in route = " + validationErrors)
    if (validationErrors) {
      logger.error("invalid object")
      res.status(HMConstants.Response.CODE_BAD_REQUEST).send(HMConstants.Response.DESC_BAD_REQUEST);
    } else {
      logger.debug("valid object")
      try {
        sqlDS.createAssignment(assignmentObj).then(
          function (result) {
            logger.debug("******************* Exited Routes Successfully ********************************");
            logger.debug(HMConstants.Response.CODE_SUCCESS)
            res.sendStatus(HMConstants.Response.CODE_SUCCESS)
          }
        ).catch(function (err) {
          logger.error("Promise rejection error: " + err.stack);
          logger.debug("******************* Exited Routes With Failure ********************************");
          res.status(HMConstants.Response.CODE_INTRNL_SERV_ERR).send(HMConstants.Response.DESC_INTRNL_SERV_ERR);
        }
        );
      } catch (e) {
        logger.error(e)
        res.status(HMConstants.Response.CODE_INTRNL_SERV_ERR).send(HMConstants.Response.DESC_INTRNL_SERV_ERR);
      }
    }
  });

  app.get('/get-assignments', async (req, res) => {
    logger.debug("******************* Entered Routes ********************************");
    var assignments = [];
  
    try {
      sqlDS.getAssignments().then(
        function (result) {
          assignments = result;
          logger.debug("******************* Exited Routes Successfully ********************************");
          // res.status(HMConstants.Response.CODE_SUCCESS).json(assignments);
          var name=assignments[7].name
          var email=assignments[7].email
          var level=assignments[7].level
          var day=assignments[7].day
          var answer1=assignments[7].answer1
          var answer2=assignments[7].answer2
          var answer3=assignments[7].answer3
          res.render(__dirname + "/views/getAssignments",{data: {name:name,email:email,level:level, day:day, answer1:answer1, answer2:answer2, answer3:answer3}});
        }
      ).catch(function (err) {
        logger.debug("Promise rejection error: " + err.stack);
        logger.debug("******************* Exited Routes With Failure ********************************");
        res.status(HMConstants.Response.CODE_INTRNL_SERV_ERR).send(HMConstants.Response.DESC_INTRNL_SERV_ERR);
      }
      );
    } catch (e) {
      console.log(e)
      res.status(HMConstants.Response.CODE_INTRNL_SERV_ERR).send(HMConstants.Response.DESC_INTRNL_SERV_ERR);
    }
  });


app.listen(PORT, () => {
    console.log("Node Server started at " + PORT + ", waiting for requests....");

});