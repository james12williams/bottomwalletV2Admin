import React, {useEffect, useState} from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const EnumField = ({field, onChange, value, touched, error }:Props) => {
    const [options, setOptions] = useState([]);
    useEffect(()=>{
        field.options = field.options.length>0 ? Object.keys(field.options).map((key:any)=>{
            if (field.options[key].key){
                return field.options[key];
            }else{
                return {key:key, value: field.options[key]};
            }
        }): [];
        setOptions(field.options);
    }, [field]);

    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}
        {options.length>0 && (<select {...field.attributes}
            className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': touched && error},
                {'is-valid': touched && !error}
            )}
            data-kt-select2='true'
            data-placeholder={'Select '+field.label}
            data-allow-clear='true'
            data-kt-user-table-filter={field.name}
            data-hide-search='true'
            name={field.name}
            required={field.is_required}
            placeholder={field.label}
            defaultValue={field.value}
            onChange={onChange}>
            {
                options.map((option: any) => {
                    return (<option value={option.key}
                                   key={field.name+'_'+option.key}>
                                {option.value}
                            </option>);
                })
            }
        </select>)}

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

export {EnumField};