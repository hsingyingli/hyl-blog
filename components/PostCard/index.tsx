import React from "react";
import moment from 'moment';
import { Post } from "../../utils/types/post";

interface Props {
  post: Post
}

const PostCard: React.FC<Props> = ({ post }) => {
  const timeago = moment(post.updated_at).fromNow();
  return (
    <div className='max-w-xl w-full h-[200px] rounded-lg p-5 my-10 flex flex-col gap-2 shadow-white dark:text-white border-2 dark:border-gray-300 dark:hover:border-white hover:border-black border-gray-400'>
      <div className='flex gap-3 '>
        <img className='w-12 h-12' src={`https://avatars.dicebear.com/api/pixel-art/${post.owner_id}.svg`} />
        <div className='flex flex-col'>
          <div className='flex gap-3 divide-x-0 divide-gray-200 text-teal-500'>
            <p className='text-lg'>{post.category}</p>
            -
            <p className='text-lg'>{post.title}</p>
          </div>
          <div className='flex gap-3'>
            <p>{post.created_at.split("T")[0]}</p>
            <p>update:{timeago}</p>
          </div>
        </div>
      </div>
      <div className='overflow-clip'>
        {post.content}
      </div>
    </div>
  )
}

export default PostCard
