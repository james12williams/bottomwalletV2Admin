import React, {FC} from 'react'
import {Link} from "react-router-dom";

type Props = {
  value?: any
}

const LinkCell: FC<Props> = ({value}) => {
  return (<Link to={value.href}>{value.value}</Link>)
};

export {LinkCell}
