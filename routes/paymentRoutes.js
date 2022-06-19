const express = require("express");

const router = express.Router();
const {
  doPayment,
} = require("../controllers/paymentController");

router
  .route('/dopayment')
  .post(doPayment);

module.exports = router;







/* const app = express();
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const stripe = require("stripe")(STRIPE_SECRET_KEY);
 */
/* app.post("/api/v1/doPayment/", (req, res) => {
  return stripe.charges
    .create({
      amount: req.body.amount,
      currency: "eur",
      source: req.body.tokenId,
      description: "Test payment",
    })
    .then((result) => res.status(200).json(result));
}); */




module.exports = router;

