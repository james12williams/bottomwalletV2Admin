
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {AxiosService} from "../../servicies/axios-service.tsx";
import {useAuth} from "./core/Auth.tsx";
import {useNavigate} from "react-router";
import {useApp} from "../../../layouts/core/QueryResponseProvider";
import {useThemeMode} from "../../../_metronic/partials";

const AuthLayout = () => {
  const {app} = useApp();
  const navigate = useNavigate();
  const {isAuth} = useAuth();
  const {mode} = useThemeMode();

  useEffect(() => {
    if (isAuth){
      return navigate('/apps/dashboard', {replace:true});
    }else{
      AxiosService.clearAuthUserData(false);
    }
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
      <div className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
           style={{
             backgroundImage: `url(${toAbsoluteUrl(app.background_image?app.background_image:'assets/media/illustrations/sketchy-1/14.png')})`,
             backgroundSize: 'cover',
           }}>
        {/* begin::Content */}
        <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
          {/* begin::Logo */}
          <Link to='/' className='mb-12'>
            <img alt='Logo' src={mode == 'dark'? app.dark_logo: app.light_logo} className='w-100' />
          </Link>
          {/* end::Logo */}
          {/* begin::Wrapper */}
          <div className={'w-lg-500px rounded shadow-sm p-10 p-lg-15 mx-auto '+ (mode=='dark'?'bg-dark text-white':'bg-white text-dark')}>
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Content */}
        {/* begin::Footer */}
        <div className='d-flex flex-center flex-column-auto p-10'>
          <div className='d-flex align-items-center fw-bold fs-6'>
            <p className='text-hover-primary px-2'>
              &copy; {(new Date().getFullYear())} @ {app.app_name}
            </p>
          </div>
        </div>
        {/* end::Footer */}
      </div>
  )
}

export {AuthLayout}
