import React, {useState} from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const ChecklistDependencyField = ({field, onChange, value, touched, error }:Props) => {
    let defaultVals:any = [];

    field.subfields = Object.keys(field.subfields).map((key:any)=>{
        return field.subfields[key];
    });

    field.subfields.forEach((subfield:any, index:any)=>{
        if (field.values){
            defaultVals[subfield.name] = field.values[index]??[];
        }else{
            defaultVals[subfield.name] = [];
        }

        subfield.options = Object.keys(subfield.options).map((key:any)=>{
            return subfield.options[key];
        });
    });

    const [valueMain, setValue] = useState(defaultVals);

    const handleClick = (key:any, val:any) => {
        if (!valueMain[key]){
            valueMain[key] = [];
        }
        let index = valueMain[key].findIndex((x:any)=> x==val);
        if (index>-1){
            valueMain[key].splice(index, 1)
        }else{
            valueMain[key].push(val)
        }
        setValue(valueMain);
    };

    const isChecked = (key:any, val:any) => {
        if (!valueMain[key]){
            valueMain[key] = [];
        }
        let index = valueMain[key].findIndex((x:any)=> x==val);
        return index > -1;
    };


    return <div {...field.wrapperAttributes}>
        {field.label && <label className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>{field.label}:</label>}

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

        {field.subfields.map((subfield: any) => {
            return (<div key={subfield.name}>
                {/* begin::Label */}
                {subfield.label && <label className={clsx('fw-semibold fs-6 mb-5', {'required': subfield.is_required})}>{subfield.label}:</label>}
                {/* end::Label */}

                {/* begin::Item */}
                <div className="row">
                    {subfield.options.map((option: any) => {
                        return <div key={subfield.name+'_'+option.key}>
                            {/* begin::Input row */}
                            <div className="d-flex fv-row">
                                {/* begin::Radio */}
                                <div className="form-check form-check-custom form-check-solid">
                                    {/* begin::Input */}
                                    <input className="form-check-input me-3"
                                           name={subfield.name} type="checkbox"
                                           value={option.key}
                                           id={option.name+'_'+option.key}
                                           multiple={true}
                                           onClick={()=>handleClick(subfield.name, option.key)}
                                           checked={isChecked(subfield.name, option.key)}
                                           onChange={onChange}/>
                                    {/* end::Input */}

                                    {/* begin::Label */}
                                    <label className="form-check-label" htmlFor={option.name+'_'+option.key} >
                                        <div className="fw-bold text-gray-800">{option.title}</div>
                                        <div className="text-gray-600">Best for business owners and company administrators</div>
                                    </label>
                                    {/* end::Label */}

                                </div>
                                {/* end::Radio */}
                            </div>
                            {/* end::Input row */}
                            <div className='separator separator-dashed my-5' />
                        </div>
                    })}
                </div>
                {/* end::Item */}
            </div>);
        })}

    </div>
};

export {ChecklistDependencyField};