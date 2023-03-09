
const {Airline, Airport} = require('../db.js');

    const get_airline = async(req,res) =>{
        try {
            const airlineBD = await Airline.findAll({
                where:{
                    state:true
                }
            })
            res.json(airlineBD)
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    }

    const get_id_airline = async(req,res) =>{
        
        const {id} = req.params;

        try {
            const airline = await Airline.findOne({
                where: {id},
                include: [{
                    model: Airport,
                    attributes: ['name', 'country', 'city'],
                    where:{
                    state: true
                    }
                }]
            })

            if (airline) {
                res.json(airline)
            }else{
                res.status(404).json({message:'Id not found'})
            }
        } catch (error) {
            res.status(400).json({message:error.message})
        }
    } 

     const create_airline = async(req,res) =>{
        const {name,infoContact,picture, } = req.body
        try {
            if (!name ||!infoContact ||!picture) {
                res.status(404).json({message:'Oops some of the fields are empty'})
            } else {
                const newAirline = await Airline.create({
                    name:name,
                    infoContact:infoContact,
                    picture:picture,

                })
                res.json(newAirline)
            }
        } catch (error) {
            return res.status(400).json({message:error.message})
        }
    }

    const update_airline = async(req,res) => {
        try {
            const {id} = req.params;
            const {name,infoContact,picture} = req.body

            await Airline.update({
                name: name,
                infoContact:infoContact,
                picture:picture
            },{
                where:{
                    id:id
                }
            })
            res.status(200).sen('successfully modified')
        } catch (error) {
            return res.status(400).json({message:error.message})
        }
    }

    /* const  addAirportToAirline = async (req, res) => {

        const {  airlineId , airportsId} = req.body;

        try {

            const airline = await Airline.findByPk(airlineId)

            if (airportsId.length >= 1){
                await Promise.all(
                    airportsId.map( async (airportId) => {
                    let airport = await Airport.findByPk(airportId)
                    await airline.addAirport(airport)
                })
            )

            res.status(200).send("Aeropuertos agregados correctamente");
            }else{

                const airport = await Airport.findByPk(airportsId)
                await airline.addAirport(airport)

                res.status(200).send("Aeropuerto agregado correctamente"); 
            }
           
        }catch(error) {

            res.status(400).send({message: error.message})   

        }
    }; */

    const addAirportToAirline = async (req, res) => {
        const { airlineId, airportsId } = req.body;
        try {
          const airline = await Airline.findByPk(airlineId);
          if (!airline) {
            return res.status(404).send({ message: "Airline not found" });
          }
          if (airportsId.length >= 1) {
            await Promise.all(
              airportsId.map(async (airportId) => {
                const airport = await Airport.findByPk(airportId);
                if (!airport) {
                  return res
                    .status(404)
                    .send({ message: `Airport with id ${airportId} not found` });
                }
                await airline.addAirport(airport);
              })
            );
            res.status(200).send("Airports added successfully");
          } else {
            const airport = await Airport.findByPk(airportsId);
            if (!airport) {
              return res
                .status(404)
                .send({ message:` Aeropuerto con id ${airportsId} no encontrado `});
            }
            await airline.addAirport(airport);
            res.status(200).send("Aeropuerto añadido con éxito");
          }
        } catch (error) {
          res.status(400).send({ message: error.message });
        }
      };

    const  deleteAirportToAirline = async (req, res) => {

        const {  airlineId , airportsId} = req.body;

        try {

            const airline = await Airline.findByPk(airlineId)

            if (airportsId.length >= 1){
               
                    airportsId.map( async (airportId) => {
                    let airport = await Airport.findByPk(airportId)
                    await airline.removeAirport(airport)
                })
            


                res.status(200).send("Aeropuertos eliminados correctamente"); 
            }else{

                const airport = await Airport.findByPk(airportsId)
                await airline.removeAirport(airport)

                res.status(200).send("Aeropuerto eliminado correctamente"); 
            }
           
        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };

    const defuseAirline = async(req, res)=>{
        const {id, state}= req.body;
        try {
            const airline= await Airline.findByPk(id)
             await airline.update({
                state: state
             })
           await airline.save()
           res.send("Aereolinea actualizada")
        } catch (error) {
            res.status(400).json({message: error.message});
        }
        };

module.exports = {
    get_airline,
    get_id_airline,
    create_airline,
    update_airline,
    addAirportToAirline,
    deleteAirportToAirline,
    defuseAirline
  };