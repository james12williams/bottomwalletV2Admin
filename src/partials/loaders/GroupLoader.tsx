/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {WithChildren} from "../../_metronic/helpers";
import {CustomSkeleton} from "./CustomSkeleton.tsx";

type Props = {
  count?: number
  className?:string
}

const GroupLoader: React.FC<Props & WithChildren> = ({
  count=1, className='d-flex flex-stack',
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
              <button className={"btn btn-link pt-0 pb-0 fs-6 fw-bold text-gray-800 text-hover-primary"}>
                <CustomSkeleton height={20} width={150} />
              </button>
              <div className="badge badge-light-primary"><CustomSkeleton width={10} /></div>
          </div>
        })}
    </>
  )
}

export {GroupLoader}
