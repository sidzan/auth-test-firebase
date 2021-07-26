var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.body);
  res.sendStatus(200);
});


router.post('/', async (req, res, next) =>{
  console.log(">>> post")
  const idToken = req.headers.authorization;
  console.log(idToken)
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
    return;
  }  

});

module.exports = router;
