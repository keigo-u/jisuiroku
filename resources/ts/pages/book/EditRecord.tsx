import React, { ChangeEventHandler, useState } from "react"
import { ReturnButton } from "./ReturenButton"
import { useDeleteRecord, useUpdateRecord } from "../../queries/RecordQuery"
import { Recipe, Record, RecordInput } from "../../types/Record"
import { useLocation, useNavigate } from "react-router-dom"
import { Book } from "../../types/Book"
import { IconNotes, IconPencilPlus } from "@tabler/icons-react"
import { AlertModal } from "../home/AlertModal"

type stateParams  = {
    state: { book: Book, record: Record }
}

export const EditRecordPage: React.FC = () => {

    const { state: { book, record } }: stateParams = useLocation()
    const navigate = useNavigate()
    const updateRecord = useUpdateRecord()
    const deleteRecord = useDeleteRecord()
    const [count, setCount] = useState<number>(record.recipes!.length);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDetail, setInputDetail] = useState('');
    const [date, setDate] = useState<string>(record.recorded_at.split('/').join('-'))
    const [recipes, setRecipes] = useState<Recipe[]>(record.recipes!)
    const [images, setImages] = useState<File[]>([])

    const handleFiles: ChangeEventHandler<HTMLInputElement> = (e) => {
        const fileList = e.currentTarget.files
        if (fileList) {
            const files = Array.from(fileList)
            setImages(images.concat(files))
        }
    }
    const handleAddRecipe = () => {
        setCount((prev) => (prev+1))

        const newRecipe: Recipe = {
            name: inputTitle,
            detail: inputDetail
        };

        const newRecipes = [...recipes, newRecipe];

        setRecipes(newRecipes);
    }
    const handleSubRecipe = () => {
        count > 1 && setCount((prev) => (prev-1))
        recipes.pop()
        setRecipes(recipes)
    }
    const handleChangeRecipe = (index: number, message: string, key: 'name' | 'detail') => {
        const newRecipes = [...recipes];
        newRecipes[index] = key == 'name' ? { name: message, detail: newRecipes[index].detail } : { name: newRecipes[index].name, detail: message };
        setRecipes(newRecipes)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData();
        const inputRecord: RecordInput = {
            id: record.id!,
            book_id: book.id!,
            recorded_at: date,
            recipes: recipes,
        }

        images.map((file, index) => (
            data.append(`images[${index}]`, file)
        ))
        
        const inputJson = JSON.stringify(inputRecord)
        data.append('record', inputJson)
        updateRecord.mutate(data)
    }

    const handleDelete = () => {
        deleteRecord.mutate({book_id:book.id!, id: record.id!})
    }

    if(updateRecord.isSuccess || deleteRecord.isSuccess) {
        navigate('/book/detail', {state: {book: book}})
    }

    return (
        <>
        <ReturnButton />
        <div className="flex flex-col items-center justify-center rounded-lg shadow-lg bg-beige mx-auto md:my-5 w-[32rem]">
            <div className="font-bold text-2xl mt-5">更新する</div>
            <form onSubmit={handleSubmit} className="w-full text-center" id="record_form">
                <div className="m-8">
                    <label htmlFor="file-input" className="text-left block text-sm font-medium mb-1 dark:text-white">料理の画像</label>
                    <input multiple accept="image/*" type="file" name="images" onChange={handleFiles} id="file-input" className="block w-full border bg-white border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
        file:bg-transparent file:border-0
        file:bg-gray-200 file:mr-4
        file:py-3 file:px-4
        dark:file:bg-gray-700 dark:file:text-gray-400"/>
                </div>

                <div className="m-8">
                    <label htmlFor="input-label" className="text-left block text-sm font-medium mb-1 dark:text-white">日付</label>
                    <input type="date" id="input-label" defaultValue={record.recorded_at.split('/').join('-')} onChange={(e) => setDate(e.target.value)} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                </div>
                {record.recipes?.map((recipe, index) => (
                    <div key={index} className="mx-8">
                        <div className="text-left text-sm font-semibold my-1">料理{index+1}：</div>
                        <div className="my-2">
                            <label htmlFor="input-label" className="text-left block text-sm font-medium mb-1 dark:text-white">料理名</label>
                            <input type="text" id="input-label" defaultValue={recipe.name} onChange={(e)=>{handleChangeRecipe(index,e.target.value,'name')}} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                        </div>
                        <div className="my-2">
                            <label htmlFor="input-label" className="text-left block text-sm font-medium mb-1 dark:text-white">レシピもしくはリンク</label>
                            <textarea id="input-label" defaultValue={recipe.detail} onChange={(e)=>{handleChangeRecipe(index,e.target.value,'detail')}} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
                        </div>
                    </div>
                ))}
                <div className="mx-8 my-3 inline-flex rounded-md shadow-sm">
                    <button type="button" onClick={handleAddRecipe} className="py-1 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                        料理を追加する
                    </button>
                    <button type="button" onClick={handleSubRecipe} className="py-1 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                        料理を減らす
                    </button>
                </div>
            </form>
        </div>
        <div className="flex items-center justify-center">
            <button type="button" onClick={() => navigate(-1)} className="m-2 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-gray-300 border-transparent font-semibold bg-red-300 text-gray-700 shadow-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                <IconNotes />
                キャンセル
            </button>
            <button type="submit" form="record_form" className="m-2 py-2 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent font-semibold bg-sky-200 shadow-md hover:bg-sky-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                <IconPencilPlus />
                更新する
            </button>
        </div>
        <div className="flex items-center justify-center m-2">
            <button data-hs-overlay={`#alert-${record.id!}-modal`}>削除する</button> 
        </div>
        <AlertModal id={record.id!} handle={handleDelete} />
        </>
    )
}