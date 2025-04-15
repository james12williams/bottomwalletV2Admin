/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton.tsx";

const FeedTextBoxLoader: React.FC = () => {
  return (
      <>
        {/* begin::Header */}
        <div className='d-flex align-items-center mb-3'>
          {/* begin::User */}
          <div className='d-flex align-items-center flex-grow-1'>
            {/* begin::Avatar */}
            <div className='symbol symbol-45px me-5'>
              <CustomSkeleton circle={true} width={50} height={50} />
            </div>
            {/* end::Avatar */}

            {/* begin::Info */}
            <div className='d-flex flex-column'>
              <CustomSkeleton height={30} width={200} />
              <span className='text-gray-500 fw-semibold'><CustomSkeleton width={100} /></span>
            </div>
            {/* end::Info */}
          </div>
          {/* end::User */}
        </div>
        {/* end::Header */}

        {/* begin::Post */}
        <div className='mb-7'>
          {/* begin::Text */}
          <div className='text-gray-800 mb-5'>
            <CustomSkeleton height={50} />
          </div>
          {/* begin::Toolbar */}
          <div className="ql-toolbar row py-2">
            <div className="col-sm-10">
              <CustomSkeleton className='w-100' height={30} />
            </div>
            <div className="col-sm-2">

              <button className={'btn btn-sm btn-light btn-color-muted px-4 py-2 '}>
                <CustomSkeleton  width={50} height={20} />
              </button>
            </div>
          </div>
          {/* end::Toolbar */}
        </div>
        {/* end::Post */}
    </>
  )
}

export {FeedTextBoxLoader}
