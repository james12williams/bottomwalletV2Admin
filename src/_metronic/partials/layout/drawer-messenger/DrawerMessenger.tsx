
import {FC} from 'react'
import {KTIcon} from '../../../helpers'
import {usePageData} from "../../../layout/core";
import {Link} from "react-router-dom";

const DrawerMessenger: FC = () => {
  const {currentChatMain, showMessageDrawer} = usePageData();
  return (<div
      id='kt_drawer_chat'
      className='bg-body drawer drawer-end drawer-on'
      data-kt-drawer='true'
      data-kt-drawer-name='chat'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'300px', 'md': '500px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_drawer_chat_toggle'
      data-kt-drawer-close='#kt_drawer_chat_close'
      style={{width: "900px !important"}}
  >
    <div className='card w-100 rounded-0' id='kt_drawer_chat_messenger'>
      <div className='card-header pe-5' id='kt_drawer_chat_messenger_header'>
        <div className='card-title'>
          <div className='d-flex justify-content-center flex-column me-3'>
            <Link to={'/apps/chat/'+currentChatMain?.uid} className='fs-4 fw-bolder text-gray-900 text-hover-primary me-1 mb-2 lh-1'>
              {currentChatMain?.profile?.name}
            </Link>

            {currentChatMain?.profile?.is_online && <div className='mb-0 lh-1'>
              <span className='badge badge-success badge-circle w-10px h-10px me-1'></span>
              <span className='fs-7 fw-bold text-gray-500'>Active</span>
            </div>}
          </div>
        </div>

        <div className='card-toolbar'>
          <div className='me-2'>
            <button className='btn btn-sm btn-icon btn-active-light-primary'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
                data-kt-menu-flip='top-end'>
              <i className='bi bi-three-dots fs-3'></i>
            </button>
          </div>

          <div className='btn btn-sm btn-icon btn-active-light-primary' id='kt_drawer_chat_close'>
            <KTIcon iconName='cross' className='fs-2'/>
          </div>
        </div>
      </div>


    </div>
  </div>)
}

export {DrawerMessenger}
