exports.handler = (event, context, callback) => {
  // Confirm the user
  event.response.autoConfirmUser = true;

  // Set the phone number as verified if it is in the request
  if (event.request.userAttributes.hasOwnProperty('phone_number')) {
    event.response.autoVerifyPhone = true;
  }
  // Return to Amazon Cognito
  callback(null, event);
};