const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    sequelize.define('Airline', {
        id: {
          type:DataTypes.INTEGER,
          autoIncrement:true,
          allowNull:false,
          primaryKey:true,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
              defaultValue: ""
            },
            infoContact:{
              type: DataTypes.STRING,
              defaultValue: ""
      
          },
          picture: {
            type: DataTypes.TEXT,
            defaultValue: "",
            allowNull: false,
          },
          /*rating: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            defaultValue: "1",
          },*/
          state:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true
        },
       /* urlImg:{
          type: DataTypes.STRING(10000),
          allowNull: false 
        }*/
          
          },
          {
            timestamps: false
          }
      );
}