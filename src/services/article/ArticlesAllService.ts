import prismaClient from '../../prisma';


interface ArticleRequest{
    article_id: string;
}

class ArticlesAllService {
    async execute({article_id}: ArticleRequest) {
        const findAll = await prismaClient.article.findMany({
            where: {
                id: article_id,
            }
        })
        return findAll;
    }
}

export { ArticlesAllService }