import { HTTP } from 'meteor/http';

export default function sendSMS() {
  const response = HTTP.call('POST',
      'https://api.twilio.com/2010-04-01/Accounts/ACcbb6ed6edc4fa9fa41d53d7ce85b5753/Messages.json', {
    data: {
      "To": "+18082389966",
      "From": "+12076055298",
      "MessagingServiceSid": "MG64b7047f97fdd0195509f0069755bfb4",
      "Body": "test%20case"
      },
    user: "ACcbb6ed6edc4fa9fa41d53d7ce85b5753:2f495e4fe4370b9d6742089860764058"
  });
  console.log({response})
};