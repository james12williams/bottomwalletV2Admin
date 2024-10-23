import React, {useEffect, useState} from "react";
import clsx from "clsx";
import {DateRange, DayPicker} from "react-day-picker";
import {useSearchParams} from "react-router-dom";
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

type Props = {
    field:any,
    touched:any,
    error:any,
    from?:any,
    to?:any,
    numberOfMonths?:number,
}

const DateRangeField = ({field, from, to, touched, error, numberOfMonths=2 }:Props) => {
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

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        <input type="hidden"  name={field.name} id={field.name}/>
        <input type="hidden"  name={field.name+'_from'} id={field.name+'_from'}/>
        <input type="hidden"  name={field.name+'_to'} id={field.name+'_to'}/>

        <DayPicker onSelect={setRange}
            numberOfMonths={numberOfMonths}
            mode="range"
            selected={range}
            {...field.attributes}
        />

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