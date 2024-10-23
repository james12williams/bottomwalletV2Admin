import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error?:any,
}

const Select2FromArrayField = ({field, onChange, value, touched, error }:Props) => {

    const getValue:any  = (key:any, value:any) =>{
        let val = field.options[key][value];
        if (field.options[key][value][value]){
            val = field.options[key][value][value];
        }
        return val.toString();
    };

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
            data-kt-user-table-filter={field.name}
            data-hide-search='true'
            name={field.name}
            required={field.is_required}
            placeholder={field.label}
            onChange={onChange}
            defaultValue={field.value}
        >
            {
                Object.entries(field.options).map(( key:any, value:any) => {
                    return (<option value={getValue(value, 'key')} key={field.name+'_'+getValue(value, 'key')}>
                        {getValue(value, 'value')}
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

export {Select2FromArrayField};