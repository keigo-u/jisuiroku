import React from "react";
import { Helmet } from "react-helmet-async";

const TopPage = () => {

    const componentName = '- Jisui6 - 毎日の自炊を記録・共有しよう'
    return (
        <>
        <Helmet><title>{componentName}</title></Helmet>
        <div className="m-20">トップページ</div>
        </>
    )
}

export default TopPage