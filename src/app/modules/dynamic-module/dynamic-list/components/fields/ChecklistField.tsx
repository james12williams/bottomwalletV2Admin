import React, {useState} from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const ChecklistField = ({field, onChange, value, touched, error }:Props) => {
    let defaultVals:any = [];
    if (field.values){
        defaultVals = field.values??[];
    }

    const [valueMain, setValue] = useState(defaultVals);

    const handleClick = (val:any) => {
        let index = valueMain.findIndex((x:any)=> x==val);
        if (index>-1){
            valueMain.splice(index, 1)
        }else{
            valueMain.push(val)
        }
        setValue(valueMain);
    };

    const isChecked = (val:any) => {
        let index = valueMain.findIndex((x:any)=> x==val);
        return index > -1;
    };

    field.options = Object.keys(field.options).map((key:any)=>{
        if (field.options[key].key){
            return field.options[key];
        }else{
            return {key:key, value: field.options[key]};
        }
    });

    return <div {...field.wrapperAttributes} className='form-group mt-4' id={field.name+'_container'}>
        {field.label && <label htmlFor={field.name} className={clsx('form-label fs-6 fw-bold', {'required': field.is_required})}>
            {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}:</label>}
        <div className="row">
            {field.options.map((option: any, key:any) => {
                return <div key={field.name+'_'+field.key+'_'+key} className={field.optionClass}>
                    {/* begin::Input row */}
                    <div className="d-flex fv-row">
                        {/* begin::Radio */}
                        <div className="form-check form-check-custom form-check-solid">
                            {/* begin::Input */}
                            <input className="form-check-input me-3"
                                   name={field.name} type="checkbox"
                                   value={option.key}
                                   id={field.name+'_'+field.key+'_'+key}
                                   multiple={true}
                                   onClick={()=>handleClick(option.key)}
                                   defaultChecked={isChecked(option.key)}
                                   onChange={onChange}/>
                            {/* end::Input */}

                            {/* begin::Label */}
                            <label className="form-check-label" htmlFor={field.name+'_'+field.key+'_'+key} >
                                <div className="fw-bold text-gray-800">{option.value}</div>
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

export {ChecklistField};
