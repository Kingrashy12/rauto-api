import jwt from "jsonwebtoken";

const genAuthToken = (user) => {
  const authKey = process.env.JWT_SECRET;
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    authKey
  );

  return token;
};

export default genAuthToken;
