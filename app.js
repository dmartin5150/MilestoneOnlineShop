const path = require('path');

const express = require('express');

const authRoutes = require('./routes/auth.routes');

app = express();

app.set('view engine','ejs'); //use ejs 
app.set('views',path.join(__dirname,'views')); //where to find views

app.use(express.static('public'));

app.use(authRoutes);

app.listen(3000);