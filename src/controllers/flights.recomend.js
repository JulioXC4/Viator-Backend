const {Flight}= require('../db')
const FligthRandom = require('../utils/utils')

const getRecommendedFlights = async (req, res)=>{
 const vuelos =await Flight.findAll()

    let random=FligthRandom(vuelos)
    
    
    
    res.json(random)


} 
module.exports = getRecommendedFlights