
const sendUserIdCookie = (userId, res) => {
 // Our token expires after one day
 const oneDayToSeconds = 24 * 60 * 60;
 res.cookie('userId', userId,  
 { maxAge: oneDayToSeconds,
 // You can't access these tokens in the client's javascript
   httpOnly: true,
   // Forces to use https in production
   secure: process.env.NODE_ENV === 'production'? true: false
  });
};