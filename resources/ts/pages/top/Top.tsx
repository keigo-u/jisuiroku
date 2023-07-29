import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TopPage = () => {

    const componentName = '- Jisui6 - 毎日の自炊を記録・共有しよう'
    return (
        <>
        <Helmet><title>{componentName}</title></Helmet>
        {/* Hero */}
            <div className="max-w-[85rem] mx-auto my-10 px-4 sm:px-6 lg:px-8">
            {/* Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
                <div>
                <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">毎日の自炊を</h1>
                <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight dark:text-white">記録・共有しよう</h1>
                <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">毎日ご飯を作っているそこのあなた、いつもお疲れ様です。</p>
                <p className="mb-3 text-lg text-gray-800 dark:text-gray-400">せっかく作ったなおいしそうな料理。ぜひ自炊録に残しましょう。</p>

                {/* Buttons */}
                <div className="mt-7 grid gap-3 w-full sm:inline-flex">
                    <Link to={`/register`} className="inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-sm lg:text-base text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800">
                    自炊録を始める
                    <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    </Link>
                </div>
                {/* End Buttons */}

                </div>
                {/* End Col */}

                <div className="relative ml-4">
                <img className="w-full rounded-md" src="https://res.cloudinary.com/dlqup7j3n/image/upload/v1690645647/home_square.png" alt="Image Description" />
                <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 w-full h-full rounded-md mt-4 -mb-4 mr-4 -ml-4 lg:mt-6 lg:-mb-6 lg:mr-6 lg:-ml-6 dark:from-slate-800 dark:via-slate-900/0 dark:to-slate-900/0"></div>

                </div>
                {/* End Col */}
            </div>
            {/* End Grid */}
            </div>
            {/* End Hero */}
        </>
    )
}

export default TopPage