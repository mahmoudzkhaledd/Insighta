"use client";
import { useAuthX } from '@/authX/Provider/AuthXProvider';
import React from 'react'

export default function GreetingComponent() {
    const session = useAuthX();
    return (
        <h2 className='font-bold text-xl'>
            Welcome back {session?.user.name ?? "User"},
        </h2>
    )
}
