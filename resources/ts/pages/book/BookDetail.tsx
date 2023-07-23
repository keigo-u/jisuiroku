import React, { useState } from 'react'
import { ReturnButton } from './ReturenButton'
import { AddButton } from './AddButton'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecords } from '../../queries/RecordQuery'
import { Book } from '../../types/Book'
import { IconChevronLeft, IconChevronRight, IconNotes } from '@tabler/icons-react'

import { Slide } from './Slide'

type stateParams  = {
    state: { book: Book }
}

export const BookDetailPage: React.FC = () => {
    
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const { state: { book } }: stateParams = useLocation()
    const { data, status } = useRecords(book.id!, page)
    let record
    let meta
    if (status === 'success') {
        record = data['data'][0]
        meta = data['meta']
    }

    return (
        <>
        <ReturnButton />
        <div className='flex items-center justify-end'>
            <button className='inline-flex bg-red-300 px-3 py-1 m-1 rounded-full shadow-xl' onClick={()=>navigate('/book', {state: {book: book}})}>
                <IconNotes className='mr-2'/>
                閉じる
            </button>
        </div>
        <div className='flex flex-col md:flex-row'>
            <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-beige mx-auto md:ml-auto md:mr-0 md:my-5 w-[32rem] h-[32rem]">
                {record && <Slide images={record.images!}/>}
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-beige mx-auto md:ml-0 md:mr-auto md:my-5 w-[32rem] h-[32rem]">
                {status ==='loading' ? (
                    <div className="text-center">読み込み中です。</div>
                ) : status === 'error' ? (
                    <div className="text-center">データの読み込みに失敗しました。</div> 
                ) : data['data'].length == 0 ? (
                    <div className="text-center">記録がありません。</div> 
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
                                <div>料理{index+1}:</div>
                                <div className='font-bold ml-3'>{recipe.name}</div>
                                <div className='ml-3'>{recipe.detail}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        
        {/* ページネーション */}
        <div className='flex items-center'>
            <div className='m-5 mx-auto px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent shadow-md bg-gray-300'>
                <button className='transition-all text-sm'
                    onClick={()=>setPage((prev)=>prev-1)}
                    disabled={page===1}
                >
                    <IconChevronLeft />
                </button>
                {meta && [...Array(meta['total'])].map((_, index) => (
                    <button key={index} className={ page==index+1 ? 'p-2 my-0 bg-gray-400 focus:outline-none transition-all text-lg' : 'p-2 hover:bg-gray-400 focus:outline-none transition-all text-lg dark:focus:ring-offset-gray-800'}
                    onClick={()=>setPage(index+1)}
                    >
                        {index+1}
                    </button>
                ))}
                <button className='transition-all text-sm'
                    onClick={()=>setPage((prev)=>prev+1)}
                    disabled={meta && page===meta['last_page']}
                >
                    <IconChevronRight />
                </button>
            </div>
        </div>

        <AddButton />
        </>
    )
}