const { Data } = require("../models/data");
const { User } = require("../models/user");

const registerUser = async (req, res) => {
  try {
    const { name, phone, type, pin } = req.body;
    const user = new User({
      name: name,
      ref_user: {
        role: 0,
        info: null
      },
      phone: phone,
      type: type,
      pin: pin
    });
    await user.save();
    res.status(200).send({
      message: user,
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString(),
    });
  }
};

const getUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    const user = await User.findOne({ _id: user_id });
    res.status(200).send({
      message: user,
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString(),
    });
  }
};

const login = async (req, res) => {
  try {
    const { phone, pin } = req.body;
    const user = await User.findOne({ phone: phone, pin: pin }).lean();
    res.status(200).send({
      message: {
        isAuth: true,
        ...user
      },
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString(),
    });
  }
}


module.exports = {
  registerUser: registerUser,
  getUser: getUser,
  login
};
