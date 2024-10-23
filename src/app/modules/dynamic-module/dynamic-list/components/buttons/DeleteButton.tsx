import React, {FC, useEffect} from 'react'
import {useQueryResponse, useQueryResponseXPanel} from '../../core/QueryResponseProvider'
import {useQueryClient} from "react-query";
import {MenuComponent} from "../../../../../../_metronic/assets/ts/components";
import {AxiosService} from "../../../../../servicies/axios-service";
import {MyTooltip} from "./MyTooltip";

type Props = {
    button: any
    queryName: any
}

const DeleteButton: FC<Props> = ({ button, queryName }) => {
    const xPanel = useQueryResponseXPanel();
    const {query} = useQueryResponse();
    const queryClient = useQueryClient();

    useEffect(() => {
        MenuComponent.reinitialization()
    }, []);

    const deleteItem =()=> {
        AxiosService.fireSwal({
            text:"Are you sure you would like to delete this item?",
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
                AxiosService.deleteRequest(xPanel.route + "/" + button.primaryKey).then(
                    (response: any) => {
                        // ✅ update detail view directly
                        queryClient.invalidateQueries([`${queryName}-${query}`])
                        AxiosService.notify('success', response.message ? response.message : xPanel.single_title + " removed successfully");
                    },
                    (response: any) => {
                        if (response.data.message) {
                            AxiosService.notify('error', response.data.message);
                        }
                    });
            } else {
                AxiosService.fireSwal({
                    text:"Your form has not been cancelled!.",
                    icon:"error",
                    showCancelButton:false,
                    buttonsStyling:false,
                    confirmButtonText:"Ok, got it!",
                });
            }
        });
    };

    return (
        <MyTooltip content={"Delete "+ xPanel.entityName} placement={'top'}>
        <a onClick={deleteItem}
            className="btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1">
            <i className="ki-duotone ki-trash fs-2">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
                <span className="path4" />
                <span className="path5" />
                <span className="path6" />
                <span className="path7" />
                <span className="path8" />
            </i>
        </a>
        </MyTooltip>
    )
};

export {DeleteButton}
