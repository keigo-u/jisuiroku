import React, { ReactNode, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, RouteProps, RouterProps, RoutesProps } from "react-router-dom";
import TopPage from "./pages/top/Top";
import Sidebar from "./components/sidebar";
import HomePage from "./pages/home/Home";
import { Header } from "./components/Header";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import UsagePage from "./pages/top/Usage";
import { useAuth } from "./hooks/AuthContext";
import { useUser } from "./queries/AuthQuery";
import { NotFoundPage } from "./pages/error/NotFound";
import SharePage from "./pages/share/Share";
import ContactPage from "./pages/contact/Contact";
import { ProfilePage } from "./pages/mypage/ProfilePage";
import BookTopPage from "./pages/book/BookTop";
import { BookDetailPage } from "./pages/book/BookDetail";
import { CreateRecordPage } from "./pages/book/CreateRecord";
import { EditRecordPage } from "./pages/book/EditRecord";
import { CallbackPage } from "./pages/auth/Callback";

type Props = {
    component: ReactNode
}

const Router = () => {
    const { isAuth, setIsAuth } = useAuth()
    const { isLoading, data:authUser } = useUser()

    useEffect(() => {
        if (authUser) {
            setIsAuth(true)
        }
    }, [authUser])

    const GuardRoute: React.FC<Props> = ({ component }) => {
        if (!isAuth) return <Navigate replace to={`/login`} />
        return <>{component}</>
    }

    const LoginRoute: React.FC<Props> = ({ component }) => {
        if (isAuth) return <Navigate replace to={`/home`} />
        return <>{component}</>
    }

    // if (isLoading) {
    //     return <div className="text-center">読込中です。</div>
    // }

    return (
        <BrowserRouter>
            <div className={ isAuth ? "bg-light-beige dark:bg-slate-900 font-NotoSans h-screen" : "h-screen dark:bg-slate-900 bg-gray-100" }>
                { isAuth ? <Sidebar /> : <Header />}
                {/* Main Content */}
                <div className={isAuth ? "w-full h-screen min-h-screen pt-10 px-4 sm:px-6 md:px-8 lg:pl-72 overflow-y-scroll" : ""}>
                <Routes>
                    <Route path={`/`} element={<LoginRoute component={<TopPage />} />} />
                    <Route path={`/usage`} element={<LoginRoute component={<UsagePage />} />} />
                    <Route path={`/login`} element={<LoginRoute component={<LoginPage />} />} />
                    <Route path={`/register`} element={<LoginRoute component={<RegisterPage />} />} />
                    <Route path={`/login/:provider/callback`} element={<LoginRoute component={<CallbackPage />} />} />

                    <Route path={`/home`} element={<GuardRoute component={<HomePage />} />} /> 
                    <Route path={`/book`} element={<GuardRoute component={<BookTopPage />} />} /> 
                    <Route path={`/book/detail`} element={<GuardRoute component={<BookDetailPage />} />} /> 
                    <Route path={`/book/detail/create`} element={<GuardRoute component={<CreateRecordPage />} />} />
                    <Route path={`/book/detail/edit`} element={<GuardRoute component={<EditRecordPage />} />} />
                    <Route path={`/share`} element={<GuardRoute component={<SharePage />} />} /> 
                    <Route path={`/mypage`} element={<GuardRoute component={<ProfilePage />} />} />
                    <Route path={`/contact`} element={<GuardRoute component={<ContactPage />} />} /> 
                    <Route path={`/*`} element={<NotFoundPage />} />
                </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Router;