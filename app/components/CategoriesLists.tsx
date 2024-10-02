'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { CategoriesResponse } from '../model/PostModel'

function CategoriesLists() {

    const [categories, setCategories] = useState<CategoriesResponse[]>()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Define the async fetch function
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/categories');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchCategories();
    }, []);

    return (
        <div className="flex gap-2 text-sm flex-wrap">
            {categories &&
                categories?.map((category, index) => (
                    <Link
                        key={index}
                        className="px-4 py-1 rounded-md bg-slate-800 text-white cursor-pointer"
                        href={`/categories/${category.catName}`}
                    >
                        {category.catName}
                    </Link>
                ))
            }
            {!categories && loading && <p className="text-center text-gray-400 mx-auto">Loading.....</p>}
            {!categories && !loading && <p className="text-center text-gray-400 mx-auto">Categories not found</p>}
        </div>
    )
}

export default CategoriesLists