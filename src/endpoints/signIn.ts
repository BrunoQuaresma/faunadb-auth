import { Request, Response } from 'express'
import { values, Client, query as q } from 'faunadb'
import { encrypt } from '../token'

type QueryResult = {
  user: {
    ref: values.Ref
  }
  token: {
    secret: string
  }
}

const client = new Client({
  secret: process.env.FAUNADB_SECRET || 'secret'
})

export default async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const result = await client.query<QueryResult>(
      q.Let(
        {
          user: q.Get(q.Match(q.Index('user_by_email'), email)),
          userRef: q.Select('ref', q.Var('user'))
        },
        {
          user: q.Var('user'),
          token: q.Login(q.Var('userRef'), { password })
        }
      )
    )

    const safeSecret = encrypt(result.token.secret)

    res
      .cookie('session', safeSecret, {
        secure: false,
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 3600000) // 24 hours,
      })
      .status(201)
  } catch (error) {
    console.error(error)
    res.status(500)
  }

  res.end()
}
