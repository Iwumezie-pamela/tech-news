'use client'
import React from 'react'

type DeleteProps = {
    id: string
}

function DeleteButton({ id }: DeleteProps) {
    const handleDelete = () => {
        // Implement the delete functionality here
    }

    return (
        <button onClick={handleDelete} className="text-red-600">
            Delete
        </button>
    )
}

export default DeleteButton