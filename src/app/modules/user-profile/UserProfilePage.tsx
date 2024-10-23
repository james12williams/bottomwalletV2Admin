import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {Overview} from './components/Overview'
import {Logs} from './components/Logs'
import {ProfileHeader} from './ProfileHeader'
import React, {useEffect, useState} from "react";
import {Settings} from "./components/settings/Settings";
import {useParams} from "react-router";
import {routerReplace} from "../dynamic-module/dynamic-list/core/QueryResponseProvider";
import {ErrorsPage} from "../errors/ErrorsPage";
import {UserViewProvider, useUserView} from "./UserViewProvider";
import {WithdrawalAccount} from "./components/WithdrawalAccount";
import {Wallets} from "./components/Wallets";
import {Transactions} from "./components/Transactions";

type Props = {
    path: string,
    base?: string,
    baseTitle?: string,
    entityNamePlural: string,
    entityName: string,
    queryName: string,
    usersBreadcrumbs?: any,
};

const UserProfilePage = ({path, base, baseTitle, entityName, entityNamePlural, queryName, usersBreadcrumbs}:Props) => {
    const params= useParams();
    const [baseUrl, setBaseUrl] = useState(base);
    const  {setCurrentPath, currentUser} = useUserView();
    useEffect(()=>{
        setBaseUrl(routerReplace(base, params))
    }, [base, params]);
    path = routerReplace(path, params);

    useEffect(()=>{
        setCurrentPath(path);
    }, [path]);

    const profileBreadCrumbs: Array<PageLink> = [
        {
            title: baseTitle?baseTitle: entityName+' Profile',
            path: baseUrl?baseUrl:'/apps/'+path,
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
    return <UserViewProvider path={'/apps/'+path} userId={params.userId}>
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
                path='/logs'
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
                    <WithdrawalAccount currentUserId={params.userId}/>
                </>
            }
            />
            <Route path='/wallets/*' element={
                <>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>My Wallets</PageTitle>
                    <Wallets  currentUserId={params.userId}/>
                </>
            }
            />
            <Route path='/transactions/*' element={
                <>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Transactions</PageTitle>
                    <Transactions  currentUserId={params.userId}/>
                </>
            }
            />
            <Route index element={<Navigate to='overview'/>}/>
            <Route path='*' element={<ErrorsPage />} />
        </Route>
    </Routes>
    </UserViewProvider>
};

export default UserProfilePage
