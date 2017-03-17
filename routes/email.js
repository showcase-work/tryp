var express = require('express');
var router = express.Router();

/* GET users listing. */

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
var helper = require('sendgrid').mail;
  


var sg = require('sendgrid')(process.env.EMAIL);
from_email = new helper.Email("hoteltrypwtc@gmail.com");



router.post('/', function(req, res, next) {

    console.log(req.body);

    if(req.body.email && req.body.firstName){
        to_email = new helper.Email(req.body.email);
        subject = "TRYP: Booking Query";
        content = new helper.Content("text/plain", "Hi "+req.body.name+", "+" Your Booking query for "+req.body.dateFrom+" to "+req.body.dateTo+" is successfully sent.");
        mail = new helper.Mail(from_email, subject, to_email, content);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
        })


        subject = "Customer: Booking Query";
        content = new helper.Content("text/plain", req.body.name+"-"+req.body.phone+"-"+req.body.email+"-"+req.body.dateFrom+"-"+req.body.dateTo);
        mail = new helper.Mail(from_email, subject, from_email, content);
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
        })

        res.send("Query successfully sent.");
    }
    else
    {
        res.send("Please fill in correct parameters.");
    }

});

module.exports = router;
