/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {Link} from "react-router-dom";
import {useQueryResponseXPanel} from "../../core/QueryResponseProvider";
import {MyTooltip} from "./MyTooltip";

type Props = {
    button: any
}

const EditButton: FC<Props> = ({button}) => {
    const xPanel = useQueryResponseXPanel();

    return <>
        {xPanel &&
            <MyTooltip content={"Edit "+ xPanel.entityName} placement={'top'}><Link to={button.primaryKey+'/edit'}
              className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
            <i className="ki-duotone ki-pencil fs-2">
                <span className="path1" />
                <span className="path2" />
            </i>
            </Link></MyTooltip>}
    </>
};

export {EditButton}
