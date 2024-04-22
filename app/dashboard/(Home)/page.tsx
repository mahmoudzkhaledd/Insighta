
import React from 'react'
import Frameworks from './_components/Frameworks'
import GreetingComponent from './_components/GreetingComponent'

export default function DahboardHome() {

    return (
        <main className='flex mx-auto flex-col gap-4 p-2 lg:pt-[30px] lg:px-[30px]  '>
            <GreetingComponent />
            <h2 className="font-bold text-xl">
                You're just a couple steps
                away from your first user.
            </h2>
            <Frameworks />
        </main>
    )
}
