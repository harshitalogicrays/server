import express from 'express'

import Stripe from 'stripe'
import cors from 'cors'

const stripe = new Stripe('sk_test_51NOvqGSAvExKFAjaTkSgqxNXs5WQ8TofJQrBOJIhdkFNDBKzqbWwMSYYzbsfP6ozzQ1n3sljsSbCVHYnMhcePzGz00PbYWzMiX');
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//http://localhost:1000 (root)
app.get('/',(req,res)=>{
    res.status(200).send("hello from server derfdfedre")
})

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

const PORT=1000
app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`));