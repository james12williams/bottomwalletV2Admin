/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {StepperComponent} from '../../../_metronic/assets/ts/components'
import {getItems, notify, sendData} from "../../../layouts/core/QueryResponseProvider";
import {ListLoading} from "../../../app/modules/dynamic-module/dynamic-list/components/loading/ListLoading";
import clsx from "clsx";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import {usePaystackPayment} from "react-paystack";
import {usePageData} from "../../../_metronic/layout/core";
// import {useMonnifyPayment} from "react-monnify";
// import {MonnifyProps} from "react-monnify/dist/types";

type Props = {
    currentUserId?: string
}

const steps = [
    [
        {
            id: 1,
            name: 'Deposit Detail',
            description: 'Enter Deposit Detail',
        },
        {
            id: 2,
            name: 'Confirm',
        },
    ]
];

const Deposit: FC<Props> = ({currentUserId}) => {
    const stepperRef = useRef<HTMLDivElement | null>(null);
    const stepper = useRef<StepperComponent | null>(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [currency] = useState('₦');
    const {walletWithdrawId, setManageDeposit}  = usePageData();

    const [isLoading, setLoader] = useState(false);
    const [accountStep] = useState(steps[0]);
    const [withdrawal_methods, setWithdrawalMethods] = useState([]);
    const [finalNote, setFinalNote] = useState(null);
    const [invoice, setInvoice] = useState({}) as any;
    const [paymentData, setPaymentData] = useState({}) as any;
    const [value, setInputValue] = useState({});
    const [flutterwaveData, setFlutterwaveData] = useState<any | null>(null); // State to store the FlutterwaveDataa fetched from the API
    const [monnifyData, setMonnifyData] = useState<any|null>(null); // State to store the FlutterwaveDataa fetched from the API
    const [paystackData, setPaystackData] = useState<any | null>(null); // State to store the FlutterwaveDataa fetched from the API
    const handleFlutterPayment = useFlutterwave(flutterwaveData);

    let tempVal = value as any;

    const onChange = (e:any) =>{
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        setInvoice({});
    };

    const getWithdrawalAccounts = function (){
        setLoader(true);
        getItems('get-payment-methods').then((resp:any)=>{
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
        if (tempVal.payment_method_id) {
            setLoader(true);
            if (invoice.id){
                tempVal.invoice_id = invoice.id
            }
            sendData('wallet/prepare-credit', tempVal).then((resp: any) => {
                setLoader(false);
                switch (resp.result.payment_method.key) {
                    // case "monnify":
                    //     openMonnifyPayout(resp.result);
                    //     break;
                    case "flutterwave":
                        openFlutterwavePayout(resp.result);
                        break;
                    case "paystack":
                        openPaystackPayout(resp.result);
                        break;
                    default:
                        break;
                }
            }, (resp: any) => {
                setLoader(false);
                notify('error', resp.data?.message)
            });
        }else{
            notify('warning', 'Please select a payment method')
        }
    };

    //Flutterwave
    const openFlutterwavePayout = (data: any) => {
        try {
            setInvoice(data.invoice);
            setPaymentData(data);
            setFlutterwaveData({
                public_key: data.payment_method.value.public_key,
                tx_ref: data.payment_ref,
                amount: data.price,
                country: "NG",
                // bearer: resp.data.result.bearer,
                currency: "NGN",
                title: data.title,
                logo_url: "",
                description: data.description,
                payment_options: 'card,mobilemoney,ussd',
                metadata: {"metaname": "invoice_id", "metavalue": data.invoice.id},
                customizations: {
                    title: data.title,
                    description: data.description,
                    logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
                },
                customer: {
                    email: data.email,
                    phone_number: data.phone,
                    full_name: data.name,
                },
            } as any);
        } catch (e) {}
    };
    useEffect(() => {
        if (flutterwaveData) {
            handleFlutterPayment({
                callback: (response: any) => {
                    var payment_ref = paymentData.payment_ref;
                    var payload = {
                        ref: payment_ref,
                        payment_method_id: paymentData.payment_method.id,
                        payment_id: paymentData.payment.id,
                        invoice_id: paymentData.invoice.id,
                        callback_resp: response,
                    };

                    closePaymentModal();

                    verifyPayment(payload);
                    setFlutterwaveData(null);
                },
                onClose: () => {
                    var payment_ref = paymentData.payment_ref;
                    var payload = {
                        ref: payment_ref,
                        payment_method_id: paymentData.payment_method.id,
                        payment_id: paymentData.payment.id,
                        invoice_id: paymentData.invoice.id,
                    };

                    verifyPayment(payload);
                    setFlutterwaveData(null);
                },
            });
        }
    }, [flutterwaveData, paymentData, handleFlutterPayment]);
    //Flutterwave

    // //Monnify
    // const handleMonnifyPayment = useMonnifyPayment(monnifyData?monnifyData:{} as MonnifyProps);
    // const openMonnifyPayout = (data: any) => {
    //     try {
    //         setInvoice(data.invoice);
    //         setPaymentData(data);
    //         setMonnifyData({
    //             apiKey: data.payment_method.value.public_key,
    //             contractCode: data.payment_method.value.contract_code,
    //             reference: data.payment_ref,
    //             amount: data.price,
    //             country: "NG",
    //             // bearer: resp.data.result.bearer,
    //             currency: "NGN",
    //             title: data.title,
    //             logo_url: "",
    //             description: data.payment.description,
    //             payment_options: 'card,mobilemoney,ussd',
    //             metadata: {"metaname": "invoice_id", "metavalue": data.invoice.id},
    //             paymentDescription:data.description,
    //             customerFullName:data.name,
    //             customerEmail:data.email,
    //             customerMobileNumber:data.phone,
    //             // redirectUrl:null,
    //             // "data-custom-button":null,
    //         } as MonnifyProps);
    //     } catch (e) {}
    // };
    // useEffect(() => {
    //     if (monnifyData) {
    //         handleMonnifyPayment((response: any) => {
    //             var payment_ref = paymentData.payment_ref;
    //             var payload = {
    //                 ref: payment_ref,
    //                 payment_method_id: paymentData.payment_method.id,
    //                 payment_id: paymentData.payment.id,
    //                 invoice_id: paymentData.invoice.id,
    //                 callback_resp: response,
    //             };
    //
    //             verifyPayment(payload);
    //             setMonnifyData(null);
    //         }, (response:any)=>{
    //             var payment_ref = paymentData.payment_ref;
    //             var payload = {
    //                 ref: payment_ref,
    //                 payment_method_id: paymentData.payment_method.id,
    //                 payment_id: paymentData.payment.id,
    //                 invoice_id: paymentData.invoice.id,
    //                 callback_resp: response,
    //             };
    //
    //             verifyPayment(payload);
    //             setMonnifyData(null);
    //         });
    //     }
    // }, [monnifyData, paymentData]);
    // //Monnify

    //Paystack
    const openPaystackPayout = (data: any) =>{
        try {
            setInvoice(data.invoice);
            setPaymentData(data);
            setPaystackData({
                publicKey: data.payment_method.value.public_key,
                reference: data.payment_ref,
                tx_ref: data.payment_ref,
                amount: data.price,
                country: "NG",
                // bearer: resp.data.result.bearer,
                currency: "NGN",
                title: data.title,
                logo_url: "",
                email: data.email,
                description: data.description,
                payment_options: 'card,mobilemoney,ussd',
                metadata: {"metaname": "invoice_id", "metavalue": data.invoice.id},
                customizations: {
                    title: data.title,
                    description: data.description,
                    logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
                },
                customer: {
                    email: data.email,
                    phone_number: data.phone,
                    full_name: data.name,
                }
            } as any);
        } catch (e) {}
    };
    const initializePayment = usePaystackPayment(paystackData?paystackData:{});
    useEffect(() => {
        if (paystackData) {
            initializePayment((response?:any) => {
                    var payment_ref = paymentData.payment_ref;
                    var payload = {
                        ref: payment_ref,
                        payment_method_id: paymentData.payment_method.id,
                        payment_id: paymentData.payment.id,
                        invoice_id: paymentData.invoice.id,
                        callback_resp: response,
                    };
                    verifyPayment(payload);
                    setPaystackData(null);
                },
                (response?:any) => {
                    var payment_ref = paymentData.payment_ref;
                    var payload = {
                        ref: payment_ref,
                        payment_method_id: paymentData.payment_method.id,
                        payment_id: paymentData.payment.id,
                        invoice_id: paymentData.invoice.id,
                        callback_resp: response,
                    };
                    verifyPayment(payload);
                    setPaystackData(null);
                }
            );
        }
    }, [paystackData, paymentData]);
    //Paystack

    const verifyPayment = (payload: any) => {
        payload.wallet_id = walletWithdrawId.id;
        payload.wallet_type = walletWithdrawId.type;
        setLoader(true);
        sendData('wallet/confirm-credit', payload)
            .then((resp: any) => {
                setFinalNote(resp.data?.message);
                notify('success', resp.message);
                setInvoice({});
                setPaymentData({});
                stepper.current?.goNext();
                setLoader(false);
            }, (resp: any) => {
                setLoader(false);
                setFinalNote(resp.data?.message);
                setLoader(false);
                notify('error', resp.data?.message)
            });
    };

    ////////

    useEffect(()=>{
        getWithdrawalAccounts();
        if (walletWithdrawId.id) {
            setInputValue((prev) => ({
                ...prev,
                amount: 1000,
            }));
        }
    }, [walletWithdrawId]);

    useEffect(()=>{
        if (walletWithdrawId.id){
            setInputValue((prev) => ({
                ...prev,
                amount: 1000,
                wallet_id: walletWithdrawId.id,
                wallet_type: walletWithdrawId.type,
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
            setManageDeposit()
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
                            <h2>Wallet Deposit</h2>
                            <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={setManageDeposit}>
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
                                                    the form below to top your wallet instantly.</p>

                                                <div className="form-group col-md-12 mt-4">
                                                    <label className={clsx('form-label fs-6 fw-bold required')}>Amount to deposit for now (minimum: 2,000.00):</label>
                                                    <input type="number"
                                                           className={clsx('form-control form-control-solid mb-3 mb-lg-0')}
                                                           name='amount'
                                                           onChange={onChange}
                                                           defaultValue='1000'
                                                           autoComplete='off'/>
                                                </div>

                                                <div className="form-group col-md-12 mt-4">
                                                    <label className={clsx('form-label fs-6 fw-bold required')}>Select Payment Method:</label>
                                                    <select className={clsx('form-control form-control-solid mb-3 mb-lg-0',)}
                                                            name='payment_method_id'
                                                            required={true}
                                                            onChange={onChange}>
                                                        <option value="">Select Payment Method</option>
                                                        {withdrawal_methods.map((option: any) => {
                                                            return (<option key={'withdrawal_method_' + option.id} value={option.id}>
                                                                {option.name}
                                                            </option>)
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={currentStepIndex===2 ? 'current':''}  data-kt-stepper-element='content'>
                                            <div className='w-100 text-center'>
                                                <h1 className='fw-bolder text-dark mb-3'>Done!</h1>

                                                <div className='text-center px-4 py-15'>
                                                    <img src={toAbsoluteUrl('assets/media/illustrations/misc/upgrade.svg')}
                                                         alt='' className='mh-100px'/>
                                                </div>

                                                <div className='text-muted fw-bold fs-3'>
                                                    {finalNote}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='d-flex flex-stack pt-10'>
                                            <div className='me-2'>
                                                <button
                                                    onClick={prevStep}
                                                    disabled={isLoading}
                                                    type='button'
                                                    className='btn btn-lg btn-light-primary me-3'
                                                    data-kt-stepper-action='previous'>
                                                    <KTSVG
                                                        path='assets/media/icons/duotune/arrows/arr063.svg'
                                                        className='svg-icon-4 me-1'
                                                    />
                                                    Back
                                                </button>
                                            </div>

                                            <div>
                                                <button type='submit' disabled={isLoading} className='btn btn-lg btn-primary me-3'>
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

export {Deposit}
