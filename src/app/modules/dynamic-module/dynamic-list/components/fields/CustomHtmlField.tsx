import React from "react";

type Props = {
    field:any,
    onChange:any,
    value:any,
    touched:any,
    error:any,
}

const CustomHtmlField = ({field, onChange, value, touched, error }:Props) => {
    return <div {...field.wrapperAttributes} dangerouslySetInnerHTML={{ __html: field.value }} />
};

export {CustomHtmlField};