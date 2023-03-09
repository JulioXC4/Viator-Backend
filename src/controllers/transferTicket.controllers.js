const {User, Ticket}= require('../db');
const { sendMailTransferE , sendMailTransferR} = require('../utils/emailer');

const transferTickets=async(req, res)=>{
  const {emailR, idTicketSelect} = req.body
  try {
    const UserR =await User.findOne({
      where:{
        email:emailR
      }
    })
    const ticket = await Ticket.findOne({
      where:{
        id:idTicketSelect,
      }
    })
    if (!UserR) {
      res.status(400).json({error:"No existe un usuario con ese email"})
    }else if (!ticket) {
      res.status(400).json({error:"No existe un ticket con ese ID"})
    } else {

      const UserE = await User.findOne({
        where:{
          id: ticket.UserId
        }
      })
      
      if (ticket.activatedTicket === false && UserE.id !== UserR.id) {
        await ticket.update({
          UserId: UserR.id
        })
        res.send("Se hizo la transferencia")
      } else if (UserE.id === UserR.id) {
        res.send("No te puedes enviar a ti mismo")
      }else{
        res.status(400).json({error:`El Ticket con Id:${ticket.id} ya se relleno los datos`})
      }
      
    }

  } catch (error) {
    res.status(400).json({message: error.message})
  }
}
module.exports= {transferTickets};