const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const config  = require('./config/config');
const routes = require("./routes/router");
const app = express();
port = 3080;

app.use(bodyParser.json({limit: '50mb'}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}))

// Start mongodb connection
const uri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Include routes (ex /users, /horses...)
app.use("/api/", routes);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`)
})
