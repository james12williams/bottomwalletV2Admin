import React, {useEffect, useState} from "react";
import clsx from "clsx";
import Select from 'react-select';

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched?:any,
    error?:any,
}

const Select2Field = ({field, onChange, value, touched, error }:Props) => {
    const [options, setOptions] = useState([]);
    const [defaultIndex, setDefaultIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        const option = Object.keys(field.options).map((key:any)=>{
            if (field.options[key].key){
                return {value:field.options[key].key, label: field.options[key].value};
            }else{
                return {value:key, label: field.options[key]};
            }
        });
        setOptions(option)
    }, [field.options]);

    useEffect(() => {
        let defaultInd = options.findIndex((x:any)=>x.value == field.value);
        setDefaultIndex(defaultInd)
        setTimeout(() => {
            setIsLoading(false)
        }, 10)
    }, [options]);

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}

        {!isLoading && <Select
            {...field.attributes}
            options={options}
            name={field.name}
            required={field.is_required}
            placeholder={field.label}
            onChange={onChange}
            isSearchable={true}
            defaultValue={options[defaultIndex]}
            aria-label={'Select'}
            isLoading={isLoading}
        />}

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

export {Select2Field};