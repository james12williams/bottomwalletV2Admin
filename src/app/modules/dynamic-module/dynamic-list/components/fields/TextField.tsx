import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    touched:any,
    error:any,
}

const TextField = ({field, onChange, touched, error }:Props) => {
    const inputRef = React.useRef<HTMLInputElement|null>(null);

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        <input type="text"
               {...field.attributes}
               className={clsx(
                   'form-control form-control-solid mb-3 mb-lg-0',
                   {'is-invalid': touched && error},
                   {'is-valid': touched && !error}
               )}
               name={field.name}
               ref={inputRef}
               defaultValue={field.value}
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

export {TextField};