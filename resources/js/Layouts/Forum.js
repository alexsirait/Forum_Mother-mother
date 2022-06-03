import React from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/inertia-react';
import Sidebar from '@/Components/Sidebar'

export default function App({ children, title }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title || 'Forum'}/>

            <Navbar />
            <div className="container">
                <div className="flex flex-col lg:flex-row pt-8 gap-10">
                    <div className="w-full lg:w-1/4">
                        <Sidebar />
                    </div>
                    <div className="w-full lg:w-3/5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
