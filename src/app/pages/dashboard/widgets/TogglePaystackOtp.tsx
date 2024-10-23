/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {AxiosService} from "../../../servicies/axios-service";
import {KTSVG} from "../../../../_metronic/helpers";
import clsx from "clsx";
import {ListLoading} from "../../../modules/dynamic-module/dynamic-list/components/loading/ListLoading";

const TogglePaystackOtp = () => {
    const [loading, setLoading] = useState(false);
    const [fieldValue, setFieldValue] = useState(false);
    const [showValidateOtp, setShowValidateOtp] = useState(false);
    const [value, setInputValue] = useState({});

    const onChange = (e:any) =>{
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getOtpStatus = function () {
        AxiosService.getRequest('get-paystack-otp-status', [])
            .then((resp:any)=>{

                setFieldValue(resp.result);

                setTimeout(()=>{
                    setLoading(false);
                }, 200);

            }, (resp) => {
                AxiosService.notify('error', resp?.data?.message);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            });
    };

    const disableOtp = function () {
        AxiosService.postRequest('disable-paystack-otp', [])
            .then((resp:any)=>{

                setShowValidateOtp(true);

                setTimeout(()=>{
                    setLoading(false);
                }, 200);

            }, (resp) => {
                AxiosService.notify('error', resp?.data?.message);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            });
    };

    const enableOtp = function () {
        AxiosService.postRequest('enable-paystack-otp', [])
            .then((resp:any)=>{
                setFieldValue(false);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            }, (resp) => {
                AxiosService.notify('error', resp?.data?.message);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            });
    };

    const finalizeOtpDisable = function (e:any) {
        e.preventDefault();
        AxiosService.postRequest('finalize-paystack-otp', value)
            .then((resp:any)=>{
                setFieldValue(true);
                setShowValidateOtp(false);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            }, (resp) => {
                AxiosService.notify('error', resp?.data?.message);
                setTimeout(()=>{
                    setLoading(false);
                }, 200);
            });
    };

    const onToggle = function () {
        if (fieldValue){
            enableOtp();
        }
        else{
            disableOtp();
        }
    };


    useEffect(() => {
        getOtpStatus();
    }, [fieldValue]);

    return (<>
            <div className="form-check form-check-solid form-switch form-check-custom fv-row">
                <input className="form-check-input w-45px h-30px"
                       type="checkbox"
                       checked={fieldValue}
                       disabled={loading}
                       onChange={onToggle}
                       id='paystack_otp'/>
                <label className="form-check-label" htmlFor='paystack_otp'>
                    <span className="form-check-label d-flex flex-column align-items-start">
                        <span className="fw-bold fs-5 mb-0">Disable Paystack Transfer OTP</span>
                        <span className="text-muted fs-6">This is used in the event that you want to be able to complete transfers programmatically without use of OTPs. No arguments required. You will get an OTP to complete the request.</span>
                    </span>
                </label>
                {loading && (<span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2' />
                </span>)}
            </div>

            {showValidateOtp && <>
                <div className='modal fade show d-block'
                     id='kt_modal_create_schedule'
                     role='dialog'
                     tabIndex={-1}
                     aria-modal='true'>
                    <style dangerouslySetInnerHTML={{__html:'.stepper [data-kt-stepper-element=content].current, .stepper [data-kt-stepper-element=info].current {\n' +
                            '        display: flex;  min-height: 10vh;overflow-x:scroll;}'}}>
                    </style>
                    <div className='modal-dialog modal-dialog-centered mw-900px'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h2>Validate OTP</h2>
                                <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={()=>setShowValidateOtp(false)}>
                                    <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                                </div>
                            </div>
                            <div className='modal-body py-lg-10 px-lg-10'>
                                <form onSubmit={finalizeOtpDisable} className='form' noValidate id='kt_modal_create_app_form'>
                                    <div className='w-100'>
                                        <div className="form-group col-md-12 mt-4">
                                            <label className={clsx('form-label fs-6 fw-bold required')}>Finalize the request to disable OTP on your transfers.:</label>
                                            <input type="number"
                                                   className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                                                   name='otp'
                                                   onChange={onChange}
                                                   placeholder='Enter OTP sent to business phone/email to verify disabling OTP requirement'
                                                   autoComplete='off'/>
                                        </div>
                                    </div>

                                    <div className='d-flex flex-stack pt-10 justify-content-center'>
                                        <button type='submit' disabled={loading} className='btn btn-lg btn-primary me-3'>
                                          <span className='indicator-label'>
                                              Continue
                                              <KTSVG
                                                  path='assets/media/icons/duotune/arrows/arr064.svg'
                                                  className='svg-icon-3 ms-2 me-0'
                                              />
                                          </span>
                                        </button>
                                    </div>
                                </form>
                                {loading && <ListLoading/>}
                            </div>
                        </div>
                    </div>
                </div>
                {/* begin::Modal Backdrop */}
                <div className='modal-backdrop fade show' />
                {/* end::Modal Backdrop */}
            </>}
        </>
    )
};

export {TogglePaystackOtp}
