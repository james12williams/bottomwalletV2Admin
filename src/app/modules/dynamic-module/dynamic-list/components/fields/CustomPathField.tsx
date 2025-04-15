import React from "react";
import {Link} from "react-router-dom";

type Props = {
    field:any,
}

const CustomPathField = ({field}:Props) => {
    return <Link id={field.name+'_container'} to={field.value} {...field.wrapperAttributes} dangerouslySetInnerHTML={{__html:field.label}}></Link>
};

export {CustomPathField};