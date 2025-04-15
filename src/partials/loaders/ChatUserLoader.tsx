/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {timeAgo, WithChildren} from "../../_metronic/helpers";
import {CustomSkeleton} from "./CustomSkeleton.tsx";

type Props = {
  count?: number
  className?:string
  description?:boolean
}

const ChatUserLoader: React.FC<Props & WithChildren> = ({
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
          return <div key={'key_'+i} className={"d-flex flex-stack py-4 "}>

              {/*begin::Details*/}
              <div className="d-flex align-items-center">
                {/*begin::Avatar*/}
                <div className="symbol">
                  <CustomSkeleton className="fs-6" circle={true} width={40} height={40} />
                  <div className="symbol-badge bg-secondary start-100 top-100 border-4 h-15px w-15px ms-n2 mt-n2"></div>
                </div>
                {/*end::Avatar*/}
                {/*begin::Details*/}
                <div className="ms-4">
                  <span className="fs-6 fw-bold text-gray-900 text-hover-primary mb-2"><CustomSkeleton width={90} /></span>
                  <div className="fw-semibold fs-7 text-muted"><CustomSkeleton width={150} /></div>
                </div>
                {/*end::Details*/}
              </div>
            <div className='d-flex flex-column align-items-end ms-2'>
              <span className='text-muted fs-7 mb-1'><CustomSkeleton width={50} /></span>
              <span className='text-success'><CustomSkeleton width={10} /></span>
            </div>
              {/*end::Details*/}
          </div>
        })}
    </>
  )
}

export {ChatUserLoader}
