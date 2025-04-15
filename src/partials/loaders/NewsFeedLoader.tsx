/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import {CustomSkeleton} from "./CustomSkeleton.tsx";

type Props = {
  count?: number
  className?:string
}

const NewsFeedLoader: React.FC<Props> = ({count=1, className='card mb-5 mb-xl-8',}) => {
  let holder = [];
  for (let i = 0; i < count; i++) {
    holder.push(i);
  }
  return (
      <>
        {holder.map(function (i){
          return <div key={'key_'+i} className={`${className}`}>
            {/* begin::Body */}
            <div className='card-body pb-0'>
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
                    <CustomSkeleton width={200} />
                    <span className='text-gray-500 fw-semibold'><CustomSkeleton width={100} /></span>
                  </div>
                  {/* end::Info */}
                </div>
                {/* end::User */}

                {/* begin::Menu */}
                <div className='my-0'>
                  <button
                      type='button'
                      className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      data-kt-menu-flip='top-end'
                  >
                    <CustomSkeleton width={30} height={30} />
                  </button>
                </div>
                {/* end::Menu */}
              </div>
              {/* end::Header */}

              {/* begin::Post */}
              <div className='mb-7'>
                {/* begin::Text */}
                <div className='text-gray-800 mb-5'>
                  <CustomSkeleton height={50} />
                  <CustomSkeleton height={15} width={100} />
                </div>
                {/* begin::Toolbar */}
                <div className='d-flex align-items-center mb-5'>
                  <button className={'btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4 '}>
                    <CustomSkeleton  width={50} height={20} />
                  </button>

                  <button className={'btn btn-sm btn-light btn-color-muted btn-active-light-danger px-4 py-2 '}>
                    <CustomSkeleton  width={50} height={20} />
                  </button>
                </div>
                {/* end::Toolbar */}
              </div>
              {/* end::Post */}
            </div>
            {/* end::Body */}
          </div>
        })}
    </>
  )
}

export {NewsFeedLoader}
