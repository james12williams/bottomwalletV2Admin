import React from "react";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const RadioField = ({field, onChange, value, touched, error }:Props) => {
    return <div {...field.wrapperAttributes}>
        <div className="d-flex fv-row">
            {/* begin::Radio */}
            <div className="form-check form-check-custom form-check-solid">
                {/* begin::Input */}
                <input {...field.attributes}
                       className="form-check-input me-3"
                       name={field.name} type="radio"
                       id={field.name+'_'+field.key}
                       onChange={onChange}/>
                {/* end::Input */}

                {/* begin::Label */}
                <label className="form-check-label" htmlFor={field.name+'_'+field.key} >
                    <div className="fw-bold text-gray-800">{field.title}</div>
                    <div className="text-gray-600">Best for business owners and company administrators</div>
                </label>
                {/* end::Label */}

            </div>
            {/* end::Radio */}
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