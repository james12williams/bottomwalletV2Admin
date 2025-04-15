import React from 'react'
import {DynamicList} from "../../dynamic-module/dynamic-list/DynamicList";

type Props = {
    currentUserId?: string
}

const Transactions: React.FC<Props> = ({currentUserId}) => {
    return (
        <DynamicList apiPath={'users/'+currentUserId+'/transactions'} queryName={'user-transactions'} />
    )
};

export {Transactions}
