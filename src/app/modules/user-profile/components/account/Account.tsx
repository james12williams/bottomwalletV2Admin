/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {Link} from "react-router-dom";
import {useUserView} from "../../UserViewProvider";

export function Account() {
  const {currentPath, currentUser, isSuperAdmin} = useUserView();
  return (
      <>
        <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
          {/*begin::Card header*/}
          <div className="card-header cursor-pointer">
            {/*begin::Card title*/}
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Profile Details</h3>
            </div>
            {/*end::Card title*/}

            {/*begin::Action*/}
            <Link to={currentPath+"/settings"} className="btn btn-sm btn-primary align-self-center">Edit Profile</Link>
            {/*end::Action*/}
          </div>
          {/*begin::Card header*/}

          {/*begin::Card body*/}
          <div className="card-body p-9">
            {/*begin::Row*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Full Name</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">{currentUser.name}</span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Row*/}

            {/*begin::Row*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">First Name</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">{currentUser.first_name}</span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Row*/}

            {/*begin::Row*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Last Name</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">{currentUser.last_name}</span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Row*/}

            {/*begin::Row*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Other Name</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">{currentUser.other_name}</span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Row*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Username</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">{currentUser.username}</span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">UID</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8 fv-row">
                <span className="fw-semibold text-gray-800 fs-6">{currentUser.uid}</span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">
                Contact Phone
                <span className="ms-1" data-bs-toggle="tooltip"
                      title="Phone number must be active">
                  <i className="ki-duotone ki-information fs-7">
                    <span className="path1"/>
                    <span className="path2"/>
                    <span className="path3"/>
                  </i>
                </span>
              </label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8 d-flex align-items-center">
                <span className="fw-bold fs-6 text-gray-800 me-2">{currentUser.phone} </span>
                {currentUser.verified_phone && <span className="badge badge-success">Verified</span>}
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Email</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <a href="#" className="fw-semibold fs-6 text-gray-800 text-hover-primary">{currentUser.email} </a>
                {currentUser.verified_email && <span className="badge badge-success">Verified</span>}
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">
                Country
                <span className="ms-1" data-bs-toggle="tooltip"
                      title="Country of origination">
                  <i className="ki-duotone ki-information fs-7">
                    <span className="path1"/>
                    <span className="path2"/>
                    <span className="path3"/>
                  </i>
                </span>
              </label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  <img src={currentUser.country?.flag} alt={currentUser.country?.name}
                       className='svg-icon-4 me-1'/>
                  {currentUser.country?.name}
                </span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">
                Timezone
                <span className="ms-1" data-bs-toggle="tooltip"
                      title="Country of origination">
                  <i className="ki-duotone ki-information fs-7">
                    <span className="path1"/>
                    <span className="path2"/>
                    <span className="path3"/>
                  </i>
                </span>
              </label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {currentUser.time_zone}
                </span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Roles</label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {
                    currentUser.roles?.length>0 && currentUser.roles.map((role:any, index:number)=>{
                      return role.title + (index+1 !== currentUser.roles.length? ', ': '');
                    })
                  }
                </span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-10">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">Accept Terms and Conditions</label>
              {/*begin::Label*/}

              {/*begin::Label*/}
              <div className="col-lg-8">
                <span className="fw-semibold fs-6 text-gray-800">{currentUser.accept_terms ? 'Yes': 'No'}</span>
              </div>
              {/*begin::Label*/}
            </div>
            {/*end::Input group*/}

            {/*begin::Input group*/}
            <div className="row mb-7">
              {/*begin::Label*/}
              <label className="col-lg-4 fw-semibold text-muted">
                Created Date
                <span className="ms-1" data-bs-toggle="tooltip"
                      title="Country of origination">
                  <i className="ki-duotone ki-information fs-7">
                    <span className="path1"/>
                    <span className="path2"/>
                    <span className="path3"/>
                  </i>
                </span>
              </label>
              {/*end::Label*/}

              {/*begin::Col*/}
              <div className="col-lg-8">
                <span className="fw-bold fs-6 text-gray-800">
                  {currentUser.created_at_formatted}
                </span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Input group*/}


            {/*begin::Notice*/}
            {isSuperAdmin && <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed  p-6">
              {/*begin::Icon*/}
              <i className="ki-duotone ki-information fs-2tx text-warning me-4">
                <span className="path1"/>
                <span className="path2"/>
                <span className="path3"/>
              </i>
              {/*end::Icon*/}

              {/*begin::Wrapper*/}
              <div className="d-flex flex-stack flex-grow-1 ">
                {/*begin::Content*/}
                <div className=" fw-semibold">
                  <h4 className="text-gray-900 fw-bold">We need your attention!</h4>

                  <div className="fs-6 text-gray-700 ">Your payment was declined. To start
                    using tools, please <Link className="fw-bold" to="/apps/account/billing">Add Payment Method</Link>.
                  </div>
                </div>
                {/*end::Content*/}

              </div>
              {/*end::Wrapper*/}
            </div>}
            {/*end::Notice*/}
          </div>
          {/*end::Card body*/}
        </div>
      </>
  )
}
