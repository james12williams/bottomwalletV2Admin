/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage} from '../modules/auth'
import {App} from '../App'
import {DefaultLayout} from "../../layouts/DefaultLayout.tsx";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {BASE_URL} = import.meta.env

const AppRoutes: FC = () => {

  return (
    <BrowserRouter basename={BASE_URL}>
        <Routes>
            <Route element={<App />}>
                <Route path='/' element={<DefaultLayout />}>
                    <Route index element={<Navigate to='apps/dashboard' />} />
                </Route>

                <Route path='logout' element={<Logout />} />
                <Route path={'auth'} >
                    <Route path='*' element={<AuthPage />} />
                    <Route index element={<Navigate to='login' />} />
                </Route>
                <Route path={'apps'}>
                    <Route path='*' element={<PrivateRoutes />} />
                    <Route index element={<Navigate to='dashboard' />} />
                </Route>
                <Route path='*' element={<ErrorsPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
