/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link, Navigate, Route, Routes} from 'react-router-dom'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {NewPassword} from "./components/NewPassword";
import {TwoFactor} from "./components/TwoFactor";
import {Error404} from "../errors/components/Error404";
import {TokenVerify} from "./components/TokenVerify";
import {AuthLayout} from "./AuthLayout";

const AuthPage = () => (
    <Routes>
        <Route element={<AuthLayout />}>
            <Route index element={<Navigate to='login' replace={true} />} />
            <Route path='login' element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='verify-token' element={<TokenVerify />} />
            <Route path='new-password' element={<NewPassword />} />
            <Route path='two-factor' element={<TwoFactor />} />
            <Route path='*' element={<div className='d-flex flex-column flex-root'>
                    <div className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
                         style={{backgroundImage: `url('${toAbsoluteUrl('assets/media/illustrations/progress-hd.png')}')`}}>
                        <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
                            <div className='pt-lg-10 mb-10'>
                                <Error404 />
                                <div className='text-center'>
                                    <Link to='/' className='btn btn-lg btn-primary fw-bolder'>Go to homepage</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>} />
        </Route>
    </Routes>
);

export {AuthPage}
