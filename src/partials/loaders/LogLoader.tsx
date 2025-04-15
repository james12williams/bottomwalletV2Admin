/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton.tsx";
import clsx from "clsx";

type Props = {
  count?: number
}

const LogLoader: React.FC<Props> = ({count=1}) => {
  let holder = [];
  for (let i = 0; i < count; i++) {
    holder.push(i);
  }
  return (
      <>
        {holder.map(function (i){
          return <div key={'log_key_'+i} className='d-flex flex-stack py-4'>
            <div className='d-flex align-items-center me-2'>
                <span className={clsx('w-70px badge', 'me-4')}>
                  <CustomSkeleton {... {width:50, height:20}} />
                </span>

              <a href='#' className='text-gray-800 text-hover-primary fw-bold'>
                <CustomSkeleton {... {width:170, height:20}} />
              </a>

              <span className='badge badge-light fs-8'><CustomSkeleton {... {width:50, height:15}} /></span>
            </div>
          </div>
        })}
    </>
  )
}

export {LogLoader}
