import React from "react";

type Props = {
    filter:any,
    onChange:any,
    defaultValue?:any,
}

const DateFilter = ({filter, onChange, defaultValue}:Props) => {

    return <>
        {/* begin::Input group */}
        <div className='mb-10'>
            <label className='form-label fs-6 fw-bold'>{filter.label}:</label>
            <input type="date" name={filter.name} defaultValue={defaultValue}
                   required={filter.is_required} placeholder={filter.label}
                   onChange={onChange}
                   className="form-control mb-3 mb-lg-0" />
        </div>
        {/* end::Input group */}
    </>
};

export {DateFilter};
