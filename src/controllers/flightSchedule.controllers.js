const { Op } = require('sequelize');
const {Flight, Airline} = require('../db.js');

function fechaConversion(date) {
    let fechaDivide = date.split('-')
    let año = fechaDivide[0]
    let mes = fechaDivide[1]
    let dia = fechaDivide[2]

    let fechaNew = new Date(año,mes-1,dia)

    return fechaNew.toISOString();
}

function sumarUnDiaAFechaISO(fechaISO) {
    var fecha = new Date(fechaISO);
    fecha.setDate(fecha.getDate() + 1);
    var fechaISOSiguienteDia = fecha.toISOString();
    return fechaISOSiguienteDia;
    }

const flightSchedule =async(req,res) =>{
    // el tipo de formato que deben tener las 2 propiedades en req.body es asi YY-MM-DD >> 2023-02-22
    // que incluyan un 0 antes los numeros del 1 al 9
    const {ida,vuelta,origen,destino} = req.body;
    let timeIda = fechaConversion(ida);
    let timeVuelta;
    if (vuelta !== null) {
        timeVuelta = fechaConversion(vuelta) 
    }
    
    try {
        
        
        if (ida && vuelta === null) {
            //la vuelta debe poner null en el front si es solo ida
            const vuelosOfDayIda = await Flight.findAll({
                where:{
                    origin:origen,
                    destiny:destino,
                    dateTimeDeparture:{
                        [Op.gte] : timeIda,
                        [Op.lt] : sumarUnDiaAFechaISO(timeIda)
                    },
                    roundTrip:false
                }
            })
            res.json(vuelosOfDayIda)
        }else if (ida && vuelta) {
            const vuelosOfDayIdaVuelta = await Flight.findAll({
                where:{
                    origin:origen,
                    destiny:destino,
                    dateTimeDeparture:{
                        [Op.gte] : timeIda,
                        [Op.lt] : sumarUnDiaAFechaISO(timeIda)
                    },
                    dateTimeReturn:{
                        [Op.gte] : timeVuelta,
                        [Op.lt] : sumarUnDiaAFechaISO(timeVuelta)
                    },
                    roundTrip:true
                }
            })
            res.json(vuelosOfDayIdaVuelta)
        }else{
            res.status(400).send({error: "Debe rellanar al menos el de ida"})
        }
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    flightSchedule
};