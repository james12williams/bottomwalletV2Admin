/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton.tsx";

type Props = {
  count?: number
}

const ChatLoader: React.FC<Props> = ({count=1}) => {
  let holder = [];
  for (let i = 0; i < count; i++) {
    holder.push(i);
  }
  return (
      <>
        {holder.map(function (i){
          return <div key={'key_'+i}>
            <div className="d-flex d-flex justify-content-end mb-10 mb-10">
              <div className="d-flex flex-column align-items align-items-end">
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3">
                    <span className="text-muted fs-7 mb-1"><CustomSkeleton {... {width:150,height:20}} /></span>
                    <span className="a fs-5 fw-bolder text-gray-900 text-hover-primary">
                      <CustomSkeleton {... {width:150,height:15}} />
                    </span>
                  </div>
                  <div className="symbol  symbol-35px symbol-circle ">
                    <CustomSkeleton  {... {width:50,height:50,circle:true}} />
                  </div>
                </div>
                <div className="rounded text-gray-900 fw-bold mw-lg-400px text-end"
                     data-kt-element="message-text">
                  <CustomSkeleton {... {width:350, height:50}} />
                  <CustomSkeleton {... {width:100, height:15}} />
                </div>
              </div>
            </div>
            <div className="d-flex d-flex justify-content-start mb-10 mb-10">
              <div className="d-flex flex-column align-items align-items-start">
                <div className="d-flex align-items-center mb-2">
                  <div className="symbol  symbol-35px symbol-circle ">
                    <CustomSkeleton {... {width:50,height:50,circle:true}} />
                  </div>
                  <div className="ms-3">
                    <span className="fs-5 fw-bolder text-gray-900 text-hover-primary me-1">
                      <CustomSkeleton {... {width:150,height:20}} />
                    </span>
                    <span className="text-muted fs-7 mb-1">
                      <CustomSkeleton {... {width:150,height:15}} />
                    </span></div>
                </div>
                <div className="rounded text-gray-900 fw-bold mw-lg-400px text-start">
                  <CustomSkeleton {... {width:350, height:50}} />
                  <CustomSkeleton {... {width:100, height:15}} />
                </div>
              </div>
            </div>
          </div>
        })}
    </>
  )
}

export {ChatLoader}
