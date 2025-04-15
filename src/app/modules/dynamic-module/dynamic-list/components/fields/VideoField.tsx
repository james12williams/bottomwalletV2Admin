import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const VideoField = ({field, onChange, value, touched, error }:Props) => {
    return <div {...field.wrapperAttributes} id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <input type="file"
               {...field.attributes}
               className={clsx(
                   'form-control mb-3 mb-lg-0',
                   {'is-invalid': touched && error},
                   {'is-valid': touched && !error}
               )}
               name={field.name}
               id={field.name}
               onChange={onChange}
               autoComplete='off'/>

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

export {VideoField};