import React from 'react'
import CategoryPage from './CategoryPage'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

type Props = {
    params: {
        catName: string
    }
}

const Category = async ({ params }: Props) => {

    const session = await getServerSession(authOptions);
    return (
        <CategoryPage params={params} session={session} />
    )
}

export default Category
