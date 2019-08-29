var https = require('https');
/***
Lambda function to post the data to Power BI whenever the event occurs 
***/
exports.handler = async (event, context) => {

    var body=event.Records;
    var jsonObject = JSON.stringify(event);
    
    // the post options
    var optionspost = {
        host: 'api.powerbi.com',
        path: '/beta/'', //power bi api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var reqPost = https.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        res.on('data', function (chunk) {
            body += chunk;
        });
        context.succeed(body);
    });

    reqPost.write(jsonObject);
    reqPost.end();
};
