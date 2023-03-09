const axios = require("axios")

const {AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_AUDIENCE} = process.env
//M2M

const getUserRoleById = async (req, res ) =>{

  const {userId} = req.query

  try {
    
    const encodedUserId = encodeURIComponent(userId)
  
      const parm = new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: `${AUTH0_CLIENT_ID}`,
          client_secret: `${AUTH0_CLIENT_SECRET}`,
          audience: `${AUTH0_AUDIENCE}` 
        })
      
      const { data } = await axios.post(
        `${AUTH0_DOMAIN}/oauth/token`,
        parm,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          }
        }
      );
      
     //GET USER ID
     /*  const response = await axios.get(
          `https://dev-kvjr54lumq4827tu.us.auth0.com/api/v2/users/${encodedUserId}`,
          {
              headers: { 
                  Authorization: `Bearer ${data.access_token}`,
              },
          }
          ); 
          res.send(response.data) */
  
    //GET ROLE BY USER ID
    const response = await axios.get(
      `${AUTH0_DOMAIN}/api/v2/users/${encodedUserId}/roles?include_totals=false`,
      {
          headers: { 
              Authorization: `Bearer ${data.access_token}`,
          },
      }
      ); 

      if(Array.isArray(response.data) && response.data.length === 0){
        return res.send("El usuario no posee ningun rol")
      }else{
        res.send(response.data[0].name)
      }

  } catch (error) {

    res.send(error.message)

  }
        
}



//Enviar la ordens
/* const response = await axios.post(
  `${PAYPAL_API}/v2/checkout/orders`,
  order,
  {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }
); */



/* var options = {
    method: 'POST',
    url: 'https://dev-kvjr54lumq4827tu.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'Wv5XDLGXATepf0hmLhpBbF2PTGCm5jLy',
      client_secret: 'RlH2SPSKyV1U3O1ClIhXog5wFh27-UyQB5qB1hpXX7v6uvUCkBkmfoG4ewxDj_rw',
      audience: 'this is a unique identifier viator'
    })
  };
  
  const tk = await axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
 */

module.exports = {
  getUserRoleById,
  };