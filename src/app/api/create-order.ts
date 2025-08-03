
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const body = req.body;

  const response = await fetch(
    `https://your-project-id.api.sanity.io/v2023-07-10/data/mutate/production`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify({
        mutations: [
          {
            create: {
              _type: 'order',
              customerName: body.customerName,
              email: body.email,
              address: body.address,
              products: body.products,
              totalAmount: body.totalAmount,
              status: 'Pending',
              createdAt: new Date().toISOString(),
            },
          },
        ],
      }),
    }
  );

  const data = await response.json();
  return res.status(200).json(data);
}
