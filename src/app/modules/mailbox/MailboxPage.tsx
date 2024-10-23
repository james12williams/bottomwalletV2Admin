import {Navigate, Routes, Route, Outlet} from 'react-router-dom'
import {Compose} from './components/Compose'
import {Sent} from './components/Sent'
import {Drafts} from './components/Drafts'
import {Scheduled} from './components/Scheduled'
import {Delivery} from './components/Delivery'
import {Header} from './Header'
import React, {useState} from "react";
import {ViewProvider} from "./ViewProvider";
import {PageLink, PageTitle} from "../../../_metronic/layout/core";
import {ErrorsPage} from "../errors/ErrorsPage.tsx";

type Props = {
    path: string,
    base?: string,
    baseTitle?: string,
    entityName: string,
};

const MailboxPage = ({path, base, baseTitle, entityName}:Props) => {
    const [baseUrl, setBaseUrl] = useState(base);

    const profileBreadCrumbs: Array<PageLink> = [
        {
            title: baseTitle?baseTitle: entityName+' Profile',
            path: baseUrl ? baseUrl : '/apps/'+path,
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

    return <ViewProvider path={'/apps/'+path}>
        <Routes>
            <Route element={<>
                    <Header/>
                    <Outlet/>
                </>}>

                <Route path='/compose/*' element={<>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Compose Mail</PageTitle>
                    <Compose />
                </>} />

                <Route path='/sent/*' element={<>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Sent Mails</PageTitle>
                    <Sent />
                </>} />

                <Route path='/drafts/*' element={<>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Drafts</PageTitle>
                    <Drafts />
                </>} />

                <Route path='/scheduled/*' element={<>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Scheduled</PageTitle>
                    <Scheduled />
                </>} />

                <Route path='/delivery/*' element={<>
                    <PageTitle breadcrumbs={profileBreadCrumbs}>Delivery Report</PageTitle>
                    <Delivery />
                </>} />

                <Route index element={<Navigate to='compose'/>}/>

                <Route path='*' element={<ErrorsPage/>}/>
            </Route>
        </Routes>
    </ViewProvider>
};

export default MailboxPage
