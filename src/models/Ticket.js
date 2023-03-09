const{DataTypes} = require('sequelize')
module.exports = (sequelize)=>{
    sequelize.define('Ticket', {
        id:{
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
            primaryKey: true,
            },
            namePassanger:{
                type: DataTypes.STRING,
                defaultValue:null
            },
            seat: {
                type:DataTypes.INTEGER,
                allowNull: false
            },
            email:{
                type:DataTypes.STRING,
                defaultValue:null
            },
            activatedTicket:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
            },{
                timestamps: false,
            });
}