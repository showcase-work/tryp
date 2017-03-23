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

        subject = "TRYP Booking Request for"+req.body.firstName;
        content = new helper.Content("text/html", "Hi "+req.body.firstName+", <br />"+" Your Booking query for <b>"+req.body.dateFrom+" to "+req.body.dateTo+"</b> is successfully recieved.<br /> We will respond back with a shortly. <br /><br />Thank you for contacting TRYP.");
        mail = new helper.Mail(from_email, subject, to_email, content);

        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        });

        sg.API(request, function(error, response) {
        })


        subject = "Customer Booking Query";
        content = new helper.Content("text/html", "Hi, you have a query from "+req.body.firstName+"<br />Phone: "+req.body.phone+"<br />Email: "+req.body.email+"<br />Dats:"+req.body.dateFrom+"-"+req.body.dateTo);
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
