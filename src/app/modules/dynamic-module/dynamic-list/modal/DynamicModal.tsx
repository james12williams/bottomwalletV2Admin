import React, {useEffect, useState} from 'react'
import {DynamicModalHeader} from './DynamicModalHeader'
import {ListLoading} from "../components/loading/ListLoading";
import {createItem, editItem, useQueryResponseXPanel} from "../core/QueryResponseProvider";
import {useListView} from "../core/ListViewProvider";
import {useQuery} from "react-query";
import {isNotEmpty} from "../../../../../_metronic/helpers";
import {DynamicForm} from "../components/forms/DynamicForm";
import {ErrorsHandler} from "../../../errors/ErrorsPage";

type Props = {
    queryName:any
}

const DynamicModal = ({queryName}:Props) => {
    const xPanel = useQueryResponseXPanel();
    const [hasError, setHasError] = useState('');
    const {itemIdForUpdate, setItemIdForUpdate} = useListView();
    const {isLoading, data} = useQuery(
        `${queryName}`,
        () => {
            if (isNotEmpty(itemIdForUpdate)){
                return editItem(xPanel.route+'/'+itemIdForUpdate)
            }else{
                return createItem(xPanel.route)
            }
        },
        {
            cacheTime: 0,
            enabled: true,
            onError: (err:any) => {
                setItemIdForUpdate(undefined)
            },
        }
    );

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
                        <DynamicModalHeader title={data?.title} />
                        {/* begin::Modal body */}
                        <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
                            {(isNotEmpty(data) && !hasError) && <DynamicForm isUserLoading={isLoading}  data={data}/>}
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

export {DynamicModal}
