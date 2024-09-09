import jwt, { decode } from "jsonwebtoken"
import 'dotenv/config'
const secretKey = process.env.secretKey
class RoutesAuth {
  async handleValidateToken (req,res,next) {
    try {
      const {token} = req.cookies
      if (!token){
        return res.status(401).json({message:"No hay token"})
      }
      jwt.verify(token,secretKey)
      next();
    } catch (error) {
      console.error(error.message)
      res.status(505).json({message:error.message})
    }

  }
}

export default RoutesAuth