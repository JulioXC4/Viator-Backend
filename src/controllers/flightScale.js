const {Flight}= require('../db')

const getFlightsScale = async (req, res,) => {
    const {scale} = req.query;
    try {

        const flightScale = await Flight.findAll({where:{scale}});

        const scaleFlight = flightScale.filter(value => value.scale === scale);
        
        if(!scaleFlight.length)throw Error("Not found")
        return res.status(200).send(scaleFlight )
       
    } catch (error) {
        return res.status (400).json({message: error.message})
    }
};



module.exports ={
    getFlightsScale,
}