import React, {FC} from "react";
import Spinner from "react-bootstrap/Spinner"
import {WithChildren} from "../../_metronic/helpers";

type Props = {
    as?: any
    size?: 'sm'
    role?: string
    className?: string
    ariaHidden?: boolean
}
const AppSpinner: FC<Props & WithChildren> = ({ as, ariaHidden, size, role, className , children}) => {
    return (<>
        <Spinner className={className} as={as} size={size} role={role} aria-hidden={ariaHidden} />
    </>)
}
export {AppSpinner}
