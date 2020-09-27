const nodemailer = require('nodemailer')
const Constants = require('../config/Constants')
const logger = require('../config/Logger');


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: false,
  port: 25,
  tls: {
    rejectUnauthorized: false
  },
  auth: {
    user: Constants.Email.USER,
    pass: Constants.Email.PASS,
  },
});



exports.dispatchEmail = async function (assignmentObj) {
  logger.debug("################### Entering Email Dispatcher ################################");
  logger.debug(assignmentObj.name, assignmentObj.email, assignmentObj.level, assignmentObj.day, assignmentObj.answer1)

  return new Promise(function (resolve, reject) {
    name=assignmentObj.name

    var emailBody = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Assignment submitted successfully</title>
      <!-- Designed by https://github.com/kaytcat -->
      <!-- Header image designed by Freepik.com -->
    
    
      <style type="text/css">
      /* Take care of image borders and formatting */
    
      img { max-width: 600px; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;}
      a img { border: none; }
      table { border-collapse: collapse !important; }
      #outlook a { padding:0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass {width:100%;}
      .backgroundTable {margin:0 auto; padding:0; width:100% !important;}
      table td {border-collapse: collapse;}
      .ExternalClass * {line-height: 115%;}
    
    
      /* General styling */
    
      td {
        font-family: Arial, sans-serif;
        color: #6f6f6f;
      }
    
      body {
        -webkit-font-smoothing:antialiased;
        -webkit-text-size-adjust:none;
        width: 100%;
        height: 100%;
        color: #ffffff;
        font-weight: 400;
        font-size: 18px;
      }
    
    
      h1 {
        margin: 10px 0;
      }
    
      a {
        /* color: #27aa90; */
        color:#3bcdb0;
        text-decoration: none;
      }
    
      .force-full-width {
        width: 100% !important;
      }
    
      .force-width-80 {
        width: 80% !important;
      }
    
    
      .body-padding {
        padding: 0 75px;
      }
    
      .mobile-align {
        text-align: right;
      }
    
    
    
      </style>
    
      <style type="text/css" media="screen">
          @media screen {
            @import url(http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900);
            /* Thanks Outlook 2013! */
            * {
              font-family: 'Source Sans Pro', 'Helvetica Neue', 'Arial', 'sans-serif' !important;
            }
            .w280 {
              width: 280px !important;
            }
    
          }
      </style>
    
      <style type="text/css" media="only screen and (max-width: 480px)">
        /* Mobile styles */
        @media only screen and (max-width: 480px) {
    
          table[class*="w320"] {
            width: 320px !important;
          }
    
          td[class*="w320"] {
            width: 280px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
    
          img[class*="w320"] {
            width: 250px !important;
            height: 67px !important;
          }
    
          td[class*="mobile-spacing"] {
            padding-top: 10px !important;
            padding-bottom: 10px !important;
          }
    
          *[class*="mobile-hide"] {
            display: none !important;
          }
    
          *[class*="mobile-br"] {
            font-size: 12px !important;
          }
    
          td[class*="mobile-w20"] {
            width: 20px !important;
          }
    
          img[class*="mobile-w20"] {
            width: 20px !important;
          }
    
          td[class*="mobile-center"] {
            text-align: center !important;
          }
    
          table[class*="w100p"] {
            width: 100% !important;
          }
    
          td[class*="activate-now"] {
            padding-right: 0 !important;
            padding-top: 20px !important;
          }
    
          td[class*="mobile-block"] {
            display: block !important;
          }
    
          td[class*="mobile-align"] {
            text-align: left !important;
          }
    
        }
      </style>
    </head>
    <body  offset="0" class="body" style="padding:0; margin:0; display:block; background:#eeebeb; -webkit-text-size-adjust:none" bgcolor="#eeebeb">
    <table align="center" cellpadding="0" cellspacing="0" width="100%" height="100%">
      <tr>
        <td align="center" valign="top" style="background-color:#eeebeb" width="100%">
    
        <center>
    
          <table cellspacing="0" cellpadding="0" width="600" class="w320">
            <tr>
              <td align="center" valign="top">
    
    
              <table style="margin:0 auto;" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td style="text-align: center; font-size: 45px;">
                    <!-- <a href="https://www.codepannu.com">codePannu</a> -->
                  </td>
                </tr>
              </table>
    
    
              <table cellspacing="0" cellpadding="0" class="force-full-width" style="background-color:#FCE205;">
                <tr>
                  <td style="background-color:#FCE205;">
    
                    <table cellspacing="0" cellpadding="0" class="force-full-width">
                      <tr>
                        <td style="font-size:40px; font-weight: 600; color: #ffffff; text-align:center;" class="mobile-spacing">
                        <div class="mobile-br">&nbsp;</div>
                          Great job ${name}!!!!
                        <br>
                        <br>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:24px; text-align:center; padding: 0 75px; color:#6f6f6f;" class="w320 mobile-spacing">
                         We received your assignment and we are very excited.
                        </td>
                      </tr>
                    </table>
                    <br>
                    <br>
                    <!-- <table cellspacing="0" cellpadding="0" width="100%">
                      <tr>
                        <td>
                          <img src="https://www.filepicker.io/api/file/GpfIo4fLSmOUlg8sU33n" style="max-width:100%; display:block;">
                        </td>
                      </tr>
                    </table> -->
    
                  </td>
                </tr>
              </table>
    
              <table cellspacing="0" cellpadding="0" class="force-full-width" bgcolor="#ffffff" >
                <tr>
                  <td style="background-color:#ffffff; padding-top: 15px;">
    
                  <center>
    
                    <table style="margin: 0 auto;" cellspacing="0" cellpadding="0" class="force-width-80">
                      <tr>
                        <td style="text-align: center;">
                        <br>
                        While we look at your code, continue your tutorial and keep submitting more
                        assignments.
                          <br><br>
                          Thank you, <br>
                          codePannu Team
                        </td>
                      </tr>
                    </table>
                  </center>
    
                  <table style="margin:0 auto;" cellspacing="0" cellpadding="10" width="100%">
                    <tr>
                      <td style="text-align:center; margin:0 auto;">
                      <br>
                        <div><!--[if mso]>
                          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://" style="height:45px;v-text-anchor:middle;width:180px;" stroke="f" fillcolor="#f5774e">
                            <w:anchorlock/>
                            <center>
                          <![endif]-->
                              <a href="https://www.codepannu.com"
                            style="background-color:#008183;color:#ffffff;display:inline-block;font-family:'Source Sans Pro', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;line-height:45px;text-align:center;text-decoration:none;width:180px;-webkit-text-size-adjust:none;">Visit Us</a>
                              <!--[if mso]>
                            </center>
                          </v:rect>
                        <![endif]--></div>
                        <br>
                      </td>
                    </tr>
                  </table>
    
    
                  <table cellspacing="0" cellpadding="0" class="force-full-width">
                    <tr>
                      <td style="font-size: 16px; text-align:center;">
                        <a href="#">View in browser</a> | <a href="https://www.codepannu.com#two">Contact</a> 
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:12px;">
                        &nbsp;
                      </td>
                    </tr>
                  </table>
    
                  </td>
                </tr>
              </table>
              </td>
            </tr>
          </table>
    
        </center>
        </td>
      </tr>
    </table>
    </body>
    </html>`


    const mailOptions = {
      //from: 'codepannu.assignments@gmail.com',   sender address
      to: assignmentObj.email, // list of receivers
      bcc: 'anitha.calibre@gmail.com',
      subject: 'Congratulations from codePannu', // Subject line
      html: emailBody
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        logger.error('Error:- ' + err.stack);
        reject(new Error('Ooops, something broke!'));
      }
      else {
        logger.debug(info);
        logger.debug('************exiting email dispatcher successfully****************');
        resolve(true);
      }
    });
  });
}





