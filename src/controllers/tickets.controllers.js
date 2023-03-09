const {Ticket, Flight, User,Airline} = require('../db.js');

    const getTickets = async (req, res) => {

        try {

            const tickets = await Ticket.findAll()
            res.json(tickets);

        }catch (error) {

            return res.status (400).json({message: error.message})

        }
    };
    const getTicket = async (req, res) => {

        const {id} = req.params;

        try {

            const ticketId = await Ticket.findOne({
                where: {id},
                include: [
                    { model: User },
                    { model: Flight,
                        include:[Airline]
                    }
                  ]
            })

            if(!ticketId)return res.status(404).json({massage:'Ticket not exist'})

            res.json(ticketId);
        }catch(error) {

            return res.status(400).json({message: error.message});
        }
    };

    const createTicket = async (req, res) => {

        const { flightId, userId, quantity } = req.body;
      
        const flight = await Flight.findByPk(flightId);

        const user = await User.findByPk(userId);
      
        const newTickets = [];

        try {

          for (let i = 0; i < quantity; i++) {
            const newTicket = await Ticket.create({
              seat: flight.seatsAvailable,
              UserId: userId,
              FlightId: flightId,
            });

            await flight.update(
              {
                seatsAvailable: flight.seatsAvailable - 1,
              },
            );

            await flight.save()

            newTickets.push(newTicket);
          }
      
            if(newTickets.length >= 1){

                newTickets.map( async (e) => {

                    const ticket = await Ticket.findByPk(e.id)
                    await user.addTicket(ticket)

                  })

            }
           
            return res.status(200).send("Boletos agregados correctamente"); 
      
        } catch (error) {

          return res.status(400).send("No se pudo crear los boletos");

        }
      };

    const updateTicket = async (req, res ) =>{

        const { id } = req.params;
        const {namePassanger,email}= req.body;
        
        try {
            const ticketnew = await Ticket.findByPk(id)
            //Metodo Update?
            if (ticketnew.activatedTicket === false) {
                ticketnew.namePassanger = namePassanger,
                ticketnew.email = email,
                ticketnew.activatedTicket = true
        
                await ticketnew.save()
                const newTicket = await Ticket.findByPk(id)
                res.status(200).json({
                    message:'successfully modified',
                    change:newTicket
                })
            }else{
                res.status(400).send("Este ticket ya esta asignado")
            }

        }catch (error) {

            return res.status (400).json({message: error.message})

        }
    };

    const deleteTicket= async (req, res ) =>{
        try {
            const { id } = req.params

            const ticketId = await Ticket.findOne({
                where: {id},
                include: [{
                    model: Flight,
                }]
            })

            await Flight.update({
                seatsAvailable:ticketId.Flight.seatsAvailable + ticketId.seat
            },{
                where:{
                    id:ticketId.Flight.id
                }
            }) 

            await Ticket.destroy({
                where:{
                    id,
                }
            })
        
            res.status(200).send('deleted successfully')

        }catch(error){

            return res.status (400).json({message: error.message})

        }
    }

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
  };