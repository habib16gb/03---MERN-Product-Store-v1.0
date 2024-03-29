import jwt from "jsonwebtoken";

const generateAT = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "5m",
  });

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 5 * 60 * 1000,
  });
};

export { generateAT };
