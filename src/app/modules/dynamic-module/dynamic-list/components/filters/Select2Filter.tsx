import React, {useEffect} from "react";
import {Select2Field} from "../fields/Select2Field";

type Props = {
    filter:any,
    onChange:any,
    defaultValue?:any,
}

const Select2Filter = ({filter, onChange, defaultValue}:Props) => {
    return <>
        <Select2Field field={filter} onChange={onChange} value={defaultValue} />
    </>
};

export {Select2Filter};
