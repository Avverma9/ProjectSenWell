const userModel = require("./user");
//================================POST API====================================//
const createUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists." });
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({ error: "Invalid mobile number format." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ error: "Invalid password format." });
    }

    const newUser = await userModel.create({
      name,
      email,
      mobile,
      password,
    });

    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//================================GET API=========================//

const getData = async function (req, res) {
  try {
    const findData = await userModel.find();
    res.json(findData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//======================================Delete API =============================//
const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const removeData = await userModel.findByIdAndDelete(id);

    if (!removeData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//=========================PUT API=====================================//
const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields." });
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(String(mobile))) {
      return res.status(400).json({ error: "Invalid mobile number format." });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({
          error:
            "Invalid password format. Password should be at least 8 characters with one letter, one digit, and one special character.",
        });
    }

    const updateUser = await userModel.findByIdAndUpdate(
      id,
      { name, email, mobile, password },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createUser, getData, deleteData, updateData };
