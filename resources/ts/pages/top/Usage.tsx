import React from "react";
import { Helmet } from "react-helmet-async";

const UsagePage = () => {

    const componentName = '- Jisui6 - 使い方'
    return (
        <>
        <Helmet><title>{componentName}</title></Helmet>
        <div className="m-20">使い方</div>
        </>
    )
}

export default UsagePage