const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const uuidv1 = require('uuid/v1');
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

exports.handler = function(event, context) {
    console.log("EVENT data: \n" + JSON.stringify(event, null, 2));
    saveToDynamoDB();
    return context.logStreamName
  }

let saveToDynamoDB = () => {

    let params = {
        TableName: TABLE_NAME,
        Item: {
            [PRIMARY_KEY]: { S: uuidv1() },
            'COUNT': { N: '1' }
        }
    };
    
    //console.log("params is: ", params);

    // Call DynamoDB to add the item to the table
    ddb.putItem(params, function(err, data) {
        if (err) {
          console.log("Error writing to DynamoDB, dude.", err);
        } else {
          console.log("Success writing to Dynamo!", data);
        }
      });
};
