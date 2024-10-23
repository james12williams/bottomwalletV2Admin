import React, {useEffect, useState} from 'react'
import {DynamicModalHeader} from './DynamicModalHeader'
import {ListLoading} from "../components/loading/ListLoading";
import {getItems} from "../core/QueryResponseProvider";
import {useListView} from "../core/ListViewProvider";
import {useQuery} from "react-query";
import {DynamicForm} from "../components/forms/DynamicForm";
import {ErrorsHandler} from "../../../errors/ErrorsPage";
import {AxiosService} from "../../../../servicies/axios-service";
import {isNotEmpty} from "../../../../../_metronic/helpers";

type Props = {
    queryName:any
}

const ActionModal = ({queryName}:Props) => {
    const [hasError, setHasError] = useState('');
    const {bookingIdToCancel, setBookingIdToCancel} = useListView();
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState([]) as any;
    const {isLoading, data} = useQuery(
        `${queryName}`,
        () => {
            return getItems(bookingIdToCancel)
        },
        {
            cacheTime: 0,
            enabled: true,
            onError: (err:any) => {
                setBookingIdToCancel(undefined)
            },
        }
    );

    const handleClose = () => {
        setBookingIdToCancel(undefined)
    };

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        const inputValue2 = AxiosService.serialize(e.target, data);
        setSubmitting(true);
        setErrors({});
        AxiosService.postRequest(bookingIdToCancel, inputValue2).then(
            function (resp:any) {
                AxiosService.notify('success', resp?.message);
                setSubmitting(false);
                setBookingIdToCancel(undefined)
            },
            function (resp:any) {
                if (resp?.data?.errors){
                    setErrors(resp?.data?.errors)
                }
                AxiosService.notify('error', resp?.data?.message);
                setSubmitting(false);
            }
        )
    };

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, []);

    useEffect(() => {
        if (data?.status){
            setHasError(data?.status)
        }else{
            setHasError('')
        }
    }, [data]);

    return (
        <>
            <div className='modal fade show d-block'
                 id='kt_modal_add_user'
                 role='dialog'
                 tabIndex={-1}
                 aria-modal='true'>
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <DynamicModalHeader title={data?.title}  handleClose={handleClose}/>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            {(isNotEmpty(data) && !hasError) && <DynamicForm isUserLoading={isLoading} submitting={isSubmitting}  data={data} handleSubmit={handleSubmit} handleClose={handleClose} errorList={errors}/>}
                            {hasError && <ErrorsHandler errorCode={hasError} showButton={false}/>}
                            {isLoading && <ListLoading />}
                        </div>
                        {/* end::Modal body */}
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show' />
            {/* end::Modal Backdrop */}
        </>
    )
};

export {ActionModal}
