import {useEffect, useState} from 'react'
import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {HeaderWrapper} from './components/header'
import {ScrollTop} from './components/scroll-top'
import {FooterWrapper} from './components/footer'
import {Sidebar} from './components/sidebar'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import {useAuth} from "../../app/modules/auth";
import {ErrorsHandler} from "../../app/modules/errors/ErrorsPage.tsx";
import {Content} from "./components/content";
import {QueryRequestProvider} from "../../layouts/core/QueryRequestProvider.tsx";
import {ToolbarWrapper} from "./components/toolbar";
import {ActivityDrawer, DrawerMessenger} from "../partials";

const MasterLayout = () => {
    const [hasError, setHasError] = useState(false);
    const {isAuth, errorCode} = useAuth();
    const location = useLocation();

    useEffect(() => {
        reInitMenu()
        setHasError(false)
    }, [location.key])

    useEffect(() => {
        setHasError(!!errorCode)
    }, [errorCode]);

    return (<>{isAuth? <QueryRequestProvider>
        <PageDataProvider>
        <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
            <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
                <HeaderWrapper />
                <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
                    <Sidebar />
                    <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
                        <ToolbarWrapper />
                        <div className='d-flex flex-column flex-column-fluid'>
                            <Content>
                                {hasError? <ErrorsHandler errorCode={errorCode}/>: <Outlet />}
                            </Content>
                        </div>
                        <FooterWrapper />
                    </div>
                </div>
            </div>
        </div>
        <ScrollTop />
        <ActivityDrawer/>
        <DrawerMessenger/>
    </PageDataProvider>
    </QueryRequestProvider>:<Navigate to='/auth/login' />}</>)
};
export {MasterLayout}