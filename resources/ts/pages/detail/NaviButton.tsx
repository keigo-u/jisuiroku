import React from "react";

type Props = {
    page: number;
    pageLength: number;
    prev: () => void;
    next: () => void;
    top: () => void;
};
export const NaviButton: React.FC<Props> = ({ page, pageLength, prev, next, top }) => {

    return (
        <>
            <div className="flex mt-auto mb-0">
                {page < pageLength
                    ? <button onClick={next} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">めくる</button>
                    : <button onClick={top} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">表紙に戻る</button>}
                {page == 0 || page >= pageLength
                    ? <button className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">記録する</button>
                    : <button onClick={prev} className="m-5 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:ring-offset-gray-800">もどる</button>}

            </div>
        </>
    );
};
