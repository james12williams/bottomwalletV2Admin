import React, {useEffect, useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {AxiosService} from "../../../servicies/axios-service";
import {useNavigate} from "react-router";
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'

const initialValues = {
  code_1: '',
  code_2: '',
  code_3: '',
  code_4: '',
  code_5: '',
  code_6: '',
};

const newPasswordSchema = Yup.object().shape({
  code_1: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(1, 'Maximum 1 symbols')
      .required('All inputs are required'),
  code_2: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(1, 'Maximum 1 symbols')
      .required('All inputs are required'),
  code_3: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(1, 'Maximum 1 symbols')
      .required('All inputs are required'),
  code_4: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(1, 'Maximum 1 symbols')
      .required('All inputs are required'),
  code_5: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(1, 'Maximum 1 symbols')
      .required('All inputs are required'),
  code_6: Yup.string()
      .min(1, 'Minimum 1 symbols')
      .max(1, 'Maximum 1 symbols')
      .required('All inputs are required'),
});

export function TwoFactor() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: newPasswordSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      AxiosService.postRequest('auth/login', values)
          .then((resp:any)=>{
            setLoading(false);
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

  const handleType = () => {
    let form = document.querySelector('#kt_sing_in_two_factor_form');
    if (form) {
      let input1 = form.querySelector("[name=code_1]") as HTMLInputElement;
      let input2 = form.querySelector("[name=code_2]") as HTMLInputElement;
      let input3 = form.querySelector("[name=code_3]") as HTMLInputElement;
      let input4 = form.querySelector("[name=code_4]") as HTMLInputElement;
      let input5 = form.querySelector("[name=code_5]") as HTMLInputElement;
      let input6 = form.querySelector("[name=code_6]") as HTMLInputElement;

      input1.focus();
      input1.addEventListener("keyup", function (e) {
        if (this.value.length === 1) {
          input2.focus();
        }
      });

      input2.addEventListener("keyup", function () {
        if (this.value.length === 1) {
          input3.focus();
        }
      });

      input3.addEventListener("keyup", function () {
        if (this.value.length === 1) {
          input4.focus();
        }
      });

      input4.addEventListener("keyup", function () {
        if (this.value.length === 1) {
          input5.focus();
        }
      });

      input5.addEventListener("keyup", function () {
        if (this.value.length === 1) {
          input6.focus();
        }
      });

      input6.addEventListener("keyup", function () {
        if (this.value.length === 1) {
          input6.blur();
        }
      });
    }
  };

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);
  useEffect(() => {
    handleType();
  }, []);

  return (
    <>
      {/*begin::Form*/}
      <form className="form w-100 mb-13" id="kt_sing_in_two_factor_form"
            noValidate
            onSubmit={formik.handleSubmit}>
        {/*begin::Icon*/}
        <div className="text-center mb-10">
          <img alt="Logo" className="mh-125px"
               src="https://preview.keenthemes.com/metronic8/demo6/assets/media/svg/misc/smartphone-2.svg" />
        </div>
        {/*end::Icon*/}

        {/*begin::Heading*/}
        <div className="text-center mb-10">
          {/*begin::Title*/}
          <h1 className="mb-3">
            Two-Factor Verification
          </h1>
          {/*end::Title*/}

          {/*begin::Sub-title*/}
          <div className="text-muted fw-semibold fs-5 mb-5">Enter the verification code we sent to
          </div>
          {/*end::Sub-title*/}

          {/*begin::Mobile no*/}
          <div className="fw-bold fs-3">******7859</div>
          {/*end::Mobile no*/}
        </div>
        {/*end::Heading*/}

        {/*begin::Section*/}
        <div className="mb-10">
          {/*begin::Label*/}
          <div className="fw-bold text-start fs-6 mb-1 ms-1">Type your 6 digit security code
          </div>
          {/*end::Label*/}

          {/*begin::Input group*/}
          <div className="d-flex flex-wrap flex-stack">
            <input type="text" data-inputmask="'mask': '9', 'placeholder': '#'"
                   className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                   {...formik.getFieldProps('code_1')}/>
            <input type="text" data-inputmask="'mask': '9', 'placeholder': '#'"
                   className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                   {...formik.getFieldProps('code_2')} />
            <input type="text" data-inputmask="'mask': '9', 'placeholder': '#'"
                   className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                   {...formik.getFieldProps('code_3')} />
            <input type="text" data-inputmask="'mask': '9', 'placeholder': '#'"
                   className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                   {...formik.getFieldProps('code_4')} />
            <input type="text" data-inputmask="'mask': '9', 'placeholder': '#'"
                   className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                   {...formik.getFieldProps('code_5')} />
            <input type="text" data-inputmask="'mask': '9', 'placeholder': '#'"
                   className="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                   {...formik.getFieldProps('code_6')} />
          </div>
          {/*begin::Input group*/}
        </div>
        {/*end::Section*/}

        {/*begin::Submit*/}
        <div className="d-flex flex-center">
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
        {/*end::Submit*/}
      </form>
      {/*end::Form*/}

      {/*begin::Notice*/}
      <div className="text-center fw-semibold fs-5">
        <span className="text-muted me-1">Didn’t get the code ?</span>

        <a href="#" className="link-primary fs-5 me-1">Resend</a>

        <span className="text-muted me-1">or</span>

        <a href="#" className="link-primary fs-5">Call Us</a>
      </div>
      {/*end::Notice*/}
    </>
  )
}
