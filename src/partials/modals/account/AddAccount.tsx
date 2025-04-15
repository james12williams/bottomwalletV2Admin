/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {StepperComponent} from '../../../_metronic/assets/ts/components'
import {getItems, notify, sendData} from "../../../layouts/core/QueryResponseProvider";
import {ListLoading} from "../../../app/modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import clsx from "clsx";
import {CustomFields} from "../../../app/modules/dynamic-module/dynamic-list/components/fields/CustomFields";
import {usePageData} from "../../../_metronic/layout/core";
import {AxiosService} from "../../../app/servicies/axios-service.tsx";

const steps = [
    [
        {
            id: 1,
            name: 'Withdrawal Method',
            description: 'Select Withdrawal Method',
        },
        {
            id: 2,
            name: 'Account Detail',
            description: "Enter Account Detail",
        },
        {
            id: 3,
            name: 'Confirm',
        },
    ]
];

const AddAccount: FC = () => {
    const stepperRef = useRef<HTMLDivElement | null>(null);
    const stepper = useRef<StepperComponent | null>(null);
    const {walletUserId, setManageWallet}  = usePageData();

    const [isLoading, setLoader] = useState(false);
    const [verified, setVerified] = useState(false);
    const [accountStep, setStep] = useState(steps[0]);
    const [withdrawal_methods, setWithdrawalMethods] = useState([]);
    const [formFields, setFields] = useState([]) as any;
    const [errors, setErrors] = useState([]) as any;
    const [value, setInputValue] = useState({});
    let tempVal = value as any;

    const onChange = (e:any) =>{
        if (e.target){
            const {name, value} = e.target;
            setInputValue((prev) => ({
                ...prev,
                [name]: value,
            }));
            setVerified(false);
        }
    };

    const onCheckboxChange = (e:any) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        setVerified(false);
    };

    const getWithdrawalMethods = function (){
        setLoader(true);
        getItems('get-withdrawal-methods').then((resp:any)=>{
            resp = Object.keys(resp).map((key:any)=>{
                return resp[key];
            });
            setWithdrawalMethods(resp);
            setLoader(false);
        },(resp: any) => {
            setLoader(false);
            notify('error', resp.data?.message)
        });
    };

    const getActiveParents = function (){
        setFields([]);
        if (tempVal.withdrawal_method) {
            let withdrawal_method = withdrawal_methods.find((x:any)=>x.key === tempVal.withdrawal_method) as any;
            if (withdrawal_method){
                let tempfields = Object.keys(withdrawal_method.fields).map((key: any) => {
                    return withdrawal_method.fields[key];
                });
                setFields(tempfields);
                stepper.current?.goNext()
            }
        }else{
            notify('warning', 'Please select a withdrawal method')
        }
    };

    const verifyAccount = (inputValue2:any) => {
        setLoader(true);
        sendData('verify-account', inputValue2).then((resp: any) => {
            setLoader(false);
            notify('success', resp.message);
            let result = Object.keys(resp.result).map((key: any) => {
                return {
                    key:key,
                    value: resp.result[key]
                };
            });
            result.forEach((item)=>{
                setInputValue((prev:any) => ({
                    ...prev,
                    [item.key]: item.value,
                }));

                let element = document.getElementById(item.key) as HTMLInputElement;
                if (element){
                    element.value = item.value;
                }
            });
            setVerified(true);
        }, (resp: any) => {
            setLoader(false);
            notify('error', resp.data?.message)
            if (resp.data.errors){
                setErrors(resp.data.errors);
            }
        })
    };

    const storeAccount = (inputValue2:any) => {
        setLoader(true);
        sendData('save-account', inputValue2).then((resp: any) => {
            setLoader(false);
            stepper.current?.goNext();
            notify('success', resp.message)
        }, (resp: any) => {
            setLoader(false);
            notify('error', resp.data?.message)
        })
    };

    useEffect(()=>{
        getWithdrawalMethods();
        if (walletUserId){
            setInputValue((prev) => ({
                ...prev,
                user_id: walletUserId,
            }));
        }
    }, [walletUserId]);

    const loadStepper = () => {
        stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    };

    const prevStep = () => {
        if (!stepper.current) {
            return
        }
        stepper.current?.goPrev();
    };

    const submitStep = (e:any) => {
        e.preventDefault();
        if (!stepper.current) {
            return
        }
        const inputValue2 = AxiosService.serialize(e.target, tempVal);
        if (stepper.current?.currentStepIndex !== stepper.current?.totalStepsNumber) {
            if (stepper.current?.currentStepIndex===1){
                getActiveParents();
            }
            else if (stepper.current?.currentStepIndex===2 && !verified){
                verifyAccount(inputValue2);
            }
            else if (stepper.current?.currentStepIndex===2 && verified){
                storeAccount(inputValue2);
            }
            else{
                stepper.current?.goNext()
            }
        } else {
            stepper.current?.goto(1);
            setManageWallet()
        }
    };

    useEffect(() => {
        if (!stepperRef.current) {
            return
        }

        loadStepper()
    }, [stepperRef]);

    return ( <>
            <div className='modal fade show d-block'
                 id='kt_modal_create_schedule'
                 role='dialog'
                 tabIndex={-1}
                 aria-modal='true'>
                <style dangerouslySetInnerHTML={{__html:'.stepper [data-kt-stepper-element=content].current, .stepper [data-kt-stepper-element=info].current {\n' +
                        '        display: flex;  min-height: 50vh;max-height: 60vh; overflow-x:scroll;}'}}>
                </style>
                <div className='modal-dialog modal-dialog-centered mw-900px'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h2>Add New Account</h2>
                            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={setManageWallet}>
                                <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                        </div>
                        <div className='modal-body py-lg-10 px-lg-10'>
                            <div ref={stepperRef} className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid' id='kt_modal_create_app_stepper'>
                                <div className='d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
                                    <div className='stepper-nav ps-lg-10'>
                                        {accountStep.map((step:any, index:any)=>{
                                            return <div key={index} className={clsx('stepper-item', {'current': index===0})} data-kt-stepper-element='nav'>
                                                <div className='stepper-line w-40px' />

                                                <div className='stepper-icon w-40px h-40px'>
                                                    <i className='stepper-check fas fa-check' />
                                                    <span className='stepper-number'>{step.id}</span>
                                                </div>

                                                <div className='stepper-label'>
                                                    <h3 className='stepper-title'>{step.name}</h3>
                                                    {step.description && <div className='stepper-desc'>{step.description}</div>}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                </div>

                                <div className='flex-row-fluid py-lg-5 px-lg-15'>
                                    <form onSubmit={submitStep} className='form' noValidate id='kt_modal_create_app_form'>

                                        <div className='current' data-kt-stepper-element='content'>
                                            <div className='w-100'>
                                                <div className='fv-row'>
                                                    <label className='d-flex align-items-center fs-5 fw-bold mb-4'>
                                                        <span className='required'>Select Withdrawal Method</span>
                                                        <i className='fas fa-exclamation-circle ms-2 fs-7'
                                                           data-bs-toggle='tooltip'
                                                           title='Specify your apps framework' />
                                                    </label>

                                                    {withdrawal_methods.map((option: any) => {
                                                        return (<label key={'withdrawal_method_'+option.key} className='d-flex flex-stack cursor-pointer mb-5'>
                                                            <span className='d-flex align-items-center me-2'>
                                                              <span className='symbol symbol-50px me-6'>
                                                                <span className='symbol-label bg-light-warning'>
                                                                  <i className='fab fa-html5 text-warning fs-2x' />
                                                                </span>
                                                              </span>

                                                              <span className='d-flex flex-column'>
                                                                <span className='fw-bolder fs-6'>{option.name}</span>
                                                                <span className='fs-7 text-muted'>{option.min_withdraw} - {option.max_withdraw}</span>
                                                                <span className='fs-7 text-muted'>{option.description}</span>
                                                              </span>
                                                            </span>
                                                            <span className='form-check form-check-custom form-check-solid'>
                                                              <input className='form-check-input' type='radio'
                                                                     name='withdrawal_method' value={option.key}
                                                                     onChange={onChange} />
                                                            </span>
                                                        </label>)
                                                    })}
                                                    {withdrawal_methods.length < 1 &&<>
                                                        <div className='text-center px-4 py-15'>
                                                            <img
                                                                src={toAbsoluteUrl('assets/media/illustrations/unitedpalms-1/5.png')}
                                                                alt=''
                                                                className='mh-100px'
                                                            />
                                                        </div>
                                                        <div className='text-muted fw-bold fs-3 text-center'>
                                                            No Active Withdrawal Method
                                                        </div>
                                                    </>}
                                                </div>
                                            </div>
                                        </div>

                                        <div data-kt-stepper-element='content'>
                                            <div className='w-100'>
                                                <div className="row">
                                                {formFields.map((formField: any, i:any) => {
                                                    return <CustomFields field={formField}
                                                                         key={formField.name + '_' + i}
                                                                         errors = {errors[formField.name]}/>
                                                })}
                                                </div>
                                            </div>
                                        </div>

                                        <div data-kt-stepper-element='content'>
                                            <div className='w-100 text-center'>
                                                <h1 className='fw-bolder text-dark mb-3'>Done!</h1>

                                                <div className='text-center px-4 py-15'>
                                                    <img src={toAbsoluteUrl('assets/media/illustrations/misc/upgrade.svg')}
                                                         alt='' className='mh-100px'/>
                                                </div>

                                                <div className='text-muted fw-bold fs-3'>
                                                    You Account Have been Added Successfully!!!
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-stack pt-10'>
                                            <div className='me-2'>
                                                <button
                                                    onClick={prevStep}
                                                    type='button'
                                                    className='btn btn-lg btn-light-primary me-3'
                                                    data-kt-stepper-action='previous'
                                                >
                                                    <KTSVG
                                                        path='assets/media/icons/duotune/arrows/arr063.svg'
                                                        className='svg-icon-4 me-1'
                                                    />
                                                    Back
                                                </button>
                                            </div>

                                            <div>
                                                <button type='submit' className='btn btn-lg btn-primary me-3'>
                                                  <span className='indicator-label'>
                                                    {stepper.current?.currentStepIndex !== stepper.current?.totalStepsNumber! - 1 && stepper.current?.currentStepIndex !== stepper.current?.totalStepsNumber && 'Continue'}
                                                      {stepper.current?.currentStepIndex === stepper.current?.totalStepsNumber! - 1 && 'Next'}
                                                      {stepper.current?.currentStepIndex === stepper.current?.totalStepsNumber! && 'Close'}
                                                      <KTSVG
                                                          path='assets/media/icons/duotune/arrows/arr064.svg'
                                                          className='svg-icon-3 ms-2 me-0'
                                                      />
                                                  </span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    {isLoading && <ListLoading/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show' />
            {/* end::Modal Backdrop */}
        </>
    )
};

export {AddAccount}
