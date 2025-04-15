import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error?:any,
}

const MonthField = ({field, onChange, value, touched, error }:Props) => {
    const options = [
        {
            key:1,
            value:'January',
            label:'January',
        },
        {
            key:2,
            value:'February',
            label:'February',
        },
        {
            key:3,
            value:'March',
            label:'March',
        },
        {
            key:4,
            value:'April',
            label:'April',
        },
        {
            key:5,
            value:'May',
            label:'May',
        },
        {
            key:6,
            value:'June',
            label:'June',
        },
        {
            key:7,
            value:'July',
            label:'July',
        },
        {
            key:8,
            value:'August',
            label:'August',
        },
        {
            key:9,
            value:'September',
            label:'September',
        },
        {
            key:10,
            value:'October',
            label:'October',
        },
        {
            key:11,
            value:'November',
            label:'November',
        },
        {
            key:12,
            value:'December',
            label:'December',
        },
    ];
    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <div className="position-relative d-flex align-items-center">
            <select {...field.attributes}
                    className={clsx(
                        'form-select '+(field?.attributes?.className?field.attributes.className:'form-control-solid mb-3 mb-lg-0'),
                        {'is-invalid': touched && error},
                        {'is-valid': touched && !error}
                    )}
                    data-control="select2"
                    data-kt-select2='true'
                    data-placeholder='Select option'
                    data-allow-clear='false'
                    data-hide-search='false'
                    name={field.name}
                    id={field.name}
                    defaultValue={field.value}
                    required={field.is_required}
                    onChange={onChange}>
                {
                    options.map((option: any) => {
                        return <option value={option.key} key={field.name+'_'+option.key}>
                            {option.value}
                        </option>;
                    })
                }
            </select>
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

export {MonthField};