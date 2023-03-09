const { DataTypes } = require("sequelize")

module.exports= (sequelize)=>{
sequelize.define('Flight',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    origin:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    destiny:{
      type:DataTypes.STRING,
      allowNull:false,
  },
    dateTimeDeparture:{
        type:DataTypes.DATE,
        allowNull: false,
        },

    dateTimeArrival1:{
        type:DataTypes.DATE,
        allowNull: false,
      },
    dateTimeReturn:{
      type:DataTypes.DATE,
      allowNull: true,
      },

    dateTimeArrival2:{
      type:DataTypes.DATE,
      allowNull: true,
    },
    roundTrip:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },

    seatsAvailable:{
        type:DataTypes.INTEGER,
        defaultValue: 0,
      },
    ticketPrice:{
        type:DataTypes.FLOAT,
        defaultValue: 0,
      },
      scale:{
      
        type:DataTypes.ENUM("0","1","2"),
        allowNull: false,
      },
      state:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    },

    }, {
    timestamps: false,


});
}