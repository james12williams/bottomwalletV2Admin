import React, {FC} from "react";
import Spinner from "react-bootstrap/Spinner"

type Props = {
    as?: any
    size?: 'sm'
    role?: string
    ariaHidden?: boolean
}
const AppSpinner: FC<Props> = ({ as, ariaHidden, size, role , children}) => {
    return (<>
        <Spinner as={as} size={size} role={role} aria-hidden={ariaHidden} />
    </>)
}
export {AppSpinner}
