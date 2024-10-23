/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {AxiosService} from "../../../../servicies/axios-service";
import {ListLoading} from "../../../dynamic-module/dynamic-list/components/loading/ListLoading";
import {useUserView} from "../../UserViewProvider";

export function DeactivateAccount() {
  const {currentUserId} = useUserView();
  const [isLoading, setSubmitting] = useState(false);
  const data:any = {};

  const handleSubmit = (e:any)=>{
    e.preventDefault();
    const inputValue2 = AxiosService.serialize(e.target, data);
    AxiosService.confirm('info', 'Deactivate', 'Are you sure you would like to deactivate this account?', 'Yes').then((result:any)=>{
      if (result.isConfirmed) {
        setSubmitting(true);
        AxiosService.postRequest('deactivate-account/'+currentUserId, inputValue2).then(
            function (resp: any) {
              AxiosService.notify('success', resp?.message);
              setSubmitting(false);
            },
            function (resp: any) {
              AxiosService.notify('error', resp?.data?.message);
              setSubmitting(false);
            }
        )
      } else if (result.isDenied) {
        AxiosService.fireSwal({
          text: 'Account not deactivated.',
          icon: 'info',
          confirmButtonText: "Ok",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-light-primary"
          }
        })
      }
    });

  };

  return (
      <>
        {/*begin::Deactivate Account*/}
        <div className="card  ">

          {/*begin::Card header*/}
          <div className="card-header border-0 cursor-pointer" role="button"
               data-bs-toggle="collapse" data-bs-target="#kt_account_deactivate"
               aria-expanded="true" aria-controls="kt_account_deactivate">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Deactivate Account</h3>
            </div>
          </div>
          {/*end::Card header*/}

          {/*begin::Content*/}
          <div id="kt_account_settings_deactivate" className="collapse show">
            {/*begin::Form*/}
            <form className="form" onSubmit={handleSubmit}>

              {/*begin::Card body*/}
              <div className="card-body border-top p-9">

                {/*begin::Notice*/}
                <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed mb-9 p-6">
                  {/*begin::Icon*/}
                  <i className="ki-duotone ki-information fs-2tx text-warning me-4">
                    <span className="path1" />
                    <span className="path2" />
                    <span className="path3" />
                  </i>
                  {/*end::Icon*/}

                  {/*begin::Wrapper*/}
                  <div className="d-flex flex-stack flex-grow-1 ">
                    {/*begin::Content*/}
                    <div className=" fw-semibold">
                      <h4 className="text-gray-900 fw-bold">Deactivate This User Account</h4>
                      <div className="fs-6 text-gray-700 ">By deactivating this account, this user won't be able to login or use the platform anymore. Confirm that you want to do this.</div>
                    </div>
                    {/*end::Content*/}

                  </div>
                  {/*end::Wrapper*/}
                </div>
                {/*end::Notice*/}

                {/*begin::Form input row*/}
                <div className="form-check form-check-solid fv-row">
                  <input name="account_deactivation" className="form-check-input" type="checkbox"
                         value="1" id="account_deactivation" />
                  <label className="form-check-label fw-semibold ps-2 fs-6"
                         htmlFor="account_deactivation">I confirm this account deactivation</label>
                </div>
                {/*end::Form input row*/}
              </div>
              {/*end::Card body*/}

              {/*begin::Card footer*/}
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button type="submit"
                        className="btn btn-danger fw-semibold">Deactivate Account</button>
              </div>
              {/*end::Card footer*/}

            </form>
            {/*end::Form*/}
            {isLoading && <ListLoading />}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Deactivate Account*/}
      </>
  )
}
