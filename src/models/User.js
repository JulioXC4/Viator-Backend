const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('User', {
      id: {
        type: DataTypes.STRING,
        defaultValue:"",
        allowNull: false,
        primaryKey: true,
      },
      givenName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      familyName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      nickName: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      birthdate:{
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      country:{
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      city:{
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      phone: {
        type: DataTypes.BIGINT,
        defaultValue: 0,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: false,
      },
    
    },
    {
      timestamps: false
    }
    );
  };
  