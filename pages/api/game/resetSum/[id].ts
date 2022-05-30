import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';

// PUT /api/game/resetSum/[id]
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const gameId = req.query.id;
    
    // update users
    await prisma!.user.updateMany({
        where: { gameId: Number(gameId) },
        data: { cumulativePayout: 0 }
    });
    const userResult = await prisma!.user.findMany({
        where: { gameId: Number(gameId) },
        orderBy: {
            name: "asc"
        }
    });

    // update companies
    await prisma!.company.updateMany({
        where: { gameId: Number(gameId) },
        data: { cumulativeReceived: 0 }
    });
    const companyResult = await prisma!.company.findMany({
        where: { gameId: Number(gameId) },
        orderBy: {
            companyCode: "asc"
        },
        include: {
            companyShares: {
                orderBy: {
                    id: "asc"
                }
            }
        }
    });

    const result = { usersResult: userResult, companiesResult: companyResult };

    res.json(result);
}