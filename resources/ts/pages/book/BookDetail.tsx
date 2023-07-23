import React, { useState } from 'react'
import { ReturnButton } from './ReturenButton'
import { AddButton } from './AddButton'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRecords } from '../../queries/RecordQuery'
import { Book } from '../../types/Book'

import { Slide } from './Slide'

type stateParams  = {
    state: { book: Book }
}

export const BookDetailPage: React.FC = () => {
    
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const { state: { book } }: stateParams = useLocation()
    const { data:record, status } = useRecords(book.id!, page)
    console.log(record)

    return (
        <>
        <ReturnButton />
        <div className='flex flex-col md:flex-row'>
            <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-beige mx-auto md:ml-auto md:mr-0 md:my-5 w-[32rem] h-[32rem]">
                {record && <Slide images={record.images!}/>}
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-beige mx-auto md:ml-0 md:mr-auto md:my-5 w-[32rem] h-[32rem]">
                {status ==='loading' ? (
                    <div className="text-center">読み込み中です。</div>
                ) : status === 'error' ? (
                    <div className="text-center">データの読み込みに失敗しました。</div> 
                ) : (
                    <div className='w-full h-full'>
                        <div className='m-5 flex'>
                            <div className='mr-3 text-xl'>{record.recorded_at}</div>
                            <div className='flex items-center justify-center'>
                                <img src={book.user_icon} className='w-5 h-5 border border-gray-300 rounded-full mr-1
                                '/>
                                {book.created_by}
                            </div>
                        </div>
                        {record.recipes?.map((recipe, index) => (
                            <div key={index} className='m-4'>
                                <div>料理{index+1}：</div>
                                <div className='font-bold ml-3'>{recipe.name}</div>
                                <div className='ml-3'>{recipe.detail}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        <AddButton />
        </>
    )
}