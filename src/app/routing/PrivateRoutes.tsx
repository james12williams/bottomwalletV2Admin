import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {ErrorsPage} from "../modules/errors/ErrorsPage";
import {DynamicCreate} from "../modules/dynamic-module/dynamic-list/DynamicCreate.tsx";
import {PageTitle} from "../../_metronic/layout/core";
import {useApp} from "../../layouts/core/QueryResponseProvider.tsx";

const PrivateRoutes = () => {
    const {routes} = useApp();
    const MyProfilePage = lazy(() => import('../modules/user-profile/MyProfilePage'))
    const UserProfilePage = lazy(() => import('../modules/user-profile/UserProfilePage'))
    const MailboxPage = lazy(() => import('../modules/mailbox/MailboxPage'))
    const ChatPage = lazy(() => import('../modules/chat/ChatPage'))
    const DynamicPage = lazy(() => import('../modules/dynamic-module/DynamicPage'));

    return (
        <Routes>
            <Route element={<MasterLayout />}>
                {/* Redirect to Dashboard after success login/registartion */}
                <Route path='auth/*' element={<Navigate to='/dashboard' />} />
                {/* Pages */}
                <Route path='dashboard' element={<DashboardWrapper />} />
                <Route path='account/*' element={<SuspensedView><MyProfilePage path={'account'}/>
                </SuspensedView>} />

                <Route path='builder' element={<BuilderPageWrapper />} />

                {/* User Module */}
                <Route path='users/create'
                       element={<SuspensedView><PageTitle breadcrumbs={[
                           {title: "List User", path: '/apps/users', isSeparator: false, isActive: false},
                           {title: '', path: '', isSeparator: true, isActive: false},
                       ]}>{'Create User'}</PageTitle>
                           <DynamicCreate apiPath="users" queryName={'user_create'} />
                       </SuspensedView>}
                />
                <Route path='admins/create'
                       element={<SuspensedView><PageTitle breadcrumbs={[
                           {title: "List Admin", path: '/apps/admins/create', isSeparator: false, isActive: false},
                           {title: '', path: '', isSeparator: true, isActive: false},
                       ]}>{'Create Admin'}</PageTitle>
                           <DynamicCreate apiPath="admins" queryName={'admin_create'} />
                       </SuspensedView>}/>
                <Route path='users/:userId/*' element={<SuspensedView>
                    <UserProfilePage  entityName={'User Detail'} entityNamePlural={'User Detail'}
                                      base={'/apps/users'}
                                      baseTitle={'Users Management'}
                                      path={'users/:userId'} queryName={'user-detail'} />
                </SuspensedView>} />
                <Route path='admins/:userId/*' element={<SuspensedView>
                    <UserProfilePage  entityName={'Admin Detail'} entityNamePlural={'Admin Detail'}
                                      base={'/apps/admins'}
                                      baseTitle={'Admin Management'}
                                      path={'admins/:userId'} queryName={'admin-detail'} />
                </SuspensedView>} />


                {/* Lazy Modules */}
                <Route path='mailbox/*' element={<SuspensedView>
                    <MailboxPage  entityName={"Mailbox"} path={'mailbox'} base={'/apps/mailbox'} baseTitle={'Mailbox'}/>
                </SuspensedView>} />
                <Route
                    path='chat/*'
                    element={
                        <SuspensedView>
                            <ChatPage />
                        </SuspensedView>
                    }
                />

                {
                    routes.map((route:any)=>{
                        return <Route path={route.path+'/*'} element={<SuspensedView>
                            <DynamicPage {...route}/>
                        </SuspensedView>} key={'route_'+route.queryName}/>
                    })
                }

                {/* Page Not Found */}
                <Route path='*' element={<ErrorsPage showFooter={false} showLogo={false} />} />
            </Route>
        </Routes>
    )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
    const baseColor = getCSSVariableValue('--bs-primary')
    TopBarProgress.config({
        barColors: {
            '0': baseColor,
        },
        barThickness: 1,
        shadowBlur: 5,
    })
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
