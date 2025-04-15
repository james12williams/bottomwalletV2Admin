/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {useAuth} from '..'
import {AxiosService} from "../../../servicies/axios-service";
import {useNavigate} from "react-router";
import {PasswordMeterComponent} from "../../../../_metronic/assets/ts/components";
import {useApp} from "../../../../layouts/core/QueryResponseProvider";

const loginSchema = Yup.object().shape({
  login: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Username/Email is required'),
  password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
});

const initialValues = {
  login: '',
  password: '',
  remember: false,
};

export function Login() {
  const {app} = useApp();
  const [loading, setLoading] = useState(false);
  const {setCurrentUser, requestUser, setAuth} = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      AxiosService.postRequest('auth/login', values)
          .then((resp:any)=>{
            AxiosService.notify('success', resp?.message);
            if(AxiosService.setAuthUserData(resp)){
              setCurrentUser(resp.result);
              setTimeout(()=>{
                setAuth(true);
                setLoading(false);
                navigate('/apps/dashboard', {replace:true});
                requestUser();
              }, 200);
            }
          }, (resp) => {
            AxiosService.notify('error', resp?.data?.message);
            setStatus(resp?.data?.message ??'The login detail is incorrect');
            setTimeout(()=>{
              setLoading(false);
            }, 200);
          });
    },
  });

  useEffect(() => {
    // PasswordMeterComponent.bootstrap()
    window.KTComponents.init()
    window.KTWidgets.init()
  }, []);

  return (
      <form
          className='form w-100'
          onSubmit={formik.handleSubmit}
          noValidate
          id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-10'>
          <h1 className='mb-3 text-capitalize'>Sign In to {app.app_name?.toLowerCase()}</h1>
          {/*<div className='text-gray-400 fw-bold fs-4'>*/}
          {/*  New Here?{' '}*/}
          {/*  <Link to='/auth/registration' className='link-primary fw-bolder'>*/}
          {/*    Create an Account*/}
          {/*  </Link>*/}
          {/*</div>*/}
        </div>
        {/* begin::Heading */}

        {formik.status && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>{formik.status}</div>
            </div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fs-6 fw-bolder'>Username/Email</label>
          <input
              placeholder='Username/Email'
              {...formik.getFieldProps('login')}
              className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {'is-invalid': formik.touched.login && formik.errors.login},
                  {
                    'is-valid': formik.touched.login && !formik.errors.login,
                  }
              )}
              type='text'
              name='login'
              autoComplete='off'
          />
          {formik.touched.login && formik.errors.login && (
              <div className='fv-plugins-message-container'>
                <span role='alert'>{formik.errors.login}</span>
              </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='mb-10 fv-row' data-kt-password-meter='true'>
          <div className='d-flex justify-content-between mt-n5'>
            <div className='d-flex flex-stack mb-2'>
              {/* begin::Label */}
              <label className='form-label fw-bolder fs-6 mb-0'>Password</label>
              {/* end::Label */}
              {/* begin::Link */}
              <Link to='/auth/forgot-password'
                    className='link-primary fs-6 fw-bolder'
                    style={{marginLeft: '5px'}}>
                Forgot Password ?
              </Link>
              {/* end::Link */}
            </div>
          </div>
          <div className='position-relative mb-3'>
            <input type='password' placeholder='Password'
                   autoComplete='off'
                   {...formik.getFieldProps('password')}
                   className={clsx(
                       'form-control form-control-lg form-control-solid',
                       {
                         'is-invalid': formik.touched.password && formik.errors.password,
                       },
                       {
                         'is-valid': formik.touched.password && !formik.errors.password,
                       }
                   )}
            />
            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                  data-kt-password-meter-control="visibility">
                <i className="ki-outline ki-eye-slash fs-2" />
                <i className="ki-outline ki-eye fs-2 d-none" />
            </span>
            {formik.touched.password && formik.errors.password && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.password}</span>
                  </div>
                </div>
            )}
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
                className='form-check-input'
                type='checkbox'
                id='kt_remember_me'
                checked={formik.values.remember}
                {...formik.getFieldProps('remember')}
            />
            <label
                className='form-check-label fw-bold text-gray-700 fs-6'
                htmlFor='kt_remember_me'>
              Remember me
            </label>
            {formik.touched.remember && formik.errors.remember && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.remember}</span>
                  </div>
                </div>
            )}
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Action */}
        <div className='text-center'>
          <button type='submit'
                  id='kt_sign_in_submit'
                  className='btn btn-lg btn-primary w-100 mb-5'
                  disabled={formik.isSubmitting || !formik.isValid}>
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
            )}
          </button>
        </div>
        {/* end::Action */}
      </form>
  )
}
