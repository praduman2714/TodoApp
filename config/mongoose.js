const mongooese = require('mongoose');

mongooese.connect('mongodb://127.0.0.1/todoListDb');

const db = mongooese.connection;

db.on('error', console.error.bind(console, 'error connecting to db'));

db.once('open',function(){
    console.log('Success fully connected to the database')
})