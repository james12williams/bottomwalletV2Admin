import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {AxiosService} from "../../../servicies/axios-service";
import {useNavigate} from "react-router";
import {useAuth} from "..";

const initialValues = {
  login: '',
};

const forgotPasswordSchema = Yup.object().shape({
  login: Yup.string()
      .min(9, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Email or Phone Number is required'),
});

export function ForgotPassword() {
  const {setCodeSend, setCodeSendTo, setResetField} = useAuth();
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      setHasErrors(undefined);
      AxiosService.postRequest('auth/password/email', values)
          .then((resp:any)=>{
            AxiosService.notify('success', resp?.message);
            setTimeout(()=>{
              setHasErrors(false);
              setSubmitting(false);
              setLoading(false);

              setCodeSend(true);
              setCodeSendTo(resp.result);
              setResetField(values.login);
              navigate('/auth/verify-token', {replace:true});

            }, 200);
          }, (resp) => {
            AxiosService.notify('error', resp?.data?.message);
            setStatus(resp?.data?.message ??'The login detail is incorrect');
            setTimeout(()=>{
              setHasErrors(true);
              setLoading(false);
              setSubmitting(false);
            }, 200);
          });
    },
  });

  return (
      <>
        <form
            className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
            noValidate
            id='kt_login_password_reset_form'
            onSubmit={formik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='mb-3'>Forgot Password ?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-muted fw-bold fs-4'>Enter your email/phone number to reset your password.</div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
              <div className='mb-lg-15 alert alert-danger'>
                <div className='alert-text font-weight-bold'>
                  Sorry, looks like there are some errors detected, please try again.
                </div>
              </div>
          )}

          {hasErrors === false && (
              <div className='mb-10 bg-light-info p-8 rounded'>
                <div className='text-info'>Sent password reset. Please check your email/sms</div>
              </div>
          )}
          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <label className='form-label fw-bolder text-gray-900 fs-6'>Email / Phone Number</label>
            <input type='text'
                   placeholder='Enter your email / phone number'
                   autoComplete='off'
                   {...formik.getFieldProps('login')}
                   className={clsx(
                       'form-control form-control-lg form-control-solid',
                       {'is-invalid': formik.touched.login && formik.errors.login},
                       {
                         'is-valid': formik.touched.login && !formik.errors.login,
                       }
                   )}
            />
            {formik.touched.login && formik.errors.login && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.login}</span>
                  </div>
                </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
            <button
                type='submit'
                id='kt_password_reset_submit'
                className='btn btn-lg btn-primary fw-bolder me-4'
            >
              <span className='indicator-label'>Submit</span>
              {loading && (
                  <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2' />
              </span>
              )}
            </button>
            <Link to='/auth/login'>
              <button
                  type='button'
                  id='kt_login_password_reset_form_cancel_button'
                  className='btn btn-lg btn-light-primary fw-bolder'
                  disabled={formik.isSubmitting || !formik.isValid}
              >
                Cancel
              </button>
            </Link>{' '}
          </div>
          {/* end::Form group */}
        </form>
      </>
  )
}
