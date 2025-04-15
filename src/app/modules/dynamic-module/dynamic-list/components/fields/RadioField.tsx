import React, {useEffect, useState} from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error?:any,
}

const RadioField = ({field, onChange, value, touched, error }:Props) => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        setOptions(field.options)
    }, [field.options]);
    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9" data-kt-buttons="true" data-kt-buttons-target="[data-kt-button='true']">
            {options.map((option: any, i:any) => {
                return <div className='col' key={i}>
                    {/*begin::Option*/}
                    <label className="btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6" data-kt-button="true">
                        {/*begin::Radio*/}
                        <span className="form-check form-check-custom form-check-solid form-check-sm align-items-center mt-1">
                          <input id={field.name+'_'+option.key} className="form-check-input" type="radio" name={field.name} value={option.key} onChange={onChange} />
                        </span>
                        {/*end::Radio*/}
                        {/*begin::Info*/}
                        <span className="ms-5">
                          <span className="fs-4 fw-bold text-gray-800 d-block">{option.label}</span>
                            {option.tips && <span className="text-gray-600">{option.tips}</span>}
                        </span>
                        {/*end::Info*/}
                    </label>
                    {/*end::Option*/}
                </div>
            })}
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

export {RadioField};