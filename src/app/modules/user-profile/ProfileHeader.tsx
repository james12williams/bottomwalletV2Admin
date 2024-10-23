/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {KTSVG} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import {useUserView} from "./UserViewProvider";
import {ActionButton} from "../../../partials/buttons/ActionButton";
import {useAuth} from "../auth";

const ProfileHeader: React.FC = () => {
  const location = useLocation();
  const {currentPath, currentUser, requestUser} = useUserView();
  const x = useAuth();
  return (
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-3'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src={currentUser.photo_url} alt={ currentUser.username + ' avatar'} />
                {currentUser.is_online && <div
                    className='position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px'/>}
              </div>
            </div>

            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-2'>
                    <a href='#' className='text-gray-800 text-hover-primary fs-2 fw-bolder me-1'>
                      {currentUser.name}
                    </a>
                    {currentUser.verified_email && currentUser.verified_phone && <a href='#'>
                      <KTSVG path='assets/media/icons/duotune/general/gen026.svg'
                             className='svg-icon-1 svg-icon-primary'/>
                    </a>}
                  </div>

                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <a href='#'
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                      <KTSVG
                          path='assets/media/icons/duotune/communication/com006.svg'
                          className='svg-icon-4 me-1'
                      />
                      {currentUser.role?.title}
                    </a>
                    <a href='#'
                        className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                      <img src={currentUser.country?.flag} alt={currentUser.country?.name}
                           className='svg-icon-4 me-1'/>
                      {currentUser.country?.name}
                    </a>
                    <a href='#'
                       className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'>
                      <KTSVG
                          path='assets/media/icons/duotune/communication/com011.svg'
                          className='svg-icon-4 me-1'
                      />
                      {currentUser.email}
                    </a>
                  </div>
                </div>
                <div className="d-flex my-4">
                  {currentUser.closed != 1 &&
                      <ActionButton onSuccess={requestUser}
                                    endpoint={"deactivate-account/" + currentUser.id+"?account_deactivation=1"}
                                    label="Deactivate User"
                                    title="Deactivate User"
                                    className="btn btn-sm btn-danger me-2"/>}

                  {currentUser.closed == 1 &&
                      <ActionButton onSuccess={requestUser}
                                    endpoint={"activate-account/" + currentUser.id}
                                    label="Activate User"
                                    title="Activate User"
                                    className="btn btn-sm btn-primary me-2"/>}
                </div>
              </div>

              <div className="d-flex flex-wrap flex-stack">

                {/*begin::Wrapper*/}
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  {/*begin::Stats*/}
                  <div className="d-flex flex-wrap">

                    {/*begin::Stat*/}
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      {/*begin::Number*/}
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder counted"
                             data-kt-countup="true"
                             data-kt-countup-value={currentUser.wallet?.current_balance}
                             data-kt-countup-prefix={currentUser.currency?.symbol}>
                          {currentUser.currency?.symbol}{currentUser.current_balance}
                        </div>
                      </div>
                      {/*end::Number*/}
                      {/*begin::Label*/}
                      <div className="fw-bold fs-6 text-gray-400">Wallet Balance</div>
                      {/*end::Label*/}
                    </div>
                    {/*end::Stat*/}

                    {/*begin::Stat*/}
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      {/*begin::Number*/}
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder counted"
                             data-kt-countup="true"
                             data-kt-countup-value={currentUser.wallet?.ledger_balance}
                             data-kt-countup-prefix={currentUser.currency?.symbol}>
                          {currentUser.currency?.symbol}{currentUser.ledger_balance}
                        </div>
                      </div>
                      {/*end::Number*/}
                      {/*begin::Label*/}
                      <div className="fw-bold fs-6 text-gray-400">Wallet Ledger Balance</div>
                      {/*end::Label*/}
                    </div>
                    {/*end::Stat*/}

                    {/*begin::Stat*/}
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      {/*begin::Number*/}
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder counted"
                             data-kt-countup="true"
                             data-kt-countup-value={ currentUser.total_reservations }>
                          { currentUser.total_reservations }
                        </div>
                      </div>
                      {/*end::Number*/}
                      {/*begin::Label*/}
                      <div className="fw-bold fs-6 text-gray-400">No. of Bookings</div>
                      {/*end::Label*/}
                    </div>
                    {/*end::Stat*/}

                    {/*begin::Stat*/}
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      {/*begin::Number*/}
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder counted"
                             data-kt-countup="true"
                             data-kt-countup-value={ currentUser.pending_reservations }>
                          { currentUser.pending_reservations }
                        </div>
                      </div>
                      {/*end::Number*/}
                      {/*begin::Label*/}
                      <div className="fw-bold fs-6 text-gray-400">Pending Booking</div>
                      {/*end::Label*/}
                    </div>
                    {/*end::Stat*/}

                  </div>
                  {/*end::Stats*/}
                </div>
                {/*end::Wrapper*/}

              </div>

            </div>
          </div>

          {
            (x.currentUser?.id == currentUser?.id) ?
            <div className='d-flex overflow-auto h-55px'>
              <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                <li className='nav-item'>
                  <Link className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/overview' && 'active')
                  }
                        to='/apps/account/overview'>
                    Overview
                  </Link>
                </li>

                <li className='nav-item'>
                  <Link className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/settings' && 'active')
                  }
                        to='/apps/account/settings'>
                    Settings
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/withdrawal-account' && 'active')
                  }
                        to='/apps/account/withdrawal-account'>
                    Withdrawal Accounts
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/wallets' && 'active')
                  }
                        to='/apps/account/wallets'>
                    Wallets
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/transactions' && 'active')}
                        to='/apps/account/transactions'>
                    Transactions
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className={
                      `nav-link text-active-primary me-6 ` +
                      (location.pathname === '/apps/account/logs' && 'active')
                  }
                        to='/apps/account/logs'>
                    Logs
                  </Link>
                </li>

              </ul>
            </div>
                :
                <div className='d-flex overflow-auto h-55px'>
                  <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap'>
                    <li className='nav-item'>
                      <Link className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === currentPath+'/overview' && 'active')
                      }
                            to={currentPath+'/overview'}>
                        Overview
                      </Link>
                    </li>

                    <li className='nav-item'>
                      <Link className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === currentPath+'/settings' && 'active')
                      }
                            to={currentPath+'/settings'}>
                        Settings
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === currentPath+'/withdrawal-account' && 'active')
                      }
                            to={currentPath+'/withdrawal-account'}>
                        Withdrawal Accounts
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === currentPath+'/wallets' && 'active')
                      }
                            to={currentPath+'/wallets'}>
                        Wallets
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === currentPath+'/transactions' && 'active')}
                            to={currentPath+'/transactions'}>
                        Transactions
                      </Link>
                    </li>
                    <li className='nav-item'>
                      <Link className={
                          `nav-link text-active-primary me-6 ` +
                          (location.pathname === currentPath+'/logs' && 'active')
                      }
                            to={currentPath+'/logs'}>
                        Logs
                      </Link>
                    </li>

                  </ul>
                </div>
          }
        </div>
      </div>
  )
};

export {ProfileHeader}
