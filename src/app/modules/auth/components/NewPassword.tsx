import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {AxiosService} from "../../../servicies/axios-service";
import {useNavigate} from "react-router";
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from "..";

const initialValues = {
  password: '',
  password_confirmation: '',
  acceptTerms: false,
};

const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
  password_confirmation: Yup.string()
      .required('Password confirmation is required')
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
      }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
});

export function NewPassword() {
  const [loading, setLoading] = useState(false);
  const {codeSend, codeSendTo, resetField, resetToken} = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: newPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      setSubmitting(true);
      AxiosService.postRequest('auth/password/reset', {
          login: resetField,
          token: resetToken,
          password: values.password,
          password_confirmation: values.password_confirmation,
          acceptTerms: values.acceptTerms,
      })
          .then((resp:any)=>{
            setLoading(false);
            setSubmitting(false);
            AxiosService.notify('success', resp?.message);
            setTimeout(()=>{
              setLoading(false);
            }, 200);
            navigate('/auth/login', {replace:true});
          }, (resp) => {
            AxiosService.notify('error', resp?.data?.message);
            setStatus(resp?.data?.message ??'The login detail is incorrect');
            setTimeout(()=>{
              setLoading(false);
              setSubmitting(false);
            }, 200);
          });
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, []);


  return (
    <>
      {/*begin::Form*/}
      <form className="form w-100" id="kt_new_password_form"
            onSubmit={formik.handleSubmit}
            noValidate>
        {/*begin::Heading*/}
        <div className="text-center mb-10">
          {/*begin::Title*/}
          <h1 className="text-dark fw-bolder mb-3">
            Setup New Password
          </h1>
          {/*end::Title*/}

          {/*begin::Link*/}
          <div className="text-gray-500 fw-semibold fs-6">
            Have you already reset the password ? <Link to="/auth/login" className="link-primary fw-bold">Sign in</Link>
          </div>
          {/*end::Link*/}
        </div>
        {/*begin::Heading*/}

        {/* begin::Form group Password */}
        <div className='mb-10 fv-row' data-kt-password-meter='true'>
          <div className='mb-1'>
            <label className='form-label fw-bolder text-dark fs-6'>Password</label>
            <div className='position-relative mb-3'>
              <input
                  type='password'
                  placeholder='Password'
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
            {/* begin::Meter */}
            <div className='d-flex align-items-center mb-3'
                data-kt-password-meter-control='highlight'>
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2' />
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2' />
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2' />
              <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px' />
            </div>
            {/* end::Meter */}
          </div>
          <div className='text-muted'>
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group Confirm password */}
        <div className='fv-row mb-5'>
          <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
          <input
              type='password'
              placeholder='Password confirmation'
              autoComplete='off'
              {...formik.getFieldProps('password_confirmation')}
              className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.password_confirmation && formik.errors.password_confirmation,
                  },
                  {
                    'is-valid': formik.touched.password_confirmation && !formik.errors.password_confirmation,
                  }
              )}
          />
          {formik.touched.password_confirmation && formik.errors.password_confirmation && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password_confirmation}</span>
                </div>
              </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
                className='form-check-input'
                type='checkbox'
                id='kt_login_toc_agree'
                {...formik.getFieldProps('acceptTerms')}
            />
            <label
                className='form-check-label fw-bold text-gray-700 fs-6'
                htmlFor='kt_login_toc_agree'
            >
              I Agree the{' '}
              <Link to='#' className='ms-1 link-primary'>
                terms and conditions
              </Link>
              .
            </label>
            {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.acceptTerms}</span>
                  </div>
                </div>
            )}
          </div>
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
              type='submit'
              id='kt_sign_up_submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
          >
            {!loading && <span className='indicator-label'>Submit</span>}
            {loading && (
                <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
                type='button'
                id='kt_login_signup_form_cancel_button'
                className='btn btn-lg btn-light-danger w-100 mb-5'
            >
              Cancel
            </button>
          </Link>
        </div>
        {/* end::Form group */}
      </form>
      {/*end::Form*/}
    </>
  )
}
