import React from 'react'

import {MorrisChart} from "../../../components/Chart";
import {useUserView} from "../UserViewProvider.tsx";

export function Overview() {
    const {currentUserId} = useUserView();
    return (
        <>
            {/*begin::Row*/}
            <div className="row g-5 g-xxl-8">
                {/*begin::Col*/}
                <div className="col-xl-6">
                    {/*begin::Charts Widget*/}
                    <MorrisChart className='mb-xl-8' chartHeight={'350px'} data={{
                        path: 'dashboard/post-chart/'+currentUserId
                    }}/>
                </div>
                {/*begin::Col*/}
                <div className="col-xl-6">
                    {/*begin::Charts Widget*/}
                    <MorrisChart className='mb-xl-8' chartHeight={'350px'} data={{
                        path: 'dashboard/comment-chart/'+currentUserId
                    }}/>
                </div>
                {/*end::Col*/}
            </div>
            {/**/}
            {/*end::Row*/}
        </>
    )
}
