import React from 'react'
import {isNotEmpty} from "../../../../../_metronic/helpers";
import {DynamicForm} from "../../../dynamic-module/dynamic-list/components/forms/DynamicForm";
import {ListLoading} from "../../../dynamic-module/dynamic-list/components/loading/ListLoading";
import {useQuery} from "react-query";
import {getItems} from "../../../dynamic-module/dynamic-list/core/QueryResponseProvider";
import {DeactivateAccount} from "./DeactivateAccount";
import {NotificationSetting} from "./NotificationSetting";
import {EmailPreference} from "./EmailPreference";
import {useUserView} from "../../UserViewProvider";

export function Settings() {
    const {requestUser, currentUserId} = useUserView();
  const {refetch, isLoading, data} = useQuery(
      '',
      () => {
        return getItems('users/'+currentUserId+'/edit')
      },
      {
        cacheTime: 0,
        enabled: true,
        onError: (err:any) => {}
      }
  );

  const isDone = () =>{
      refetch();
      requestUser();
      requestUser();
  }
  return (<>
        <div className="card mb-5 mb-xl-10">
          {/*begin::Card header*/}
          <div className="card-header">
            {/*begin::Card title*/}
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Profile Details</h3>
            </div>
            {/*end::Card title*/}
          </div>
          {/*begin::Card header*/}

          {/*begin::Content*/}
          <div className="card-body container mt-10 mb-10">
            {!isLoading && isNotEmpty(data) && <DynamicForm isUserLoading={isLoading} isDone={isDone} data={data} saveOnly={true}/>}
            {isLoading && <ListLoading />}
          </div>
          {/*end::Content*/}
        </div>

        <EmailPreference />

        <NotificationSetting />

        <DeactivateAccount />
      </>
  )
}
