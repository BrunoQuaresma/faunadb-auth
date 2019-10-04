import { Request, Response } from 'express'
import { Expr, Client } from 'faunadb'
import { decrypt } from '../token'

export default async (req: Request, res: Response) => {
  try {
    const secret = decrypt(req.cookies.session)
    const expr = new Expr(req.body)
    const client = new Client({ secret })
    const result = await client.query(expr)

    res.status(200).json(result)
    res.json(req.cookies)
  } catch (error) {
    console.log(error)
    res.status(400).json(error.requestResult.responseContent)
  }

  res.end()
}
