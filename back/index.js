const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const uuidv1 = require('uuid/v1');
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

exports.handler = function(event, context) {
    console.log("EVENT data: \n" + JSON.stringify(event, null, 2));
    console.log("CONTEXT data: \n" + JSON.stringify(context, null, 2));
    
    let response = {
        statusCode: 200
    };
    if(event.action == "post"){
        saveVisitor(response);
    }
    if(event.action == "get"){
        getVisitorCount(response);
    }
    
    context.succeed(response);
  }

let saveVisitor = (response) => {

    let params = {
        TableName: TABLE_NAME,
        Item: {
            [PRIMARY_KEY]: { S: uuidv1() },
            'COUNT': { N: '1' }
        }
    };
    
    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error writing to DynamoDB, dude.", err);
            response = {
                statusCode: 500,
                error: err
            };
        } else {
          console.log("Success writing to Dynamo!", data);
        }
      });
};

let getVisitorCount = (response) => {
    console.log("I promise I'm getting the visitor count now!");
};