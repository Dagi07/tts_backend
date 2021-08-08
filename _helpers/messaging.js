// var admin = require("firebase-admin");
// var serviceAccount = require("../_secure/telco-4b28e-firebase-adminsdk-57eih-2868bb62f9.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://deliveryx-f43a3.firebaseio.com"
// });

// function sendSingleCast(message) {
//     admin.messaging().send(message)
//         .then((response) => {
//             console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//             console.log('Error sending message:', error);
//         });
// }

// function sendMulticast(message) {
//     admin.messaging().sendMulticast(message)
//         .then((response) => {
//             console.log(response.successCount + ' messages were sent successfully')
//         })
// }

// module.exports={
//     sendSingleCast,
//     sendMulticast
// }