import {useQueryClient} from 'react-query'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse, useQueryResponseXPanel} from '../../core/QueryResponseProvider'
import React from "react";
import {AxiosService} from "../../../../../servicies/axios-service";

type Props = {
    apiPath: string,
    queryName: string,
};

const ListGrouping = ({queryName, apiPath}:Props) => {
  const {selected, clearSelected} = useListView();
    const xPanel = useQueryResponseXPanel();
  const queryClient = useQueryClient();
  const {query} = useQueryResponse();

  const handleDeleteSelectedItems = () =>{
      AxiosService.fireSwal({
          text:"Are you sure you would like to delete selected item(s)?",
          icon:"error",
          showCancelButton:true,
          buttonsStyling:false,
          confirmButtonText:"Yes, Delete!",
          cancelButtonText:"No, return",
          customClass:{
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-active-light"
          }}).then((result) => {
          if (result.isConfirmed) {
              AxiosService.postRequest(apiPath+'/bulk-delete', {
                  entryId:selected
              }).then(
                  (response: any) => {
                      // ✅ update detail view directly
                      queryClient.invalidateQueries([`${queryName}-${query}`]);
                      AxiosService.notify('success', response.message ? response.message : xPanel.single_title + " removed successfully");
                      clearSelected();
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
  };

  const handleBulkActionOnSelectedItems = (params:any) =>{
      AxiosService.fireSwal({
          text:"Are you sure you would like to " + params.label + " selected item(s)?",
          icon:"error",
          showCancelButton:true,
          buttonsStyling:false,
          confirmButtonText:"Yes, " + params.label + "!",
          cancelButtonText:"No, return",
          customClass:{
              confirmButton: "btn btn-primary",
              cancelButton: "btn btn-active-light"
          }}).then((result) => {
          if (result.isConfirmed) {
              params.entryId = selected;
              AxiosService.postRequest(apiPath+'/bulk-action', params).then(
                  (response: any) => {
                      // ✅ update detail view directly
                      queryClient.invalidateQueries([`${queryName}-${query}`]);
                      AxiosService.notify('success', response.message ? response.message : xPanel.single_title + " removed successfully");
                      clearSelected();
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
  };

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

        {xPanel.buttons.map((button: any, i:any) => {
            switch (button.name) {
                case 'bulk_action_btn':
                    return <button key={button.name + '_' + i} type='button' className={'me-3 btn '+ button.params.className}
                                   onClick={()=>handleBulkActionOnSelectedItems(button.params)}
                                   dangerouslySetInnerHTML={{__html: button.params.label +' Selected'}}>
                    </button>;
                case 'bulk_delete_btn':
                    return <button key={button.name + '_' + i} type='button' className='btn btn-danger' onClick={handleDeleteSelectedItems}>
                        Delete Selected
                    </button>;
                default:
                    return null;
            }
        })}
    </div>
  )
}

export {ListGrouping}
