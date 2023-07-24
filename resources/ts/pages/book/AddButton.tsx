import React from "react";
import { IconPencilPlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Book } from "../../types/Book";

type Props = {
    book: Book
}

export const AddButton: React.FC<Props> = ({ book }) => {
    return (
        <div className="flex">
            <Link to={"/book/detail/create"} state={{book: book}} className="bg-sky-200 hover:bg-sky-300 rounded-lg shadow-lg ml-auto mr-3 p-5 flex">
                <IconPencilPlus />
                <span>記録する</span>
            </Link>
        </div>
    );
};
