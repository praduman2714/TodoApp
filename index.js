const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 8000;

const db = require('./config/mongoose');
const todoListDB = require('./models/todo');


const app = express();

app.use(express.urlencoded()) ;

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname , 'views'));

app.use(express.static('assets'));

todo = [
    {
        description : "Home",
        category : "Work",
        duedate : "10/4/2000"
    },
    {
        description : "Home will be coming on frideay that will be done in coming week",
        category : "Work",
        duedate : "10/4/2000"
    }
]

app.get('/' , function(req, res){
    // return res.render('home' , {
    //     title : "Hello Der",
    //     todoLists : todoListDB
    // })

    todoListDB.find({}).then((todoArr, err)=>{
        if(err){
            console.log("Error in finding the todo from todoListDB");
            return ;
        }
        return res.render('home', {
            title : "Home",
            todoLists : todoArr
        })
    })
})

app.post('/create-todolist' , function(req, res){
    console.log(req.body);

    // todo.push({
    //     description:  req.body.Description,
    //     category : req.body.category,
    //     duedate : req.body.dueDate
    // })

    if(!req.body.dueDate){
        req.body.dueDate = "No Due Data"
    }

    todoListDB.create({
        description:req.body.Description,
        category:req.body.category,
        duedate : req.body.dueDate
    }).then((newTodo, err) =>{
        if(err){
            console.log("Error in creating the Todo");
            return ;
        }
        console.log(newTodo);
         return res.redirect('back');
     })
});

app.delete('/deleteTasks' , function (req, res){
    // console.log(req.params);
    // let id = req.query.id;
    // todoListDB.findByIdAndDelete(id).then((err)=>{
    //     if(err){
    //         console.log("Error in deleting todo form database");
    //         return ;
    //     }
    //     return res.redirect('/');
    // })

    let task = req.body.data;
     if(task){
        for(let i=0;i<task.length;i++)
        {
        todoListDB.deleteOne({
            _id: task[i]
        }).then((err)=>{
            if(err){
                console.log(err);
                return ;
            }
            return res.redirect('back');
        })        
        }
     
     } else{
      return res.redirect('back');
     }
});


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
        return ;
    }
    console.log(`Server is up and running in the port ${port}`);
})