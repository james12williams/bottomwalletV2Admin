import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange?:any,
    value?:any,
    touched?:any,
    error?:any,
}

const RangeField = ({field, onChange, value, touched, error }:Props) => {
    return <div {...field.wrapperAttributes} id={field.name+'_container'} data-kt-password-meter='true'>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <input name={field.name} type="hidden" value="50" min='0' max='100' data-control="uiSlider" data-slider={field.name+'_slider'} data-label={field.name+'_label'}/>
        {/*begin::Slider*/}
        <div className="d-flex flex-column text-center mb-5">
            <div className="d-flex align-items-start justify-content-center mb-7">
                <span className="fw-bold fs-3x" id={field.name+'_label'}>0</span>
                {field.unit&&<span className="fw-bold fs-4 mt-1 ms-2">{field.unit}</span>}
            </div>
            <div id={field.name+'_slider'} className="noUi-sm"></div>
        </div>
        {/*end::Slider*/}

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

export {RangeField};