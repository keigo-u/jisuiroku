import React, { ChangeEventHandler, useState } from "react";
import { Recipe, Record } from "../../types/Record";
import { Book } from "../../types/Book";
import { useCreateRecord } from "../../queries/RecordQuery";

type Props = {
    book: Book
}

export const CreateRecord: React.FC<Props> = ({ book }) => {

    const createRecord = useCreateRecord()

    const [count, setCount] = useState<number>(1);
    const [inputTitle, setInputTitle] = useState('');
    const [inputDetail, setInputDetail] = useState('');
    const [recipes, setRecipes] = useState<Recipe[]>([{'name': inputTitle, 'detail': inputDetail}])
    const [images, setImages] = useState<File[]>([])
    const [date, setDate] = useState<string>('')

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
        const inputRecord: Record = {
            book_id: book.id!,
            recorded_at: date,
            recipes: recipes,
        }

        images.map((file, index) => (
            data.append(`images[${index}]`, file)
        ))
        
        const inputJson = JSON.stringify(inputRecord)
        data.append('record', inputJson)

        // console.log(data.get('images[1]'))
        createRecord.mutate(data)
    }

    return (
        <>
            <div>新しく記録する</div>
            <form onSubmit={handleSubmit}>
                <div className="m-8">
                    <label htmlFor="file-input" className="text-left block text-sm font-medium mb-1 dark:text-white">料理の画像</label>
                    <input multiple accept="image/*" type="file" name="images" onChange={handleFiles} id="file-input" className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
        file:bg-transparent file:border-0
        file:bg-gray-200 file:mr-4
        file:py-3 file:px-4
        dark:file:bg-gray-700 dark:file:text-gray-400"/>
                </div>

                <div className="m-8">
                    <label htmlFor="input-label" className="text-left block text-sm font-medium mb-1 dark:text-white">日付</label>
                    <input type="date" id="input-label" onChange={(e) => setDate(e.target.value)} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                </div>
                {[...Array(count)].map((_, index) => (
                    <div key={index} className="mx-8">
                        <div className="text-left text-sm font-semibold my-1">料理{index+1}：</div>
                        <div className="my-2">
                            <label htmlFor="input-label" className="text-left block text-sm font-medium mb-1 dark:text-white">料理名</label>
                            <input type="text" id="input-label" onChange={(e)=>{handleChangeRecipe(index,e.target.value,'name')}} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="you@site.com" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="input-label" className="text-left block text-sm font-medium mb-1 dark:text-white">レシピもしくはリンク</label>
                            <textarea id="input-label" onChange={(e)=>{handleChangeRecipe(index,e.target.value,'detail')}} className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"/>
                        </div>
                    </div>
                ))}
                <div className="mx-8 inline-flex rounded-md shadow-sm">
                    <button type="button" onClick={handleAddRecipe} className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                        料理を追加する
                    </button>
                    <button type="button" onClick={handleSubRecipe} className="py-3 px-4 inline-flex justify-center items-center gap-2 -ml-px first:rounded-l-lg first:ml-0 last:rounded-r-lg border font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400">
                        料理を減らす
                    </button>
                </div>
                <div className="m-8">
                    <button type="submit" className="w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                    記録する
                    </button>
                </div>
            </form>
        </>
    );
};
