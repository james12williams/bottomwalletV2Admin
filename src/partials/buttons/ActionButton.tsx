import React, {FC, useState} from 'react'
import {AxiosService} from "../../app/servicies/axios-service";
import {KTSVG} from "../../_metronic/helpers";
import {useQueryClient} from "react-query";
import {useQueryResponse} from "../../app/modules/dynamic-module/dynamic-list/core/QueryResponseProvider";
import {MyTooltip} from "../../app/modules/dynamic-module/dynamic-list/components/buttons/MyTooltip";
import { AppSpinner } from '../content/AppSpinner';

type Props = {
    endpoint: string
    title: string
    className: string
    label?: string
    iconPath?: string
    queryName?: string
    onSuccess?: (item:any)=>void
}

const ActionButton: FC<Props> = ({ className,  endpoint, title, label, iconPath, onSuccess, queryName }) => {
    const [loading, setLoading] = useState(false);
    const {query} = useQueryResponse();
    const queryClient = useQueryClient();

    const performAction =()=> {
        if (!loading && endpoint) {
            AxiosService.fireSwal({
                text: "Are you sure you would like to perform this action?",
                icon: "error",
                showCancelButton: true,
                buttonsStyling: false,
                confirmButtonText: "Yes Continue!",
                cancelButtonText: "No, return",
                customClass: {
                    confirmButton: "btn btn-primary",
                    cancelButton: "btn btn-active-light"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true);
                    AxiosService.getRequest(endpoint).then(
                        (response: any) => {
                            AxiosService.notify('success', response.message ? response.message : "Action successful");
                            if (onSuccess){
                                onSuccess(response);
                            }else{
                                queryClient.invalidateQueries([`${queryName}-${query}`]);
                            }
                            setTimeout(() => {
                                setLoading(false);
                            }, 200);
                        },
                        (response: any) => {
                            if (response.data.message) {
                                AxiosService.notify('error', response.data.message);
                            }
                            setTimeout(() => {
                                setLoading(false);
                            }, 200);
                        });
                }
            });
        }
    };

    // @ts-ignore
    return (
        <MyTooltip content={title} placement={'top'}>
        <button type='button' onClick={performAction}
           className={className?className:"btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1"}>
            {label&&<span className='btn-label'>{label}</span>}
            {!loading && iconPath && <span className='svg-icon btn-icon svg-icon-2'>
                <KTSVG path={iconPath? iconPath: '/assets/media/icons/duotune/general/gen005.svg'} />
              </span>}
            {loading && <AppSpinner as="span" size="sm" role="status" ariaHidden={true} />}
        </button>
    </MyTooltip>
    )
};

export {ActionButton}
