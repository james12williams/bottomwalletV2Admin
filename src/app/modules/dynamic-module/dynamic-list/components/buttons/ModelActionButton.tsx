/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'

import {useListView} from "../../core/ListViewProvider";
import {MyTooltip} from "./MyTooltip";
import {KTSVG} from "../../../../../../_metronic/helpers";
import {AppSpinner} from "../../../../../../partials/content/AppSpinner";

type Props = {
    endpoint: string
    title: string
    className: string
    label?: string
    iconPath?: string
    queryName?: string
    onSuccess?: (item:any)=>void
}

const ModelActionButton: FC<Props> = ({ className,  endpoint, title, label, iconPath, onSuccess, queryName }) => {
    const {setBookingIdToCancel, bookingIdToCancel} = useListView();

    const openCancelModal = () => {
        setBookingIdToCancel(endpoint)
    };

    return (
        <MyTooltip content={title} placement={'top'}>
            <button type='button' onClick={openCancelModal}
                    title={title}
                    className={className?className:"btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"}>
                {label&&<span className='btn-label'>{label}</span>}
                {!(bookingIdToCancel==endpoint) && iconPath && <span className='svg-icon btn-icon svg-icon-2'>
                <KTSVG path={iconPath? iconPath: '/assets/media/icons/duotune/general/gen005.svg'} />
              </span>} {(bookingIdToCancel==endpoint) && <AppSpinner as="span" size="sm" role="status" aria-hidden={true} />}
            </button>
        </MyTooltip>
    )
};

export {ModelActionButton}
