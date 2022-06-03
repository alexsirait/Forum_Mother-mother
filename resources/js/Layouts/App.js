import React from 'react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/inertia-react';

export default function App({ children, title }) {
    return (
        <>
        <div className="min-h-screen bg-gray-50">
            <Head title={title || 'Forum'}/>
            <Navbar />
            {children}
        </div>

        <footer className="border-t py-8 lg:py-16 mt-16 bg-white">
            <div className='container'>
                <div className="text-center">
                    Create with ❤️ by <span className='font-semibold text-blue-500'>Alex Sirait</span>
                </div>
            </div>
        </footer>
        </>
    );
}
