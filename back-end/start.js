// start the express app in server.js
const app = require('./server.js');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Started listening on port ' + PORT + "!"));