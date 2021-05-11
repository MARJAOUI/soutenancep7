'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    
    static associate(models) {
      //  association messages/User
      models.Message.belongsTo(models.User, {
        // la clé de la relation étrangère ne doit pas etre  nulle
        foreignKey: {   
          allowNull: false
        }
      })
    }
  };
  Message.init({
    titre: DataTypes.STRING,
    contenu: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};