import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error?:any,
}

const TimeField = ({field, onChange, value, touched, error }:Props) => {
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
            <i className="ki-duotone ki-calendar-8 position-absolute ms-4 mb-1 fs-2">
                <span className="path1"></span>
                <span className="path2"></span>
                <span className="path3"></span>
                <span className="path4"></span>
                <span className="path5"></span>
                <span className="path6"></span>
            </i>
            <input type="date"
                   {...field.attributes}
                   className={clsx(
                       'form-control ps-12 mb-3 mb-lg-0 flatpickr-input',
                       {'is-invalid': touched && error},
                       {'is-valid': touched && !error}
                   )}
                   data-kt-flatpickr="true"
                   data-disable-calendar="true"
                   data-enable-time="true"
                   data-format="H:i"
                   placeholder="Pick a time"
                   name={field.name}
                   id={field.name}
                   defaultValue={field.value}
                   autoComplete='off'/>
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

export {TimeField};