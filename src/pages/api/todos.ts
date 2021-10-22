// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  id: string
  text: string
}

const todos = [
  { id: '1', text: 'wash dishes' },
  { id: '2', text: 'send email' },
  { id: '3', text: 'check how to automate email sending' },
]

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(todos)
}
