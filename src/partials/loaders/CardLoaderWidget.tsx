/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {WithChildren} from "../../_metronic/helpers";
import {CustomSkeleton} from "./CustomSkeleton.tsx";

type Props = {
  count?: number
  className?:string
  description?:boolean
}

const CardLoaderWidget: React.FC<Props & WithChildren> = ({
  count=1, className='col-xl-3 mb-5',
  description=true,
  children
}) => {
  let holder = [];
  for (let i = 0; i < count; i++) {
    holder.push(i);
  }
  return (
      <>
        {holder.map(function (i){
          return <div key={'key_'+i} className={`${className}`}>
            {/* begin::Statistics Widget 5 */}
            <div className={"card card-flush hoverable card-xl-stretch mb-xl-8"}>
              {/* begin::Body */}
              <div className="card-body">
          <span className={"svg-icon svg-icon-3x ms-n1"}>
            <CustomSkeleton {... { circle:true, width:40, height:40}} />
          </span>
                {/* end::Svg Icon */}
                <div className={"fw-bolder fs-2 mb-2 mt-5"}><CustomSkeleton /></div>
                {description && <div className={"fw-bold "}><CustomSkeleton /></div>}
                {children}
              </div>
              {/* end::Body */}
            </div>
            {/* end::Statistics Widget 5 */}
          </div>
        })}
    </>
  )
}

export {CardLoaderWidget}
