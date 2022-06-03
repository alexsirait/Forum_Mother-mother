import React from 'react';
import { Head } from '@inertiajs/inertia-react';
import App from '@/Layouts/App';
import Hero from '@/Components/Hero';

export default function Dashboard(props) {
    return (
        <>
            <div>
                <Hero>
                    <div className="container">
                        <h1 className='font-bold tracking-tighter text-black text-xl sm:text-3xl lg:text-5xl'>
                            Your Statistic
                        </h1>
                    </div>
                </Hero>
            </div>
        </>
    );
}

Dashboard.layout = page => <App children={page}/>
