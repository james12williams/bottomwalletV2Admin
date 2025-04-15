import React from "react";

type Props = {
    field:any,
}

const CustomHtmlField = ({field}:Props) => {
    return <div {...field.wrapperAttributes} dangerouslySetInnerHTML={{ __html: field.value }} />
};

export {CustomHtmlField};