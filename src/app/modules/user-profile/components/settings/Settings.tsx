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
import {FormLoader} from "../../../../../partials/loaders";

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
          <div className='position-relative'>
              {isLoading && <FormLoader />}

              {!isLoading && isNotEmpty(data) && <DynamicForm isUserLoading={isLoading} isDone={isDone} data={data} saveOnly={true} actionTitle={'Save Changes'}/>}


              {/*<EmailPreference />*/}

              {/*<NotificationSetting />*/}

              <DeactivateAccount />
          </div>
      </>
  )
}
