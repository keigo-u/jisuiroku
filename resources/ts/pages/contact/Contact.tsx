import React, { FormEvent, useState } from "react";
import { Contact } from "../../types/Contact";
import { useContact } from "../../queries/ContactQuery";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {

    const componentName = 'お問い合わせ'
    const contact = useContact()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [body, setBody] = useState('')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const params: Contact = {
            name: name,
            email: email,
            body: body
        }

        contact.mutate(params)
        setName('')
        setEmail('')
        setBody('')
    }

    return (
        <>
        <Helmet><title>{componentName}</title></Helmet>
        <div className="flex">
            <div className="text-2xl m-5 px-12 py-2 bg-brown drop-shadow-md rounded">お問い合わせ</div>
        </div>

        {/* Comment Form */}
        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-2xl">

            {/* Card */}
            <div className="my-5 p-4 relative z-10 bg-beige drop-shadow-md border rounded-xl sm:my-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center">
                <h2 className="my-2 text-xl font-bold text-gray-600 dark:text-white">
                    お問い合わせ・ご要望フォーム
                </h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 sm:mb-8">
                <label htmlFor="hs-feedback-post-comment-name-1" className="block mb-2 text-sm font-medium dark:text-white">お名前</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="hs-feedback-post-comment-name-1" className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="お名前を入力してください" />
                </div>

                <div className="mb-4 sm:mb-8">
                <label htmlFor="hs-feedback-post-comment-email-1" className="block mb-2 text-sm font-medium dark:text-white">メールアドレス</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="hs-feedback-post-comment-email-1" className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="メールアドレスを入力してください" />
                </div>

                <div>
                <label htmlFor="hs-feedback-post-comment-textarea-1" className="block mb-2 text-sm font-medium dark:text-white">お問い合わせ内容</label>
                <div className="mt-1">
                    <textarea value={body} onChange={(e)=>setBody(e.target.value)} id="hs-feedback-post-comment-textarea-1" name="hs-feedback-post-comment-textarea-1" rows={3} className="border py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 sm:p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" placeholder="お問い合わせ内容を入力してください"></textarea>
                </div>
                </div>

                <div className="mt-6 text-center">
                <button type="submit" className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-full border border-transparent bg-slate-300 drop-shadow-md hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800">送信する</button>
                </div>
            </form>
            </div>
            {/* End Card */}
        </div>
        </div>
        {/* End Comment Form */}
        </>
    )
}

export default ContactPage