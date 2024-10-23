import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const SelectMultipleField = ({field, onChange, value, touched, error }:Props) => {
    field.options = Object.keys(field.options).map((key:any)=>{
        if (field.options[key].key){
            return field.options[key];
        }else{
            return {key:key, value: field.options[key]};
        }
    });

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        <select
            {...field.attributes}
            className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': touched && error},
                {'is-valid': touched && !error}
            )}
            data-kt-select2='true'
            data-placeholder='Select option'
            data-allow-clear='true'
            data-kt-user-table-filter='role'
            data-hide-search='true'
            multiple={true}
            name={field.name}
            required={field.is_required}
            placeholder={field.label}
            onChange={onChange}
        >
            {
                field.options.map((option: any) => {
                    return (<option value={option.key}
                                   key={field.name+'_'+option.key}>
                        {option.value}
                    </option>);
                })
            }
        </select>

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

export {SelectMultipleField};