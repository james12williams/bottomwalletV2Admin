import React from 'react'
import DynamicPage from "../../dynamic-module/DynamicPage";

export function Sent() {
    return (
        <div className='row g-5 g-xxl-8'>
            <div className='col-xl-12'>
                <DynamicPage path='mail-deliveries'
                             entityName='Sent Mail'
                             entityNamePlural='Sent Mails'
                             base='/apps/dashboard'
                             baseTitle='Dashboard'
                             queryName='mail-delivery-list' />
            </div>
        </div>
    )
}
