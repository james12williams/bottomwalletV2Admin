import React from "react";

type Props = {
    filter:any,
    onChange:any,
    defaultValue?:any,
}

const Select2MultipleFilter = ({filter, onChange, defaultValue}:Props) => {
    return <>
        {/* begin::Input group */}
        <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>{filter.label}:</label>
            <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-user-table-filter='role'
                data-hide-search='true'
                name={filter.name}
                required={filter.is_required} placeholder={filter.label}
                defaultValue={defaultValue}
                onChange={onChange}
            >
                <option value=''></option>
                {
                    filter.values.map((option: any, i:string) => {
                        return <option value={option.key}
                                       key={filter.name+'_'+option.key}>
                            {option.value}
                        </option>;
                    })
                }
            </select>
        </div>
        {/* end::Input group */}
    </>
};

export {Select2MultipleFilter};
