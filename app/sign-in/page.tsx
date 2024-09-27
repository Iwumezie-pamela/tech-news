import React from 'react'
import SignInPage from './SignInPage'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';

async function SignIn() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }
    return (
        <SignInPage />
    )
}

export default SignIn