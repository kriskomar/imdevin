const REGION = process.env.REGION;
var aws = require("aws-sdk");
aws.config.update({region: REGION});
var doc = require('dynamodb-doc');
var ddb = new doc.DynamoDB();
//const uuidv1 = require('uuid/v1');
const TABLE_NAME = process.env.TABLE_NAME;
const PRIMARY_KEY = process.env.PRIMARY_KEY;

exports.handler = async (event, context, callback) => {
    var response;

    if(event && event.queryStringParameters && event.queryStringParameters.action){
        if(event.queryStringParameters.action == "post"){
            response = await saveVisitor();
        }
        if(event.queryStringParameters.action == "get"){
            response = await getVisitorCount();
        }
    } else {
        return {
            "statusCode": 400,
            "body": "Response was null. Didn't hit either path! event=", event,
            headers: { "Access-Control-Allow-Origin": "http://imdevin.net" }
          };
    }

    return response;
  }

let saveVisitor = async () => {
    var params = {
        TableName: TABLE_NAME,
        Key:{
            [PRIMARY_KEY]: "VisitorCount"
        },
        UpdateExpression: "set #data = #data + :val",
        ExpressionAttributeNames:{"#data": "Val"},
        ExpressionAttributeValues:{":val": 1},
        ReturnValues:"UPDATED_NEW"
    };

    try {
        const data = await ddb.updateItem(params).promise();
        return { 
            "statusCode": 200, 
            "body": JSON.stringify(data),
            headers: { "Access-Control-Allow-Origin": "http://imdevin.net" }
        };
     } catch (error) {
        return {
          "statusCode": 400,
          "body": `Could not fetch: ${error.stack}`,
          headers: { "Access-Control-Allow-Origin": "http://imdevin.net" }
        };
    }
};

let getVisitorCount = async () => {
    var params = {
        TableName: TABLE_NAME,
        Key:{
            [PRIMARY_KEY]: "VisitorCount"
        }
    };

    try {
        const data = await ddb.getItem(params).promise();
        return { 
            "statusCode": 200, 
            "body": JSON.stringify(data),
            headers: { "Access-Control-Allow-Origin": "http://imdevin.net" }
        };
     } catch (error) {
        return {
          "statusCode": 400,
          "body": `Could not fetch: ${error.stack}`,
          headers: { "Access-Control-Allow-Origin": "http://imdevin.net" }
        };
    }
};