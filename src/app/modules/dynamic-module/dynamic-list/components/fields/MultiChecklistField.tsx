import React, {useState} from "react";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const MultiChecklistField = ({field, onChange, value, touched, error }:Props) => {
    let defaultVals:any = [];
    if (field.value){
        defaultVals = field.value??[];
    }

    const [valueMain, setValue] = useState(defaultVals);

    const handleClick = (val:any) => {
        let index = valueMain.findIndex((x:any)=> parseInt(x) == val);
        if (index>-1){
            valueMain.splice(index, 1)
        }else{
            valueMain.push(val)
        }
        setValue(valueMain);
    };

    const isChecked = (val:any) => {
        let index = valueMain.findIndex((x:any)=> parseInt(x)==val);
        return index > -1;
    };

    const handleClickAll = () => {
        if (isCheckedAll()){
            setValue([]);
        }else{
            field.options.map((option: any) => {
                option.options.map((val: any) => {
                    let index = valueMain.findIndex((x: any) => parseInt(x) == val.key);
                    if (index < 0) {
                        valueMain.push(val.key)
                    }
                })
            });
            setValue(valueMain);
        }
    };

    const isCheckedAll = () => {
        let val = true;
        field.options.forEach((option: any) => {
            option.options.forEach((val2: any) => {
                let index = valueMain.findIndex((x: any) => parseInt(x) == val2.key);
                if (index < 0) {
                    val = false;
                }
            })
        });
        return val;
    };

    return <div {...field.wrapperAttributes} className='form-group mt-4' id={field.name+'_container'}>
        <div className="table-responsive">
            {/* begin::Table*/}
            <table className="table align-middle table-row-dashed fs-6 gy-5">
                {/* begin::Table body*/}
                <tbody className="text-gray-600 fw-semibold">
                {/* begin::Table row*/}
                <tr>
                    <td className="text-gray-800">
                        {field.tooltip && <span className="ms-1" data-bs-toggle="tooltip" title={field.tooltip}>
                  <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                  </i>
              </span>} {field.label}
                        <span className="ms-1"
                              data-bs-toggle="tooltip"
                              title="Allows a full access to the system">
                            <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                                <span className="path1" />
                                <span className="path2" />
                                <span className="path3" />
                            </i>
                        </span>
                    </td>
                    <td>
                        {/* begin::Checkbox*/}
                        <label className="form-check form-check-sm form-check-custom form-check-solid me-9">
                            <input className="form-check-input" type="checkbox"
                                   checked={isCheckedAll()}
                                   onChange={onChange}
                                   onClick={()=>handleClickAll()} />
                            <span className="form-check-label">Select all</span>
                        </label>
                        {/* end::Checkbox*/}
                    </td>
                </tr>
                {/* end::Table row*/}

                {/* begin::Table row*/}
                {field.options.map((option: any) => {
                    return (<tr key={option.key}>
                        {/* begin::Label*/}
                        <td className="text-gray-800">{option.label}</td>
                        {/* end::Label*/}

                        {/* begin::Input group*/}
                        <td>
                            {/* begin::Wrapper*/}
                            <div className="d-flex">
                                {/* begin::Checkbox*/}
                                {option.options.map((option2: any) => {
                                    return (<label key={option.key+'_'+option2.key}
                                        className="form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20">
                                        <input className="form-check-input"
                                               name={field.name} type="checkbox"
                                               value={option2.key}
                                               id={option.key+'_'+option2.key}
                                               multiple={true}
                                               onClick={()=>handleClick(option2.key)}
                                               checked={isChecked(option2.key)}
                                               onChange={onChange} />
                                        <span className="form-check-label">{option2.label}</span>
                                    </label>)
                                })}
                                {/* end::Checkbox*/}
                            </div>
                            {/* end::Wrapper*/}
                        </td>
                        {/* end::Input group*/}
                    </tr>)
                })}

                {/* end::Table row*/}

                </tbody>
                {/* end::Table body*/}
            </table>
            {/* end::Table*/}
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

export {MultiChecklistField};