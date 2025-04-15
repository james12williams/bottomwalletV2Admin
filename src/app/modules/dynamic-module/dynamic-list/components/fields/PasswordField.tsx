import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error?:any,
}

const PasswordField = ({field, onChange, value, touched, error }:Props) => {
    return <div {...field.wrapperAttributes} id={field.name+'_container'} data-kt-password-meter='true'>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <div className="position-relative mb-3">
            <input type="password"
                   {...field.attributes}
                   className={clsx(
                       'form-control mb-3 mb-lg-0',
                       {'is-invalid': touched && error},
                       {'is-valid': touched && !error}
                   )}
                   name={field.name}
                   onChange={onChange}
                   autoComplete='off'/>
            <span className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                  data-kt-password-meter-control="visibility">
                <i className="ki-outline ki-eye-slash fs-2" />
                <i className="ki-outline ki-eye fs-2 d-none" />
            </span>
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

export {PasswordField};