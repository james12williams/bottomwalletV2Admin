/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {useListView} from "../../core/ListViewProvider";
import {MyTooltip} from "./MyTooltip";
import {useQueryResponseXPanel} from "../../core/QueryResponseProvider";

type Props = {
    button: any
}

const QuickEditButton: FC<Props> = ({button}) => {
    const {setItemIdForUpdate} = useListView();
    const xPanel = useQueryResponseXPanel();

    const openEditModal = () => {
        setItemIdForUpdate(button.primaryKey)
    };

    return (
        <MyTooltip content={"Quick edit "+ xPanel.entityName} placement={'top'}>
            <a onClick={openEditModal}
            className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
            <i className="ki-duotone ki-pencil fs-2">
                <span className="path1" />
                <span className="path2" />
            </i>
        </a>
        </MyTooltip>
    )
};

export {QuickEditButton}
