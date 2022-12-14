import prismaClient from '../../prisma';

class PageListUsersService {
    async execute(page = 1, limit = 4) {

        const skip = limit * (page - 1);

        const allUsers = await prismaClient.user.findMany({
            orderBy: {
                created_at: 'desc'
            }
        });

        const users = await prismaClient.user.findMany({
            skip,
            take: limit,
            orderBy: {
                created_at: 'desc'
            }
        });

        // Retornamos um objeto onde tem a lista e tambem qual numero total de paginas tem com base no limite que recebeu
        const data = {
            users,
            total: allUsers.length,
            total_pages: Math.ceil(allUsers.length / limit),
            current_page: page,
        }

        return data;

    }
}

export { PageListUsersService }