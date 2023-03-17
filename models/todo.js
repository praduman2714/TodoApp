const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
    description:{
      type: String,
      required: true
    },
    category:{
      type: String,
      required: true
    },
    duedate:{
      type: String,
      // required: true
    }
});


const todoList = mongoose.model('TodoList' , todolistSchema);

module.exports = todoList;