import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {DateRange, DayPicker} from "react-day-picker";
import {useSearchParams} from "react-router-dom";
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

type Props = {
    field:any,
    onChange?:any,
    touched?:any,
    error?:any,
    from?:any,
    to?:any,
    numberOfMonths?:number,
}

const DateRangeField = ({field,onChange, from, to, touched, error, numberOfMonths=2 }:Props) => {
    const [params] = useSearchParams();

    const defaultSelected: DateRange = {
        from: new Date(),
        to: new Date(),
    };

    const [range, setRange] = useState<DateRange | undefined>(
        params.get("date_from") && params.get("date_to")
            ? defaultSelected
            : undefined
    ) as any;

    useEffect(() => {
        if (range){
            if(document.getElementsByName(field.name)){
                document.getElementsByName(field.name).forEach(function (item) {
                    if (item.nodeName=='INPUT'){
                        (item as HTMLInputElement).value = JSON.stringify({from:format(range.from, 'yyyy-M-dd'),to:format(range.to, 'yyyy-M-dd')});
                    }
                })
            }
            if(document.getElementsByName(field.name+'_from')){
                document.getElementsByName(field.name+'_from').forEach(function (item) {
                    if (item.nodeName=='INPUT'){
                        (item as HTMLInputElement).value = format(range.from, 'yyyy-M-dd');
                    }
                })
            }
            if(document.getElementsByName(field.name+'_to')){
                document.getElementsByName(field.name+'_to').forEach(function (item) {
                    if (item.nodeName=='INPUT'){
                        (item as HTMLInputElement).value = format(range.to, 'yyyy-M-dd');
                    }
                })
            }
        }else{
            if(document.getElementsByName(field.name)){
                document.getElementsByName(field.name).forEach(function (item) {
                    if (item.nodeName=='INPUT'){
                        (item as HTMLInputElement).value = '';
                    }
                })
            }
            if(document.getElementsByName(field.name+'_from')){
                document.getElementsByName(field.name+'_from').forEach(function (item) {
                    if (item.nodeName=='INPUT'){
                        (item as HTMLInputElement).value = '';
                    }
                })
            }
            if(document.getElementsByName(field.name+'_to')){
                document.getElementsByName(field.name+'_to').forEach(function (item) {
                    if (item.nodeName=='INPUT'){
                        (item as HTMLInputElement).value = '';
                    }
                })
            }
        }
    }, [range]);

    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <div data-kt-daterangepicker="true" data-name={field.name} id={field.name} data-kt-daterangepicker-range="today" className="btn btn-light d-flex align-items-center px-4">
            <div className="text-gray-600 fw-bold">Loading date range...</div>
            <i className="ki-duotone ki-calendar-8 text-gray-500 lh-0 fs-2 ms-2 me-0">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
            </i>
        </div>

        {touched && error && (
            <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                    <span role='alert'>{error}</span>
                </div>
            </div>
        )}

        {/* begin::Hint */}
        {field.hint && <div className='form-text' dangerouslySetInnerHTML={{ __html: field.hint }} />}
        {/* end::Hint */}
    </div>
};

export {DateRangeField};