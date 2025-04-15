import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {
    routerReplace,
    reorderItems,
} from './core/QueryResponseProvider'
import {KTCard} from '../../../../_metronic/helpers'
import React, {useEffect, useState} from "react";
import {MenuComponent} from "../../../../_metronic/assets/ts/components";
import {useQuery} from "react-query";
import {ListLoading} from "./components/loading/ListLoading";
import { useParams } from 'react-router';
import { Draggable } from "react-drag-reorder";
import {AxiosService} from "../../../servicies/axios-service";
import {useAuth} from "../../auth";
import {AppSpinner} from "../../../../partials/content/AppSpinner";

type Props = {
    apiPath: string,
    queryName: string,
};

type Props2 = {
    entry: any,
    index: number,
    getChangedPos?: ()=>void,
};

const Drag = ({entry, index, getChangedPos}:Props2) =>{
    console.log(entry);
    return (
        <div className="m-0">
            <input type="hidden" id={'item_'+index} name={'item_'+index} value={entry.key} />
            <div className="d-flex align-items-center collapsible py-3 toggle mb-0 collapsed"
                 data-bs-toggle="collapse" data-bs-target={"#kt_list"+index}
                 aria-expanded="false">
                {entry.children.length > 0 && <div className="btn btn-sm btn-icon mw-20px btn-active-color-primary me-5">
                    <span className="svg-icon toggle-on svg-icon-primary svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
                            <rect x="6.0104" y="10.9247" width="12" height="2" rx="1" fill="currentColor"/>
                        </svg>
                    </span>
                    <span className="svg-icon toggle-off svg-icon-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                             height="24" viewBox="0 0 24 24" fill="none">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="5" fill="currentColor"/>
                            <rect x="10.8891" y="17.8033" width="12" height="2" rx="1" transform="rotate(-90 10.8891 17.8033)" fill="currentColor"/>
                            <rect x="6.01041" y="10.9247" width="12" height="2" rx="1" fill="currentColor"/>
                        </svg>
                    </span>
                </div>}
                <h4 className="text-gray-700 fw-bolder cursor-pointer mb-0">{entry.label}</h4>
            </div>
            {entry.children.length > 0 && <div id={"kt_list"+index} className="fs-6 ms-1 collapse">
                <div className="separator separator-dashed"/>
                <div className="container-fluid">
                    {entry.children.length > 0 && <Draggable onPosChange={getChangedPos}>
                        {entry.children.map((entry:any, index:number) => {
                            return <Drag key={entry.uid} index={index} entry={entry} />;
                        })}
                    </Draggable>}
                </div>

            </div>}
            <div className="separator separator-dashed"/>
        </div>
    )
};

const ItemReorder = ({queryName, apiPath}:Props) => {
    const {setErrorCode} = useAuth();
    const [formFields, setFormFields] = useState([]);
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({}) as any;
    const {isLoading, data} = useQuery(
        `${queryName}`,
        () => {
            return reorderItems(apiPath)
        },
        {cacheTime: 0, enabled: true}
    );

    const processFormFields = (entries:any) =>{
        let formField = [] as any;
        formField = Object.keys(entries).map((key:any) => ({
            uid:entries[key].uid,
            key:entries[key].key,
            label:entries[key].label,
            children:processFormFields(entries[key].children),
        }));
        return formField;
    };

    useEffect(()=>{
        if (data){
            setErrorCode(data?.status)
        }else{
            setErrorCode('')
        }
        if (data?.entries){
            let formField = [] as any;
            formField = processFormFields(data.entries);
            setFormFields(formField);
        }
    }, [data]);


    useEffect(()=>{
        MenuComponent.reinitialization()
    }, []);

    const getChangedPos = (currentPos:any, newPos:any) => {
        let elem = document.getElementById('item_'+currentPos);
    };

    const handleSubmit = (e:any)=>{
        e.preventDefault();
        setSubmitting(true);
        setErrors({});

        let inputValue2: any = {
            tree:[]
        };
        let tree:any = {};
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].value && e.target.elements[i].id.startsWith('item_')) {
                tree[i] = {
                    item_id:e.target.elements[i].value,
                    left: i+1,
                    right:e.target.elements.length-(i+1),
                };
            }
        }
        inputValue2.tree = tree;
        AxiosService.postRequest(data.xPanel.route+'/reorder', inputValue2).then(
            function (resp:any) {
                AxiosService.notify('success', resp?.message);
                setSubmitting(false);
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

    return (
        <>
            <KTCard>

                <div className='card-header'>
                    {/* begin::Modal title */}
                    <h2 className='fw-bolder text-capitalize'
                        style={{lineHeight: '70px', width:"-webkit-fill-available"}} dangerouslySetInnerHTML={{__html:data?.title}} />
                    {/* end::Modal title */}
                </div>

                <div className="container-fluid mt-10 mb-10">
                    <form id='kt_modal_add_user_form' className='form' onSubmit={handleSubmit} noValidate>
                        <div className='d-flex flex-column me-n7 pe-7'>
                            {formFields.length > 0 && <Draggable onPosChange={getChangedPos}>
                                {formFields.map((entry:any, index:number) => {
                                    return <Drag key={entry.uid} index={index} entry={entry} />;
                                })}
                            </Draggable>}
                        </div>



                        {/* begin::Actions */}
                        <div className='text-center pt-15'>
                            {!isSubmitting && <button type='submit' className='btn btn-primary btn-block'>
                                Save
                            </button>}

                            {isSubmitting && (
                                <button disabled={!isSubmitting} type='button' className='btn btn-primary btn-block'>
                                    <AppSpinner as="span" size="sm" role="status" ariaHidden={true} />
                                    Loading...
                                </button>
                            )}
                        </div>
                        {/* end::Actions */}
                    </form>
                    {isLoading && <ListLoading />}
                </div>

            </KTCard>
        </>
    )
};

const DynamicReorder = ({queryName, apiPath}:Props) => {
    const params= useParams();
    apiPath = routerReplace(apiPath, params);
    return (<QueryRequestProvider>
        <ListViewProvider>
            <ItemReorder queryName={queryName} apiPath={apiPath} />
        </ListViewProvider>
    </QueryRequestProvider>)
};

export {DynamicReorder}
