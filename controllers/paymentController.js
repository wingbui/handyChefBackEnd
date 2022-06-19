const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const doPayment = async (req, res) => {
  try {
    const {name} = req.body;
    if(!name) return res.status(400).json({ message: 'Please enter a name' });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(25 * 100),
      currency: 'CAD',
      payment_method_types: ["card"],
      metadata: {name}
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: 'Payment initiated', clientSecret });
  } catch(err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { doPayment };

// Pasted from the web article
/* return stripe.charges
  .create({
    amount: req.body.amount,
    currency: req.body.currency,
    source: req.body.tokenId,
    description: req.body.description,
  })
  .then((result) => res.status(200).json(result)); */