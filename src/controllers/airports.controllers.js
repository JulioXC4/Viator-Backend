const {Airport, Airline} = require('../db.js');
const {Op}= require('sequelize')

    const getAirports = async (req, res) => {
        try {

            const airports = await Airport.findAll({
                where:{
                    state: true
                }
            })
            res.status(200).send(airports);

        }catch(error){

            return res.status(400).send({message: error.message})

        }
    };
    const getAirportBycountry=async(req, res)=>{
try{const {airLine, country}= req.query;
const aereoLinea=await Airline.findOne({
    include:[{model: Airport}],
    where:{
        name: {[Op.like]: `%${airLine}%`}
    }
})


if(aereoLinea){ 
 const  airportByCountry= aereoLinea.Airports.filter(airport=>airport.country=== country)
    res.json(airportByCountry)
}
else{
res.status(400).json('no se encontraron resultados')
}}
catch(error){
    res.status(400).json({message: error.message })  
}
    }

    const getAirport = async (req, res) => {

        const {id} = req.params;

        try {

            const airport = await Airport.findOne({
                where: {id},
                include: [{
                    model: Airline,
                    attributes: ['name','infoContact'],
                    where:{
                    state: true
                    }
                
                }]
            })

            if(!airport) return res.status(404).send({massage:'The airport does not exist'})

            res.status(200).send(airport);

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };

    const  createAirport = async (req, res) => {

        const { name, country, city} = req.body;

        try {
            const newAirport = await Airport.create({
            
                name:name,
                country: country,
                city:city
                
            });

            res.status(200).send(newAirport); 

        }catch(error) {

            return res.status(400).send({error})   

        }
    };

    const updateAirport = async (req, res) => {
        
        const { id } = req.params;
        const { name, country }= req.body;

        const airport = await Airport.findByPk(id)

        try {

            await airport.update({
                name: name, 
                country: country,
            })
            await airport.save()

            res.status(200).send("Actualizado correctamente")

        } catch (error) {

            return res.status(400).send({message: error.message})

        }
    };

    const deleteAirport = async (req, res) => {

        const { id } = req.params

        try {

            await Airport.destroy({
                where:{
                    id,
                }
            })

            res.status(200).send('deleted successfully')

        }catch(error) {

            return res.status(400).send({message: error.message})

        }
    }

   const getAirportByCountry2 = async (req, res) => {

        const {airlineName, country} = req.query;

        try {

            const airline = await Airline.findOne({
                where: {name: airlineName},
                include: [{
                    model: Airport,
                    attributes: ['country']
                }]
            })

            if(!airline) return res.status(404).send({massage:'The airport does not exist'})

            const airports = await airline.getAirports({where:{ country : country}})

            res.status(200).send(airports);

        }catch(error){

            return res.status(400).send({message: error.message});

        }
    };
    const defuseAirport = async(req, res)=>{
        const {id, state}= req.body;
        try {
            const airport= await Airport.findByPk(id)
             await airport.update({
                state: state
             })
           await airport.save()
           res.send("Aereopuerto actualizado")
        } catch (error) {
            res.status(400).json({message: error.message});
        }
        };

    const  addAirlineToAirport = async (req, res) => {

        const {  airportId , airlinesId} = req.body;
    
        console.log( airportId, airlinesId)

        try {

            const airport = await Airport.findByPk(airportId)

            if(airlinesId.length >= 1){
                airlinesId.map( async (airlineId) => {
                   let airLine = await Airline.findByPk(airlineId)
                   await airport.addAirline(airLine)
                  })

                res.status(200).send("Aerolineas agregadas correctamente"); 
            }else{

                const airline = await Airline.findByPk(airlinesId)
                await airport.addAirline(airline)

                res.status(200).send("Aerolinea agregada correctamente"); 
            }
           
        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };

    const  deleteAirlineToAirport = async (req, res) => {

        const {  airportId , airlinesId} = req.body;

        try {

            const airport = await Airport.findByPk(airportId)

            if(airlinesId.length >= 1){
                airlinesId.map( async (airlineId) => {
                   let airLine = await Airline.findByPk(airlineId)
                   await airport.removeAirline(airLine)
                  })

                res.status(200).send("Aerolineas removidas correctamente"); 
            }else{

                const airline = await Airline.findByPk(airlinesId)
                await airport.removeAirline(airline)

                res.status(200).send("Aerolinea removida correctamente"); 
            }
           
        }catch(error) {

            return res.status(400).send({message: error.message})   

        }
    };

module.exports = {
    getAirports,
    createAirport,
    updateAirport,
    deleteAirport,
    getAirport,
    getAirportBycountry,
    getAirportByCountry2,
    addAirlineToAirport,
    deleteAirlineToAirport,
    defuseAirport
  };