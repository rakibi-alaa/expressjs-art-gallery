/*********** REQUIREMENTS ************/

const connection = require('./db');

/*********** END OF REQUIREMENTS ************/



const redirectToMonuments = (res) =>{
    connection.query('SELECT * FROM monuments order by id' , function(err, result) {
        if(err){
            throw err;
        } else {
            res.render('pages/monuments',{monuments : result});                   
        }
      });
}

const addMonument = (req,res) => {
    let sql = `INSERT INTO monuments (name,location,description,img_path,price,copy_number) values (${ "'" +req.body.name + "'"},
        ${"'" +req.body.location+ "'"},${"'" +req.body.description+ "'"},  ${"'" +'userUploads/' + req.file.originalname + "'"},
         ${req.body.price} , ${req.body.nbCopy})`
    connection.query(sql, function(err, result) {
        
        if(err){
            throw err;
        } else {
            res.redirect(301,'/monuments');              
        }
        
      });
}

const deleteMonument = (res,id) =>{
  connection.query('DELETE FROM monuments where id = ?' ,[ parseInt(id)], function(err, result) {
    if(err){
        throw err;
    } else {
        res.redirect(301,'/monuments');                 
    }
  });
}
const updateMonument = (res,req,id) =>{
    let sql = "";
    if(req.file === undefined){
        sql = `UPDATE monuments set name = ${"'" +req.body.name+ "'"} ,
                                    location=${"'" +req.body.location+ "'"},
                                    description = ${"'" +req.body.description+ "'"},
                                    price =  ${req.body.price},
                                    copy_number =  ${req.body.nbCopy}
                    where id = ${id} `;
    }else{
        sql = `UPDATE monuments set name = ${"'" +req.body.name+ "'"} ,
                                location=${"'" +req.body.location+ "'"},
                                description = ${"'" +req.body.description+ "'"},
                                img_path = ${"'" +'userUploads/' + req.file.originalname + "'"},
                                price =  ${req.body.price},
                                copy_number =  ${req.body.nbCopy}
                            where id = ${id} `;
    }
  
   
    connection.query(sql, function(err, result) {
    if(err){
        throw err;
    } else {
        res.redirect(301,'/monuments');              
    }
  });
  

}

module.exports = {
  redirect:redirectToMonuments,
  delete : deleteMonument,
  update : updateMonument,
  add : addMonument
};