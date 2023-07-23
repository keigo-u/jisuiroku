import React from "react";
import { useNavigate } from "react-router-dom";
import { IconArrowBack } from "@tabler/icons-react";

export const ReturnButton: React.FC = () => {
    const navigate = useNavigate();
    return (
        <button type="button" onClick={() => navigate('/home')} className="m-5 py-1 px-4 inline-flex justify-center items-center gap-2 rounded-full border border-transparent shadow-md bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
            <IconArrowBack />
            <span>一覧にもどる</span>
        </button>
    );
};
