import RegisterForm from '@/components/Auth/RegisterForm';
import React from 'react'

export default function CreateUserPage() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <RegisterForm redirectTo='/admin/users'/>
        </div>
    );
}
