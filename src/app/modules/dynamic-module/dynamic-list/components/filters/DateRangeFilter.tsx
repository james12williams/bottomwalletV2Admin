import React from "react";
import {DateRangeField} from "../fields/DateRangeField.tsx";

type Props = {
    filter:any,
    onChange:any,
    defaultValue?:any,
}

const DateRangeFilter = ({filter, onChange, defaultValue}:Props) => {
    return <>
        <DateRangeField field={filter}
                        error={filter.errors}
                        touched={filter.touched} numberOfMonths={1}/>
    </>
};

export {DateRangeFilter};
