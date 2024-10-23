/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {AxiosService} from "../../../../servicies/axios-service";
import {ListLoading} from "../../../dynamic-module/dynamic-list/components/loading/ListLoading";

export function EmailPreference() {
  const [isLoading, setSubmitting] = useState(false);
  const data:any = {};

  const handleSubmit = (e:any)=>{
    e.preventDefault();
    const inputValue2 = AxiosService.serialize(e.target, data);
    AxiosService.confirm('info', '', 'Are you sure you would like to deactivate your account?', 'Yes').then((result:any)=>{
      if (result.isConfirmed) {
        setSubmitting(true);
        AxiosService.postRequest('deactivate-account', inputValue2).then(
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
        {/*begin::Notifications*/}
        <div className="card mb-5 mb-xl-10">
          {/*begin::Card header*/}
          <div className="card-header border-0 cursor-pointer" role="button"
               data-bs-toggle="collapse" data-bs-target="#kt_account_email_preferences"
               aria-expanded="true" aria-controls="kt_account_email_preferences">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Email Preferences</h3>
            </div>
          </div>
          {/*begin::Card header*/}

          {/*begin::Content*/}
          <div id="kt_account_settings_email_preferences" className="collapse show">
            {/*begin::Form*/}
            <form className="form" onSubmit={handleSubmit}>
              {/*begin::Card body*/}
              <div className="card-body border-top px-9 py-9">
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">Successful Payments</span>
                      <span className="text-muted fs-6">Receive a notification for every successful payment.</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

                {/*begin::Option*/}
                <div className="separator separator-dashed my-6" />
                {/*end::Option*/}
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">Payouts</span>
                      <span className="text-muted fs-6">Receive a notification for every initiated payout.</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

                {/*begin::Option*/}
                <div className="separator separator-dashed my-6" />
                {/*end::Option*/}
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">Fee Collection</span>
                      <span className="text-muted fs-6">Receive a notification each time you collect a fee from sales</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

                {/*begin::Option*/}
                <div className="separator separator-dashed my-6" />
                {/*end::Option*/}
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">Customer Payment Dispute</span>
                      <span className="text-muted fs-6">Receive a notification if a
                          payment is disputed by a customer and for dispute purposes.</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

                {/*begin::Option*/}
                <div className="separator separator-dashed my-6" />
                {/*end::Option*/}
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">Refund Alerts</span>
                      <span className="text-muted fs-6">Receive a notification if a
                          payment is stated as risk by the Finance Department.</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

                {/*begin::Option*/}
                <div className="separator separator-dashed my-6" />
                {/*end::Option*/}
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                    <span className="fw-bold fs-5 mb-0">Invoice Payments</span>
                    <span className="text-muted fs-6">Receive a notification if a
                        customer sends an incorrect amount to pay their
                        invoice.</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

                {/*begin::Option*/}
                <div className="separator separator-dashed my-6" />
                {/*end::Option*/}
                {/*begin::Option*/}
                <label
                    className="form-check form-check-custom form-check-solid align-items-start">
                  {/*begin::Input*/}
                  <input className="form-check-input me-3" type="checkbox"
                         name="email-preferences[]" value="1" />
                  {/*end::Input*/}

                  {/*begin::Label*/}
                  <span className="form-check-label d-flex flex-column align-items-start">
                      <span className="fw-bold fs-5 mb-0">Webhook API Endpoints</span>
                      <span className="text-muted fs-6">Receive notifications for
                          consistently failing webhook API endpoints.</span>
                  </span>
                  {/*end::Label*/}
                </label>
                {/*end::Option*/}

              </div>
              {/*end::Card body*/}

              {/*begin::Card footer*/}
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                    className="btn btn-light btn-active-light-primary me-2">Discard</button>
                <button className="btn btn-primary  px-6">Save Changes</button>
              </div>
              {/*end::Card footer*/}
            </form>
            {/*end::Form*/}
              {isLoading && <ListLoading />}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Notifications*/}
      </>
  )
}
