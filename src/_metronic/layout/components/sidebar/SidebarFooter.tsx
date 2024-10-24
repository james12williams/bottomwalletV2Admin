
import {ActionButton} from "../../../../partials/buttons/ActionButton.tsx";

const SidebarFooter = () => {
  return (
    <div className='app-sidebar-footer flex-column-auto pt-2 pb-6 px-6' id='kt_app_sidebar_footer'>
        <ActionButton endpoint='actions/clear-cache'
                      label='Clear Cache'
                      iconPath='/assets/media/icons/duotune/general/gen005.svg'
                      className='btn btn-custom btn-primary w-100'
                      title='Clear cache and update' />
    </div>
  )
}

export {SidebarFooter}
