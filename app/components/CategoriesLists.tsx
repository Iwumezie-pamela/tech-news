import React from 'react'
import { categoriesData } from '../constant/data'
import Link from 'next/link'

function CategoriesLists() {
    return (
        <div className="flex gap-2 text-sm flex-wrap">
            {categoriesData &&
                categoriesData.map((category, index) => (
                    <Link
                        key={index}
                        className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
                        href={`/categories/${category.name}`}
                    >
                        {category.name}
                    </Link>
                ))
            }
        </div>
    )
}

export default CategoriesLists