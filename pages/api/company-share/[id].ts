import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PUT /api/company-share
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const companyShareId = req.query.id;
    const { quantity, gameId } = req.body as { quantity: number, gameId: number};

    const result = await prisma!.companyShare.update({
        where: { id: Number(companyShareId) },
        data: {
            quantity: quantity,
        },
    });

    res.json(result);
}