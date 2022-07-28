const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const doPayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'CAD',
      payment_method_types: ['card'],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: 'Payment initiated', clientSecret });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { doPayment };
