require('dotenv').config()

export const JWT_CONSTANT = {
  secret: process.env.JWT_SECRET,
}