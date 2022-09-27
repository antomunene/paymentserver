require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe= require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const app =express();
app.use(cors());
app.use(express.json());
const storeItems = new Map([
    [1,{priceincents: 1000, name: "Learn react today"}],
    [1,{priceincents: 2000, name: "Learn css today"}],

]);

app.listen(3000, () => console.log("Listeaning ...."));
app.post("/api",async(request,response) =>{
  try{
   const session= await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [{ quantity: 1,
        price_data:{
            unit_amount: 1000,
            currency: 'usd',
            product_data:{
                name: 'Trial'
            }
        }

    }],
   
    /*
    line_items: request.body.items.map(item =>{
        const storeItem = storeItems.get(item.id);
        return{
            quantity: 1,
            price_data:{
                unit_amount: 1000,
                currency: 'usd',
                product_data:{
                    name: 'Trial'
                }
            }
        }
    }),
   
*/
    success_url:"https://exetercareers.com/employeereferral",
    cancel_url:"https://exetercareers.com"
   });
    response.json({url: session.url});

  }catch(e){
    /*response.status(500).json({error: e.mesagge})*/
   console.log(e);
  }
  
});