exports.handler = (event, context, callback) => {
  // Confirm the user and set the phone number as verified
  event.response.autoConfirmUser = true;
  event.response.autoVerifyPhone = true;
  
  // Return to Amazon Cognito
  callback(null, event);
};