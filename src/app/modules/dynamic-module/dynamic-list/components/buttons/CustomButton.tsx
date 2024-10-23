/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect, useState} from 'react'
import {useQueryResponse, useQueryResponseXPanel} from '../../core/QueryResponseProvider'
import {useQueryClient} from "react-query";
import {useListView} from "../../core/ListViewProvider";
import {MenuComponent} from "../../../../../../_metronic/assets/ts/components";
import clsx from "clsx";
import {AxiosService} from "../../../../../servicies/axios-service";
import {useNavigate} from "react-router";
import {MyTooltip} from "./MyTooltip";
import {useAuth} from "../../../../auth";
import {AppSpinner} from "../../../../../../partials/content/AppSpinner";

type Props = {
    button: any,
    queryName:any
}

const CustomButton: FC<Props> = ({ button, queryName }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {setCurrentUser, requestUser, setAuth} = useAuth();
    const xPanel = useQueryResponseXPanel();
    const {setItemIdForUpdate} = useListView();
    const {query} = useQueryResponse();
    const queryClient = useQueryClient();

    useEffect(() => {
        MenuComponent.reinitialization()
    }, []);

    const onItemClick = () => {
        switch (button.name) {
            case "impersonate":
                if (button.values.value) {
                    setLoading(true);
                    AxiosService.getRequest('auth/impersonate/take/' + button.values.value)
                        .then((resp: any) => {
                            AxiosService.notify('success', resp?.message);
                            if (AxiosService.setAuthUserData(resp)) {
                                setCurrentUser(resp.result);
                                setTimeout(() => {
                                    setAuth(true);
                                    setLoading(false);
                                    navigate('/apps/dashboard', {replace: true});
                                    requestUser();
                                }, 200);
                            }
                        }, (resp) => {
                            AxiosService.notify('error', resp?.data?.message);
                            setTimeout(() => {
                                setLoading(false);
                            }, 200);
                        });
                }
                break;
            case "resend_mail":
                if (button.values.value) {
                    setLoading(true);
                    AxiosService.postRequest('resend-mail/' + button.values.value +'/'+ button.values.table)
                        .then((resp: any) => {
                            AxiosService.notify('success', resp?.message);
                            setLoading(false);
                        }, (resp) => {
                            AxiosService.notify('error', resp?.data?.message);
                            setTimeout(() => {
                                setLoading(false);
                            }, 200);
                        });
                }
                break;
            case "check_mail_status":
                if (button.values.value) {
                    setLoading(true);
                    AxiosService.postRequest('check-mail-status/' + button.values.value)
                        .then((resp: any) => {
                            AxiosService.notify('success', resp?.message);
                            queryClient.invalidateQueries([`${queryName}-${query}`]);
                            setLoading(false);
                        }, (resp) => {
                            AxiosService.notify('error', resp?.data?.message);
                            setTimeout(() => {
                                setLoading(false);
                            }, 200);
                        });
                }
                break;
            case "update":
                setItemIdForUpdate(button.values.value);
                break;
            default:
                AxiosService.fireSwal({text:"Are you sure you would like to delete this item?",
                    icon:"error",
                    showCancelButton:true,
                    buttonsStyling:false,
                    confirmButtonText:"Yes, Delete it!",
                    cancelButtonText:"No, return",
                    customClass:{
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-active-light"
                    }}).then((result) => {
                    if (result.isConfirmed) {
                        AxiosService.postRequest(xPanel.route + "/" + button.primaryKey, {}).then(
                            (response: any) => {
                                // ✅ update detail view directly
                                queryClient.invalidateQueries([`${queryName}-${query}`]);
                                AxiosService.notify('success', response.message ? response.message : xPanel.single_title + " removed successfully");
                            },
                            (response: any) => {
                                if (response.data.message) {
                                    AxiosService.notify('error', response.data.message);
                                }
                            });
                    }
                    else {
                        AxiosService.fireSwal({
                            text:"Your form has not been cancelled!.",
                            icon:"error",
                            showCancelButton:false,
                            buttonsStyling:false,
                            confirmButtonText:"Ok, got it!",
                        });
                    }
                });
                break;
        }
    };

    return (
        <MyTooltip content={button?.values?.tooltip} placement={'top'}>
            <button type='button' onClick={()=>onItemClick()} disabled={loading}
               className={clsx(
                   'btn btn-bg-'+button.values.bg_color +' btn-active-color-'+button.values.active_color +' btn-sm me-1',
                   {'btn-icon': button.values.icon_only}
               )}>

                {loading? <AppSpinner as="span" size="sm" role="status" aria-hidden="true"/>: <i className={button.values.icon}>
                    <span className="path1" />
                    <span className="path2" />
                    <span className="path3" />
                    <span className="path4" />
                    <span className="path5" />
                    <span className="path6" />
                    <span className="path7" />
                    <span className="path8" />
                </i>}
            </button>
        </MyTooltip>
    )
};

export {CustomButton}
