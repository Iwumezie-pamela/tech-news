import React from 'react'
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import DashboardPage from './DashboardPage';


async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/sign-in");
    }
    return (
        <div>
            <h1>My Posts</h1>
            <DashboardPage session={session}/>
        </div>
    )
}

export default Dashboard