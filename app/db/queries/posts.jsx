import { Post, PrismaClient } from '@prisma/client' // Importing the Post type from the Prisma client library.
import { db } from '../../db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.
import { getServerSession } from 'next-auth'

export async function fetchPosts() {  // Function to fetch all posts from the database.
    return await db.post.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            }
        ],
    })
}

export async function fetchPostById(id) { // Function to fetch a single post by its ID.
    const post = await db.post.findFirst({
        where: {
            id
        }
    })

    if (!post) {
        notFound() // If the post is not found, a 404 error is thrown.
    }

    return post
}
