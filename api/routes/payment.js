const User = require("../models/User");
const Payment = require("../models/Payment");
const router = require("express").Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

require("dotenv").config();

router.post("/",  verifyToken, async (req, res) => {
  const { userId, cart } = req.body;

  //Build profile object
  const paymentFields = {};
  let transactionData = {};

  paymentFields.user = userId;
  if (cart) paymentFields.cart = cart;

  try {
    let my_profile = await User.findOne({ _id: userId });

    console.log(my_profile);

    my_profile.orders.unshift(paymentFields);

    await my_profile.save();
    res.status(200).json({ success: true, my_profile });

    transactionData.user = {
      userId: userId,
      username: my_profile.username,
      email: my_profile.email,
    };

    transactionData.data = {
      data: req.body.data,
      reference: req.body.reference,
      message: req.body.message,
      status: req.body.status,
      transaction: req.body.transaction,
    };

    const payment = new Payment(transactionData);
    await payment.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get("/", auth, async (req, res) => {
//   try {
//     const payment = await Payment.find();
//     res.json({ success: true, payment });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// });

module.exports = router;
