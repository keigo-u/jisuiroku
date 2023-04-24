import React from "react";

type Props = {
    page: number;
    pageLength: number;
    setState: React.Dispatch<React.SetStateAction<number>>
};
export const NaviButton: React.FC<Props> = ({ page, pageLength, setState }) => {
    const nextPage = () => {setState((prevNum) => prevNum + 1)}
    const prevPage = () => {setState((prevNum) => prevNum - 1)}
    const createRecord = () => {setState(-1)}
    const returnTop = () => {setState(0)}

    return (
        <>
            <div className="mt-16 mb-0">
                {page < pageLength
                    ? <button onClick={nextPage} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">めくる</button>
                    : <button onClick={returnTop} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">表紙に戻る</button>}
                {page == 0 || page >= pageLength
                    ? <button onClick={createRecord} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">記録する</button>
                    : <button onClick={prevPage} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">もどる</button>}

            </div>
        </>
    );
};
