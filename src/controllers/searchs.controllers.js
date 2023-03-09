const {Airport, Airline, Flight} = require('../db.js');
const { Op } = require('sequelize');
const moment = require('moment');

    const getAirportsByInput = async (req, res) => {

        //Country 
        const {input} = req.params;

        try {

            const airports = await Airport.findAll({
                where: {
                  [Op.or]: [
                    { name: { [Op.like]: `%${input}%` } },
                    { city: { [Op.like]: `%${input}%` } },
                    { country: { [Op.like]: `%${input}%` } }
                  ]
                }
              })

              if(airports.length === 0) return res.status(404).send({massage:'There are no airports with this name'})
              else res.status(200).send(airports);

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };

    const getFlightsByQuery = async (req, res) => {

      const {roundTrip,origin, destiny, dateTimeDeparture, dateTimeReturn, passengers} = req.query

      const ConvertedDateTimeDeparture = new Date(dateTimeDeparture)
      const ConvertedDateTimeReturn = new Date(dateTimeReturn)
      
      const day = 24 *60 * 60 * 1000; // 1 dia en minutos

      const dateTimeDepartureStart = new Date(ConvertedDateTimeDeparture);//prob
      const dateTimeDepartureEnd = new Date(ConvertedDateTimeDeparture.getTime() + day);
      const dateTimeReturnStart = new Date(ConvertedDateTimeReturn);
      const dateTimeReturnEnd = new Date(ConvertedDateTimeReturn.getTime() + day);

      if(roundTrip === "false"){

        try {
            if(origin && destiny && passengers){

              const normalFlights = await Flight.findAll({
                where: {
                  [Op.and]: [
                    { roundTrip: { [Op.eq]: false } },
                    { origin: { [Op.like]: `%${origin}%` } },
                    { destiny: { [Op.like]: `%${destiny}%` } },
                    {
                      dateTimeDeparture: {
                        [Op.between]: [dateTimeDepartureStart, dateTimeDepartureEnd]
                      }
                    },
                    { seatsAvailable: { [Op.gte]: passengers } },
                  ]
                }
              })

                  res.status(200).send(normalFlights)
            }else{
              res.status(404).send({message: "Datos no encontrados"})
            }
        } catch (error) {
  
          return res.status(400).send({message: error.message});
  
        }
      }else{

        const roundTripFlights = await Flight.findAll({
          where: {
            [Op.and]: [
              { roundTrip: { [Op.eq]: true } },
              { origin: { [Op.like]: `%${origin}%` } },
              { destiny: { [Op.like]: `%${destiny}%` } },
              {
                dateTimeDeparture: {
                  [Op.between]: [dateTimeDepartureStart, dateTimeDepartureEnd]
                }
              },
              {
                dateTimeReturn: {
                  [Op.between]: [dateTimeReturnStart, dateTimeReturnEnd]
                }
              },
              { seatsAvailable: { [Op.gte]: passengers } },
            ]
          }
        })

        res.status(200).send(roundTripFlights)
      }
  }

module.exports = {
    getAirportsByInput,
    getFlightsByQuery
  };

