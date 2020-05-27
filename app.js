
/************* Requirements ************/
const express = require('express');
var session = require('express-session');
const app =express();
var bodyParser = require('body-parser');
const multer = require('multer');


/************ My Module*********/
const users = require('./modules/users');
const monuments = require('./modules/monuments');
const auth = require('./modules/auth');

const usersStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./views/userUploads/');
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    },
});
const monumentsStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'./views/userUploads/monuments/');
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    },
});
const upload = multer({storage : usersStorage});
const uploadmonument = multer({storage : monumentsStorage});

/************* End of Requirements ************/


app.set('port', (process.env.PORT || 3001));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 















/*********** INDEX ************/

/************ End INDEX ****************/





/************ Auth ****************/
app.get('/',(req,res)=>{

    res.redirect(301,'/users');
  
});
/* app.post('/',(req,res)=>{
    auth.logIn(req,res);                  
});
app.get('/logout',(req,res)=>{
    console.log('loggin out');
   auth.logOut(req,res);                
}); */
/************ End Auth ****************/






/************ users *************/
app.get('/users',(req,res)=>{
    users.redirect(res);
});

app.post('/users',upload.single('filetoupload'),(req,res)=>{
    users.add(req,res);
});

app.get('/users/delete/:id',(req,res)=>{
    let id= req.params.id;
    users.delete(res,id);
});
/************ END Users *************/







/************* Monuments *****************/
app.get('/monuments',(req,res)=>{
    
        monuments.redirect(res);
 
});
app.post('/monuments',uploadmonument.single('filetoupload'),(req,res)=>{
    monuments.add(req,res);
});
app.get('/monuments/delete/:id',(req,res)=>{
    let id= req.params.id;
    monuments.delete(res,id);
});
app.post('/monuments/edit/:id',uploadmonument.single('filetoupdate'),(req,res)=>{
    let id= req.params.id;
        monuments.update(res,req,id);
});
/************* End Monuments *****************/










app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')} ...`));