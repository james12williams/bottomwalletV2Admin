import React, {useState} from "react";
import clsx from "clsx";
import {Sketch} from "@uiw/react-color";
import {MyTooltip} from "../buttons/MyTooltip";

type Props = {
    field:any,
    onChange:any,
    touched:any,
    error:any,
}

const ColorField = ({field, onChange, touched, error }:Props) => {
    const [hex, setHex] = useState(field.value ? field.value: "#ff0000");
    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend" style={{backgroundColor:hex, borderColor:hex}}>
                <span className="input-group-text" id="inputGroup-sizing-sm" style={{backgroundColor:hex, borderColor:hex}}>&nbsp;</span>
            </div>
            <MyTooltip content={<div><Sketch
                color={hex}
                onChange={(color) => {
                    setHex(color.hex);
                }}
            /></div>} trigger={'click'} placement={'bottom'} >
            <input type="text"
               {...field.attributes}
               className={clsx(
                   'form-control form-control-solid mb-3 mb-lg-0',
                   {'is-invalid': touched && error},
                   {'is-valid': touched && !error}
               )}
               name={field.name}
               value={hex}
               onChange={onChange}
               readOnly={true}
               autoComplete='off'/>
        </MyTooltip>
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

export {ColorField};