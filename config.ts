export const config = {
  jwtSecret: process.env.JWT_SECRET as string,
  mongoURI: process.env.MONGODB_URI as string,
};
