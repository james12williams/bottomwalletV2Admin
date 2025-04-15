import React from "react";
import clsx from "clsx";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const HiddenField = ({field, onChange, value, touched, error }:Props) => {
    return <input type="hidden"
               {...field.attributes}
               className={clsx(
                   'form-control mb-3 mb-lg-0',
                   {'is-invalid': touched && error},
                   {'is-valid': touched && !error}
               )}
               name={field.name}
                  defaultValue={field.value}
               onChange={onChange}
               autoComplete='off'/>
};

export {HiddenField};