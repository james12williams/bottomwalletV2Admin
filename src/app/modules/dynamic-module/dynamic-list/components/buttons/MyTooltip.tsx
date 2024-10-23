/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, ReactChildren, ReactComponentElement} from 'react'
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Placement} from "react-bootstrap/types";
import {OverlayTriggerType} from "react-bootstrap/OverlayTrigger";

type Props = {
    children:ReactComponentElement<any>,
    content: any,
    className?: string,
    placement?: Placement,
    trigger?: OverlayTriggerType,
}
const MyTooltip: FC<Props> = ({children, placement='auto', trigger='hover', content, className}) => {
    return <OverlayTrigger trigger={[trigger, 'focus']} placement={placement} overlay={<Tooltip className="text-capitalize">{content}</Tooltip>}>
        {children}
    </OverlayTrigger>
};

export {MyTooltip}