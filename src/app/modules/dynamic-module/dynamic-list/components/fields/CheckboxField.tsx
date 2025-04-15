import React, {useState} from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const CheckboxField = ({field, onChange, value, touched, error }:Props) => {
    const [valueMain, setValue] = useState(field.value==1);

    const handleClick= ()=>{
        setValue(!valueMain);
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
        <div className="form-check form-check-solid form-switch form-check-custom fv-row">
            <input className="form-check-input w-45px h-30px"
                   {...field.attributes}
                   type="checkbox"
                   name={field.name}
                   onChange={onChange}
                   onClick={handleClick}
                   value={1}
                   defaultChecked={valueMain}
                   id={field.name}/>
            <label className="form-check-label" htmlFor={field.name}/>
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

export {CheckboxField};
