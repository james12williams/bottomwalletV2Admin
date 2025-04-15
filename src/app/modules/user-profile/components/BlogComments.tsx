import React from 'react'
import {DynamicList} from "../../dynamic-module/dynamic-list/DynamicList";

type Props = {
    currentUserId?: string
}

const BlogComments: React.FC<Props> = ({currentUserId}) => {
    return (
        <DynamicList apiPath={'users/'+currentUserId+'/comments'} queryName={'user-comments'} />
    )
};

export {BlogComments}
