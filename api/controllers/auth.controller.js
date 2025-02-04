import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Hashing Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Creating User Insert to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User Created Successfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // CEK JIKA USER ADA
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) return res.status(404).json({ message: "Invalid Credentials!" });

    // CEK JIKA PASSWORD BENAR
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    // GENERATE COOKIE TOKE DAN KIRIM PADA USER
    // res.setHeader("Set-Cookie", "test=" + "myValue").json("success");
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,{expiresIn: age}
    );
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .statis(200)
      .jsom({ messaage: "login sukses" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to Login" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({message: "logout sukses"})
};
