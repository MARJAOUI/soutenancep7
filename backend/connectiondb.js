const mysql = require ('mysql');
   const Sequelize = require('sequelize');
   const sequelize = new Sequelize('groupomania', 'root', 'France&98', {
    host: 'localhost',
    dialect: 'mysql'
  });
  const connection = async function () {
    try {
      await sequelize.authenticate();
      console.log('Connection  de la DB réussie !');
    } catch (error) {
      console.error('Connection échouée !', error);
    }
  };
  connection();
module.exports= sequelize
    
  


 
		
	

   
	