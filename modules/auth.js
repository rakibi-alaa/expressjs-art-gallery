/*********** REQUIREMENTS ************/

const connection = require('./db');
const bcrypt = require('bcrypt');
/**************End Requirement ************/


const authLogin = (req,ress) =>{
    if(req.body.email && req.body.password){
        connection.query('SELECT * FROM users where email = ?',
            [req.body.email] , function(err, result) {
        if(err){
            throw err;
        } else {
            if(result.length > 0){
                bcrypt.compare(req.body.password,result[0].password, function(err, res) {
                    if(res === true){
                        req.session.success = true;
                        ress.redirect(301,'/monuments');
                    }else{
                        error = "Incorrect Username or Password";
                        ress.render('pages/auth',{error : error}); 
                    }
                });
            }       
        }
      });
    }
}



const authLogOut = (req,res) =>{
    req.session.destroy();
    res.redirect(301,'/');
}


const checkSession = (req,res)=>{
    if(!req.session.loggedin || req.session.loggedin === undefined){
        console.log("redirected");
        return -1;
    }
    return 1;
}
module.exports = {
  logIn  : authLogin,
  logOut : authLogOut,
  check : checkSession
};