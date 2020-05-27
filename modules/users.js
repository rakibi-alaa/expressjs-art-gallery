/*********** REQUIREMENTS ************/

const connection = require('./db');
const bcrypt = require('bcrypt');
/*********** END OF REQUIREMENTS ************/



const redirectToUsers = (res) =>{
    connection.query('SELECT * FROM users order by id', function(err, result) {
      if(err){
          throw err;
      } else {
          res.render('pages/index',{users : result});               
      }
    });
}

const deleteUser = (res,id) =>{
  connection.query('DELETE FROM users where id = ?' ,[ parseInt(id)], function(err, result) {
    if(err){
        throw err;
    } else {
        res.redirect(301,'/users');                 
    }
  });
}
const addUser = (req,res) =>{
  let hash = bcrypt.hashSync(req.body.password, 10);
    let sql = `INSERT INTO users (name,email,password,img_path,contributions) values (${ "'" +req.body.name + "'"},
        ${"'" +req.body.email+ "'"},${"'" +hash+ "'"},  ${"'" +'userUploads/' + req.file.originalname + "'"}, ${0})`
    connection.query(sql, function(err, result) {
        
        if(err){
            throw err;
            
        } else {
            res.redirect(301,'/users');              
        }
        
      });
}

module.exports = {
  redirect:redirectToUsers,
  add : addUser,
  delete : deleteUser
};


