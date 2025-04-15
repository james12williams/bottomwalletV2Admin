/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {WithChildren} from "../../_metronic/helpers";
import {CardLoaderWidget} from "./CardLoaderWidget.tsx";
import {MorrisChartLoader} from "./MorrisChartLoader";

type Props = {
  count?: number
}

const DashboardLoader: React.FC<Props & WithChildren> = ({count=1, children}) => {
  return (
    <>
        <div className="row">
          <CardLoaderWidget count={count}/>
        </div>
        <div className='row gy-5 gx-xl-8 mb-5'>
          <div className='col-xl-8'>
            <MorrisChartLoader />
          </div>
          <div className='col-xl-4'>
              <MorrisChartLoader />
          </div>
        </div>

        {children}
    </>
  )
}

export {DashboardLoader}
