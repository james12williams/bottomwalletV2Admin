import React, {useEffect, useState} from 'react'
import {Select2FromArrayField} from "../../dynamic-module/dynamic-list/components/fields/Select2FromArrayField";
import {useSearchParams} from "react-router-dom";
import {KTCard} from "../../../../_metronic/helpers";
import {useView} from "../ViewProvider";
import {DateRangeField} from "../../dynamic-module/dynamic-list/components/fields/DateRangeField";
import {TagField} from "../../dynamic-module/dynamic-list/components/fields/TagField";
import {AppSpinner} from "../../../../partials/content/AppSpinner";
import {ListLoading} from "../../dynamic-module/dynamic-list/components/loading/ListLoading";
import {TextField} from "../../dynamic-module/dynamic-list/components/fields/TextField";
import {DropzoneField} from "../../dynamic-module/dynamic-list/components/fields/DropzoneField";
import {SummernoteField} from "../../dynamic-module/dynamic-list/components/fields/SummernoteField";
import {QuillField} from "../../dynamic-module/dynamic-list/components/fields/QuillField.tsx";
import {Select2Field} from "../../dynamic-module/dynamic-list/components/fields/Select2Field.tsx";

const saveDefaultActionOptions = [
    {
        key: 'send',
        value: 'send',
        label: 'Send'
    },
    {
        key: 'schedule',
        value: 'schedule',
        label: 'Schedule send'
    },
    {
        key: 'save',
        value: 'save',
        label: 'Save &amp; archive'
    }
];

export function Compose() {
    const {data, isLoading, sendMail, errors, isSubmitting,
        inputValue, setInputValue, filtering, handleFilter} = useView();
    const [roles, setRoles] = useState([]);
    const [genders, setGenders] = useState([]);
    const [countries, setCountries] = useState([]);
    const [types, setTypes] = useState([]);
    const [touched, setInputTouched] = useState({});
    const [resetForm, setResetForm] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    let tempVal = inputValue as any;
    let tempErrors = errors as any;
    let tempTouched = touched as any;

    const onChange = (e:any) =>{
        if (e?.target){
            const {name, value} = e.target;
            setInputValue((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const onChange2 = (name:any, value:any) =>{
        setInputValue((prev:any) => ({
            ...prev, [name]: value,
        }));
    };

    useEffect(() => {
        if (data.roles) {
            setRoles(data.roles)
            setGenders(data.genders)
            setCountries(data.countries)
            setTypes(data.types)
        }
    }, [data]);

    useEffect(() => {
        if (searchParams.get('email')){
            tempVal.to.push(searchParams.get('email'))
            setInputValue(tempVal);
            searchParams.delete('email');
            setSearchParams(searchParams);
        }
    }, []);

    useEffect(() => {
        if (resetForm){
            setTimeout(()=>{
                setResetForm(false);
            },100)
        }
    }, [resetForm]);

    return (<KTCard>
        <div className="container-fluid mt-10 mb-10">
            <div className="row">

                <div className="col-md-5">
                    <div className="card-header align-items-center">
                        <div className="card-title">
                            <h2>Filter</h2>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <div className="row">
                            <form id="kt_inbox_compose_filter_form" onSubmit={handleFilter}>
                                <Select2Field field={{
                                    name: 'type',
                                    label: 'Type',
                                    value: 'user',
                                    options: types,
                                    wrapperAttributes:{
                                        className:'form-group col-md-12 mt-4'
                                    },
                                    toShow:{
                                        user:['role','gender','date'],
                                        subscriber:[],
                                    },
                                    toHide:{
                                        user:[],
                                        subscriber:['role','gender','date'],
                                    },
                                }}
                                  error={tempErrors.type?tempErrors.type[0]:""}
                                  value={tempVal.type}
                                  onChange={onChange}
                                  touched={tempTouched.type}  />

                                <Select2FromArrayField field={{
                                    name: 'country',
                                    label: 'Country',
                                    options: Object.keys(countries).map((key:any)=>{
                                        return {key:key, value: countries[key]};
                                    }),
                                    wrapperAttributes:{
                                        className:'form-group col-md-12 mt-4'
                                    }
                                }}
                                   error={tempErrors.country?tempErrors.country[0]:""}
                                   value={tempVal.country}
                                   onChange={onChange}
                                   touched={tempTouched.country} />
                                <Select2FromArrayField field={{
                                    name: 'role',
                                    label: 'Role',
                                    options: Object.keys(roles).map((key: any) => {
                                        return {key: key, value: roles[key]};
                                    }),
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                   error={tempErrors.role?tempErrors.role[0]:""}
                                   value={tempVal.role}
                                   onChange={onChange}
                                   touched={tempTouched.role}/>

                                <Select2FromArrayField field={{
                                    name: 'gender',
                                    label: 'Gender',
                                    options: Object.keys(genders).map((key: any) => {
                                        return {key: key, value: genders[key]};
                                    }),
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                   error={tempErrors.gender}
                                   value={tempVal.gender}
                                   onChange={onChange}
                                   touched={tempTouched.gender}/>

                                <DateRangeField field={{
                                    name: 'date',
                                    label: 'Date',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                    error={tempErrors.date}
                                    touched={tempTouched.date}/>

                                {/* begin::Action */}
                                <div className='text-center mt-4'>
                                    <button type='submit'
                                            id='kt_sign_in_submit'
                                            className='btn btn-lg btn-danger w-100 mb-5'>
                                        {!(isLoading || filtering) && <span className='indicator-label'>Apply Filter</span>}
                                        {(isLoading || filtering) && (
                                            <span className='indicator-progress' style={{display: 'block'}}>
                                              Please wait...
                                              <span className='spinner-border spinner-border-sm align-middle ms-2' />
                                            </span>
                                        )}
                                    </button>
                                </div>
                                {/* end::Action */}
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="card-header align-items-center">
                        <div className="card-title">
                            <h2>Compose Message</h2>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        {/*begin::Form*/}
                        <form id="kt_inbox_compose_form" onReset={()=>setResetForm(!resetForm)} onSubmit={sendMail}>
                            {/*begin::Body*/}
                            <div className="d-block">
                                {/*begin::To*/}
                                <TagField field={{
                                    name: 'to',
                                    label: 'To',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                          reset={resetForm}
                                          error={tempErrors.to?tempErrors.to[0]:""}
                                          currentValue={tempVal.to}
                                          onChange={onChange2}
                                          touched={tempTouched.to}/>
                                {/*end::To*/}


                                {/*begin::Cc*/}
                                <TagField field={{
                                    name: 'cc',
                                    label: 'Cc',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                          reset={resetForm}
                                          error={tempErrors.cc?tempErrors.cc[0]:""}
                                          currentValue={tempVal.cc}
                                          onChange={onChange2}
                                          touched={tempTouched.cc}/>
                                {/*end::Cc*/}

                                {/*begin::Bcc*/}
                                <TagField field={{
                                    name: 'bcc',
                                    label: 'Bcc',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                          reset={resetForm}
                                          error={tempErrors.bcc?tempErrors.bcc[0]:""}
                                          currentValue={tempVal.bcc}
                                          onChange={onChange2}
                                          touched={tempTouched.bcc}/>
                                {/*end::Bcc*/}

                                {/*begin::Subject*/}
                                <TextField field={{
                                    name: 'subject',
                                    label: 'Subject',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                           error={tempErrors.subject?tempErrors.subject[0]:""}
                                           onChange={onChange}
                                           touched={tempTouched.subject}/>
                                {/*end::Subject*/}

                                {/*begin::Message*/}
                                <QuillField  field={{
                                    name: 'message',
                                    label: 'Message',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                             error={tempErrors.message?tempErrors.message[0]:""}
                                             value={tempVal.message} />
                                {/*end::Message*/}

                                <DropzoneField   field={{
                                    name: 'attachments',
                                    label: 'Attachments',
                                    wrapperAttributes: {
                                        className: 'form-group col-md-12 mt-4'
                                    }
                                }}
                                                 onChange={()=>{}}
                                                 error={tempErrors.attachments?tempErrors.attachments[0]:""}
                                                 value={tempVal.attachments}/>
                            </div>
                            {/*end::Body*/}

                            {/*begin::Footer*/}
                            <div className="d-flex flex-stack flex-wrap gap-2 py-5 border-top">
                                {/*begin::Actions*/}
                                <div className="d-flex align-items-center me-3">
                                    <button type='reset' className='btn btn-block me-2 btn-danger'>Reset</button>
                                    {/*begin::Send*/}
                                    {!isSubmitting && !isLoading && <button type='submit' className='btn btn-block me-2 btn-primary'>Send</button>}

                                    {((isSubmitting || isLoading)) && (
                                        <button disabled={!isSubmitting && !isLoading} type='button' className='btn btn-primary btn-block'>
                                            <AppSpinner as="span" size="sm" role="status" aria-hidden="true"/>
                                            Loading...
                                        </button>
                                    )}
                                    {/*end::Send*/}
                                </div>
                                {/*end::Actions*/}

                                {/*begin::Toolbar*/}
                                <div className="d-flex align-items-center">
                                    {/*begin::Dismiss reply*/}
                                    <span className="btn btn-icon btn-sm btn-clean btn-active-light-primary" data-inbox="dismiss" data-toggle="tooltip" title="Dismiss reply">
                                            <span className="svg-icon svg-icon-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z" fill="currentColor" />
                                                    <path opacity="0.5" d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z" fill="currentColor" />
                                                    <path opacity="0.5" d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z" fill="currentColor" />
                                                </svg>
                                            </span>
                                        {/*end::Svg Icon*/}
                                        </span>
                                    {/*end::Dismiss reply*/}
                                </div>
                                {/*end::Toolbar*/}

                            </div>
                            {/*end::Footer*/}
                        </form>
                        {/*end::Form*/}
                        {(isSubmitting || isLoading) && <ListLoading />}
                    </div>
                </div>
            </div>
        </div>
    </KTCard>)
}
