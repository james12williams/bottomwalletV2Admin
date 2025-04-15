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
        if (field.options[key][value] && field.options[key][value][value]){
            val = field.options[key][value][value];
        }
        return val?.toString();
    };

    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <select
            {...field.attributes}
            className={clsx(
                'form-select '+(field?.attributes?.className?field.attributes.className:'mb-3 mb-lg-0'),
                {'is-invalid': touched && error},
                {'is-valid': touched && !error}
            )}
            data-kt-select2='true'
            data-placeholder='Select option'
            data-allow-clear='false'
            data-hide-search='false'
            name={field.name}
            required={field.is_required}
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