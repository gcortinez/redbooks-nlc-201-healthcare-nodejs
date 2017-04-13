var config = require('../config');
var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');

var router = express.Router();
var urlEncodedParser = bodyParser.urlencoded({extended:false});

//Declare an instance of the NLC service by using the credentials and classifier id in JSON format in the configuration file
var natural_language_classifier = watson.natural_language_classifier(config.watson.natural_language_classifier);

router.post('/', urlEncodedParser, function(req, res, next){
	natural_language_classifier.classify({
		'text': req.body.source,
		'classifier_id': config.watson.natural_language_classifier.id
	},
	//A function to be run when classification analysis is completed.
	function(err, response){
		if(err){
			//Print the returned errors into the server console.
			console.log('error:', err);
		}else{
			//Print the returned results data into the server console.
			console.log(JSON.stringify(response, null, 2));
			//Send the returned JSON data to the client application.
			res.json(response);
		}
	});
});

module.exports = router;