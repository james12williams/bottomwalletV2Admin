import React from 'react'

import {Account} from "./account/Account";
import {Content} from "../../../../_metronic/layout/components/content";
import {
    ChartsWidget1,
    FeedsWidget2,
    FeedsWidget3,
    FeedsWidget4,
    FeedsWidget5,
    FeedsWidget6, ListsWidget2, ListsWidget5
} from "../../../../_metronic/partials/widgets";

export function Overview() {
    return (
        <>
            <div className='row g-5 g-xxl-8'>
                <div className='col-xl-12'>
                    <Account/>
                </div>
            </div>
            <div className='row g-5 g-xxl-8'>
                <div className='col-xl-6'>
                    <FeedsWidget2 className='mb-5 mb-xxl-8' />

                    <FeedsWidget3 className='mb-5 mb-xxl-8' />

                    <FeedsWidget4 className='mb-5 mb-xxl-8' />

                    <FeedsWidget5 className='mb-5 mb-xxl-8' />

                    <FeedsWidget6 className='mb-5 mb-xxl-8' />
                </div>

                <div className='col-xl-6'>
                    <ChartsWidget1 className='mb-5 mb-xxl-8' />

                    <ListsWidget5 className='mb-5 mb-xxl-8' />

                    <ListsWidget2 className='mb-5 mb-xxl-8' />
                </div>
            </div>
        </>
    )
}
