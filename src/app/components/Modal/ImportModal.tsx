import React, {useEffect, useState} from 'react'

import * as Yup from "yup";
import {KTSVG, toAbsoluteUrl} from "../../../_metronic/helpers";
import {MenuComponent} from "../../../_metronic/assets/ts/components";
import {getItems} from "../../../layouts/core/QueryResponseProvider.tsx";
import {ListLoading} from "../../modules/dynamic-module/dynamic-list/components/loading/ListLoading.tsx";
import {usePageData} from "../../../_metronic/layout/core";

type Props = {
    queryName:any
}
const ImportModal = ({queryName}:Props) => {
    const [errors, setErrors] = useState({}) as any;
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        format:'excel'
    });
    const {setImportFrom} = usePageData();

    useEffect(()=>{
        MenuComponent.reinitialization()
    },[isLoading]);

    useEffect(() => {
        document.body.classList.add('modal-open');
        return () => {
            document.body.classList.remove('modal-open')
        }
    }, []);

    const exportData = () => {
        setLoading(true);
        getItems('/import-sample', inputValue).then((resp:any)=>{
            setLoading(false);
        }, (resp:any)=>{
            setLoading(false);
        })
    };

    return (<>
            <div className='modal fade show d-block'
                 id='kt_modal_add_user'
                 role='dialog'
                 tabIndex={-1}
                 aria-modal='true'>
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-650px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className='modal-header'>
                            {/* begin::Modal title */}
                            <h2 className='fw-bolder text-capitalize'>

                            </h2>
                            {/* end::Modal title */}

                            {/* begin::Close */}
                            <div className='btn btn-icon btn-sm btn-active-icon-primary'
                                 data-kt-users-modal-action='close'
                                 onClick={() => setImportFrom('')}
                                 style={{cursor: 'pointer'}}>
                                <KTSVG path='assets/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
                            </div>
                            {/* end::Close */}
                        </div>
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>

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
        </>)
};

export {ImportModal}
