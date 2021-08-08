// const validator=require('validator');
const isEmpty = require('../is_empty');

module.exports=function checkUser(data){
    let errors=[]
   
    return{
        errors,
        isValid: isEmpty(errors)
    }; 
};
