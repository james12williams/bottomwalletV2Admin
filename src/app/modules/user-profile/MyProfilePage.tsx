import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {Overview} from './components/Overview'
import {Logs} from './components/Logs'
import {ProfileHeader} from './ProfileHeader'
import React, {useEffect, useState} from "react";
import {Settings} from "./components/settings/Settings";
import {ErrorsPage} from "../errors/ErrorsPage";
import {UserViewProvider, useUserView} from "./UserViewProvider";
import {WithdrawalAccount} from "./components/WithdrawalAccount";
import {Wallets} from "./components/Wallets";
import {Businesses} from "./components/Businesses";
import {Transactions} from "./components/Transactions";
import DynamicPage from "../dynamic-module/DynamicPage";
import {routerReplace} from "../dynamic-module/dynamic-list/core/QueryResponseProvider";
import {useParams} from "react-router";
import {useAuth} from "../auth";
import {PageLink, PageTitle} from "../../../_metronic/layout/core";

const profileBreadCrumbs: Array<PageLink> = [
  {
    title: 'Profile',
    path: '/apps/account/overview',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
];
type Props = {
    path: string,
    base?: string,
    baseTitle?: string,
};
const MyProfilePage  = ({path, base, baseTitle}:Props) => {
    const {currentUser} = useAuth();
    const params= useParams();
    const [baseUrl, setBaseUrl] = useState(base);
    const  {setCurrentPath, setCurrentUserId} = useUserView();

    useEffect(()=>{
        setBaseUrl(routerReplace(base, params))
    }, [base, params]);

    path = routerReplace(path, params);

    useEffect(()=>{
        setCurrentPath(path);
    }, [path]);

    useEffect(()=>{
        setCurrentPath('users/'+currentUser.id);
        setCurrentUserId(currentUser.id)
    }, []);
    return (<UserViewProvider path={'/apps/users/'+currentUser.id} userId={currentUser.id}>
        <Routes>
            <Route element={
                <>
                    <ProfileHeader/>
                    <Outlet/>
                </>
            }>
                <Route path='/overview' element={<>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Overview</PageTitle>
                    <Overview/>
                </>}
                />
                <Route
                    path='/settings'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Settings</PageTitle>
                            <Settings/>
                        </>
                    }
                />
                <Route
                    path='/logs/*'
                    element={
                        <>
                            <PageTitle breadcrumbs={profileBreadCrumbs}>Logs</PageTitle>
                            <Logs/>
                        </>
                    }
                />

                <Route path='/withdrawal-account/*' element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>Withdrawal Account</PageTitle>
                        <WithdrawalAccount currentUserId={currentUser.id}/>
                    </>
                }
                />
                <Route path='/wallets/*' element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>My Wallets</PageTitle>
                        <Wallets  currentUserId={currentUser.id}/>
                    </>
                }
                />
                <Route path='/transactions/*' element={
                    <>
                        <PageTitle breadcrumbs={profileBreadCrumbs}>Transactions</PageTitle>
                        <Transactions  currentUserId={currentUser.id}/>
                    </>
                }
                />
                <Route index element={<Navigate to='overview'/>}/>
                <Route path='*' element={<ErrorsPage />} />
            </Route>
        </Routes>
    </UserViewProvider>)
};

export default MyProfilePage
