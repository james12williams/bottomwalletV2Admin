/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router-dom'
import SVG from "react-inlinesvg";
import {ListLoading} from "../dynamic-module/dynamic-list/components/loading/ListLoading";
import {useView} from "./ViewProvider";

const routes = [
    {
        path: '/apps/mailbox/compose',
        label: 'Compose',
        image: 'assets/media/icons/duotune/general/gen055.svg',
    },
    {
        path: '/apps/mailbox/sent',
        label: 'Sent',
        image: 'assets/media/icons/duotune/general/gen016.svg',
    },
    {
        path: '/apps/mailbox/drafts',
        label: 'Drafts',
        image: 'assets/media/icons/duotune/general/gen028.svg',
    },
    {
        path: '/apps/mailbox/scheduled',
        label: 'Scheduled',
        image: 'assets/media/icons/duotune/general/gen013.svg',
    },
    {
        path: '/apps/mailbox/delivery',
        label: 'Delivery Report',
        image: 'assets/media/icons/duotune/communication/com010.svg',
    },
];

const Header: React.FC = () => {
  const location = useLocation();
  const {isLoading} = useView();

  return (
      <div className='card mb-5 mb-xl-10'>
          <div className='card-body pt-9 pb-0'>
              <div className="row justify-content-between">
                  {routes?.length>0 && routes.map((route:any, key:any)=> {
                      return <div key={key} className='col-xl-2 col-md-2 mb-5'>
                          {/* begin::Statistics Widget 5 */}
                          <Link to={route.path}
                                className={"card card-flush " + (location.pathname == route.path ? 'bg-primary' : 'bg-body-white') + " hoverable card-xl-stretch mb-xl-8"}>
                              {/* begin::Body */}
                              <div className="card-body text-center">
                                  <span className={"svg-icon " + (location.pathname == route.path ? 'svg-icon-white' : 'svg-icon-primary') + "  svg-icon-3x ms-n1"}>
                                    <SVG src={toAbsoluteUrl(route.image)}/>
                                  </span>
                                  <div className={(location.pathname == route.path ? 'text-white' : 'text-gray-900') + "  fw-bolder fs-2 mb-2"}>{route.label}</div>
                              </div>
                              {/* end::Body */}
                              {isLoading && <ListLoading/>}
                          </Link>
                      </div>
                  })}
              </div>
          </div>
      </div>
  )
};

export {Header}
