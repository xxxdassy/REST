import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization

  const SECRET_KEY = process.env.SECRET_KEY

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'not authorized' })
      }

      next()
    })
  }

  res.status(401)
}
