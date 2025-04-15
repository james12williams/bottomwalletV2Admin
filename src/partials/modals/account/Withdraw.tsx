/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {StepperComponent} from '../../../_metronic/assets/ts/components'
import {getItems, notify, sendData} from "../../../layouts/core/QueryResponseProvider";
import {ListLoading} from "../../../app/modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import clsx from "clsx";
import {usePageData} from "../../../_metronic/layout/core";

type Props = {
    currentUserId?: string
}

const steps = [
    [
        {
            id: 1,
            name: 'Withdrawal Detail',
            description: 'Enter Withdrawal Detail',
        },
        {
            id: 2,
            name: 'Confirm',
        },
    ]
];

const Withdraw: FC<Props> = ({currentUserId}) => {
    const stepperRef = useRef<HTMLDivElement | null>(null);
    const stepper = useRef<StepperComponent | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const {walletWithdrawId, setManageWithdrawal}  = usePageData();
    const [currency] = useState('₦');

    const [isLoading, setLoader] = useState(false);
    const [accountStep] = useState(steps[0]);
    const [withdrawal_methods, setWithdrawalMethods] = useState([]);
    const [value, setInputValue] = useState({});
    let tempVal = value as any;

    const onChange = (e:any) =>{
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const getWithdrawalAccounts = function (){
        setLoader(true);
        getItems('my-accounts/'+currentUserId).then((resp:any)=>{
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
        if (!tempVal.withdrawal_account_id) {
            notify('warning', 'Please select a withdrawal method')
        }
        if (!tempVal.amount || tempVal.amount < 1000) {
            notify('warning', 'Amount must be equal or grater than 1000')
        }
        else{
            setLoader(true);
            sendData('process-withdrawal', tempVal).then((resp: any) => {
                setLoader(false);
                notify('success', resp.message)
                stepper.current?.goNext();
            }, (resp: any) => {
                setLoader(false);
                notify('error', resp.data?.message)
            })
        }
    };

    const generateOTP = () => {
        setLoader(true);
        sendData('generate-withdrawal-otp', tempVal).then((resp: any) => {
            setLoader(false);
            notify('success', resp.message)
        }, (resp: any) => {
            setLoader(false);
            notify('error', resp.data?.message)
        })
    };

    useEffect(()=>{
        getWithdrawalAccounts();
        if (walletWithdrawId.id){
            setInputValue((prev) => ({
                ...prev,
                wallet_id: walletWithdrawId.id,
                wallet_type: walletWithdrawId.type,
                amount: 1000,
            }));
        }
    }, [walletWithdrawId]);

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
        if (stepper.current?.currentStepIndex !== stepper.current?.totalStepsNumber) {
            if (stepper.current?.currentStepIndex===1){
                getActiveParents();
            }
            else{
                stepper.current?.goNext()
            }
            if (stepper.current?.currentStepIndex){
                setTimeout(()=>{
                    setCurrentStepIndex(stepper?.current?.currentStepIndex? stepper.current.currentStepIndex:0);
                })
            }
        }
        else {
            stepper.current?.goto(1);
            setManageWithdrawal()
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
                            <h2>Withdraw to Account</h2>
                            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={setManageWithdrawal}>
                                <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                        </div>
                        <div className='modal-body py-lg-10 px-lg-10'>
                            <div ref={stepperRef} className='stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid' id='kt_modal_create_app_stepper'>
                                <div className='d-none justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px'>
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
                                        <div className={currentStepIndex<=1 ? 'current':''} data-kt-stepper-element='content'>
                                            <div className='w-100'>
                                                <p className="font-body font-bold text-xs whitespace-pre-wrap"
                                                   style={{marginTop:"0px", marginBottom: "0px", textAlign: "left", color: "rgb(66, 74, 87)"}}>
                                                    Available Wallet balance is: <b>{currency} {walletWithdrawId.current_balance}</b></p>
                                                <p className="font-body text-xs whitespace-pre-wrap"
                                                   style={{marginTop: "10px", marginBottom: "40px", textAlign: "left", color: "rgb(66, 74, 87)"}}>Use
                                                    the form below to withdraw from your wallet instantly.</p>

                                                <div className="btn d-flex py-6 px-4 "
                                                     onClick={generateOTP}
                                                   style={{backgroundColor: "rgb(232, 97, 2)", borderColor: "rgb(232, 97, 2)", marginBottom: "20px", marginTop: "10px", textAlign:'left'}}>
                                                    <div className=""
                                                         style={{color: "rgb(239, 244, 245)", marginRight: "0.5rem", width: "30px", height: "30px", alignSelf:"center"}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                             strokeWidth="2" strokeLinecap="round"
                                                             strokeLinejoin="round" className="feather feather-key"
                                                             style={{color: "rgb(239, 244, 245)", marginRight: "0.5rem"}}>
                                                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex flex-col mr-2 w-full"><p
                                                        className="font-display font-bold text-left whitespace-pre-wrap"
                                                        style={{color: "rgb(239, 244, 245)", fontWeight:'900'}}>2FA: Tap to Generate OTP!</p>
                                                        <p className="font-body text-xs text-left whitespace-pre-wrap"
                                                           style={{color: "rgb(239, 244, 245)"}}>For even better security,
                                                            2FA is now required for sensitive actions on your Wallet.
                                                            Please tap to generate OTP for this withdrawal then come
                                                            back to proceed</p></div>
                                                    <div className="flex flex-col flex-1 self-start" />
                                                </div>

                                                <div className="form-group col-md-12 mt-4">
                                                    <label className={clsx('form-label fs-6 fw-bold required')}>Select Destination:</label>
                                                    <select className={clsx('form-control form-control-solid mb-3 mb-lg-0',)}
                                                        name='withdrawal_account_id'
                                                        required={true}
                                                        onChange={onChange}>
                                                        <option value="">Select Destination</option>
                                                        {withdrawal_methods.map((option: any) => {
                                                            switch (option.withdraw_method_id) {
                                                                case 1:
                                                                    return (<option key={'withdrawal_method_' + option.id} value={option.id}>
                                                                        {option.credentials.account_number.value} {option.credentials.account_name.value} [{option.credentials.bank_name.value}]
                                                                    </option>);
                                                                case 2:
                                                                case 4:
                                                                    return (<option key={'withdrawal_method_' + option.id} value={option.id}>
                                                                        { option.credentials.client_id?.value ? option.credentials.client_id.value: '####'  } ({option.method_name})
                                                                    </option>);
                                                                case 3:
                                                                    return (<option key={'withdrawal_method_' + option.id} value={option.id}>
                                                                        { option.credentials.email?.value } ({option.method_name})
                                                                    </option>)
                                                                default:
                                                                    return <></>
                                                            }
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="form-group col-md-12 mt-4">
                                                    <label className={clsx('form-label fs-6 fw-bold required')}>Amount to withdraw for now (minimum: 2,000.00):</label>
                                                    <input type="number"
                                                           className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                                                           name='amount'
                                                           onChange={onChange}
                                                           defaultValue='1000'
                                                           autoComplete='off'/>
                                                </div>
                                                <div className="form-group col-md-12 mt-4">
                                                    <label className={clsx('form-label fs-6 fw-bold required')}>Please Enter Generated OTP:</label>
                                                    <input type="text"
                                                           className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                                                           name='otp_code'
                                                           onChange={onChange}
                                                           autoComplete='off'/>
                                                </div>
                                                <div className="form-group col-md-12 mt-4">
                                                    <label className={clsx('form-label fs-6 fw-bold required')}>For Security Reasons, Please Enter Your Password :</label>
                                                    <input type="password"
                                                           className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                                                           name='password'
                                                           onChange={onChange}
                                                           defaultValue={""}
                                                           autoComplete='off'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={currentStepIndex===2 ? 'current':''}  data-kt-stepper-element='content'>
                                            <div className='w-100 text-center'>
                                                <h1 className='fw-bolder text-dark mb-3'>Thank You!</h1>

                                                <div className='text-center px-4 py-15'>
                                                    <img src={toAbsoluteUrl('assets/media/illustrations/misc/upgrade.svg')}
                                                         alt='' className='mh-100px'/>
                                                </div>

                                                <div className='text-muted fw-bold fs-3'>
                                                    Payment Processed Successfully!!!
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
                                                    {currentStepIndex<=1 && 'Continue'}
                                                      {currentStepIndex===2 && 'Close'}
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

export {Withdraw}
