import { Request, Response } from 'express'
import { Client, query as q } from 'faunadb'

const client = new Client({
  secret: process.env.FAUNADB_SECRET || 'secret'
})

export default async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    await client.query(
      q.Create(q.Collection('users'), {
        credentials: {
          password
        },
        data: {
          email
        }
      })
    )

    res.status(201)
  } catch (error) {
    console.error(error)
    res.status(500)
  }

  res.end()
}
