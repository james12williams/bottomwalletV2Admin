import React from 'react'
import {DynamicList} from "../../dynamic-module/dynamic-list/DynamicList";

type Props = {
    currentUserId?: string
}

const BlogPosts: React.FC<Props> = ({currentUserId}) => {
    return (
        <DynamicList apiPath={'users/'+currentUserId+'/blog-posts'} queryName={'user-blog-posts'} />
    )
};

export {BlogPosts}
