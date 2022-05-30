import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// PUT /api/company
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const companyId = req.query.id;
    const { quantity, gameId } = req.body as { quantity: number, gameId: number };

    const result = await prisma!.company.update({
        where: { id: Number(companyId) },
        data: {
            companyPayingShares: quantity,
        },
        include: {
            companyShares: true,
        }
    });

    res.json(result);
}