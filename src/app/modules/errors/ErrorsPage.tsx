/* eslint-disable jsx-a11y/anchor-is-valid */
import {Route, Link, Routes, Outlet, useNavigate} from 'react-router-dom'
import {Error500} from './components/Error500'
import {Error404} from './components/Error404'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import React from "react";
import {AxiosService} from "../../servicies/axios-service";
import {useApp} from "../../../layouts/core/QueryResponseProvider";


type Props = {
    showLogo?:boolean
    showFooter?:boolean
}

const ErrorsLayout = ({showLogo= true, showFooter=true}:Props) => {
    const {app} = useApp();
    return (
        <div className='d-flex flex-column flex-root'>
            <div
                className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
                style={{backgroundImage: `url('${toAbsoluteUrl('assets/media/illustrations/progress-hd.png')}')`}}
            >
                <div className='d-flex flex-column flex-column-fluid text-center p-10 py-lg-20'>
                    {showLogo && <Link to='/apps/dashboard' className='mb-10 pt-lg-20'>
                        <img alt='Logo' src={app.favicon} className='h-50px mb-5'/>
                    </Link>}
                    <div className='pt-lg-10 mb-10'>
                        <Outlet />
                        <div className='text-center'>
                            <Link to={AxiosService.isAuth? '/apps/dashboard':'/'} className='btn btn-lg btn-primary fw-bolder'>
                                Go to homepage
                            </Link>
                        </div>
                    </div>
                    <div
                        className='
                d-flex
                flex-row-auto
                bgi-no-repeat
                bgi-position-x-center
                bgi-size-contain
                bgi-position-y-bottom
                min-h-100px min-h-lg-350px
              '
                        style={{
                            backgroundImage: `url('${toAbsoluteUrl('assets/media/illustrations/sketchy-1/17.png')}')`,
                        }}
                    />
                </div>

                {showFooter && <div className='d-flex flex-center flex-column-auto p-10'>
                    <div className='d-flex align-items-center fw-bold fs-6'>
                        <a href='#' className='text-muted text-hover-primary px-2'>
                            About
                        </a>
                        <a href='#' className='text-muted text-hover-primary px-2'>
                            Contact
                        </a>
                        <a href='#' className='text-muted text-hover-primary px-2'>
                            Contact Us
                        </a>
                    </div>
                </div>}
            </div>
        </div>
    )
};
type BoxProps = {
    children: React.ReactNode;
};

const ErrorsLayout2 = (props: BoxProps) => {
    return (
        <div className='d-flex flex-column flex-root'>
            <div
                className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
                style={{backgroundImage: `url('${toAbsoluteUrl('assets/media/illustrations/progress-hd.png')}')`}}
            >
                <div className='d-flex flex-column flex-column-fluid text-center'>
                    <div className=' mb-10'>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
    )
};

const ErrorsPage = ({showLogo= true, showFooter=true}:Props) => (
    <Routes>
        <Route element={<ErrorsLayout showLogo={showLogo} showFooter={showFooter} />}>
            <Route path='500' element={<Error500 />} />
            <Route path='*' element={<Error404 />} />
            <Route index element={<Error404 />} />
        </Route>
    </Routes>
);

type Props2 = {
    errorCode?:string|number
    showButton?:boolean
}
const ErrorsHandler = ({errorCode='404', showButton=true}:Props2) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    switch(errorCode){
        case 401:
            return <ErrorsLayout2>
                <div className="card card-flush py-5">
                    <div className="card-body py-15 py-lg-20">

                        {/*begin::Illustration*/}
                        <div className="mb-3">
                            <img src={toAbsoluteUrl("assets/media/svg/illustrations/easy/5.svg")} className="mw-100 mh-300px theme-light-show" alt=""/>
                        </div>
                        {/*end::Illustration*/}

                        {/*begin::Title*/}
                        <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Unauthorized</h1>
                        {/*end::Title*/}

                        {/*begin::Text*/}
                        <div className='fw-bold fs-3 text-gray-400 mb-15'>
                            You don't have access to this page or to perform this operation!
                        </div>
                        {/*end::Text*/}

                        {/*begin::Link*/}
                        {showButton && <div className="mb-0">
                            <button type='button' onClick={goBack}  className="btn btn-sm btn-primary">Return Back</button>
                        </div>}
                        {/*end::Link*/}

                    </div>
                </div>
            </ErrorsLayout2>
        case 500:
            return <ErrorsLayout2><Error500 /></ErrorsLayout2>;
        case 404:
        default:
            return <ErrorsLayout2>
                <div className="card card-flush py-5">
                    <div className="card-body py-15 py-lg-20">

                        {/*begin::Illustration*/}
                        <div className="mb-3">
                            <img src={toAbsoluteUrl("assets/media/auth/404-error.png")} className="mw-100 mh-300px theme-light-show" alt=""/>
                        </div>
                        {/*end::Illustration*/}

                        {/*begin::Title*/}
                        <h1 className='fw-bolder fs-4x text-gray-700 mb-10'>Page Not Found</h1>
                        {/*end::Title*/}

                        {/*begin::Text*/}
                        <div className='fw-bold fs-3 text-gray-400 mb-15'>
                            The page you looked not found!
                        </div>
                        {/*end::Text*/}

                        {/*begin::Link*/}
                        {showButton && <div className="mb-0">
                            <button type='button' onClick={goBack}  className="btn btn-sm btn-primary">Return Back</button>
                        </div>}
                        {/*end::Link*/}

                    </div>
                </div>
            </ErrorsLayout2>;
    }
};

export {ErrorsPage, ErrorsHandler}
