import React, { useMemo } from 'react'
import usePost from '../../hooks/usePost'
import useTheme from '../../hooks/useTheme'
import { Post, Posts } from '../../utils/types/post'

interface Props {
  posts: Posts | null
}

const Drawer: React.FC<Props> = ({ posts }) => {
  const { theme } = useTheme()
  const { post, selectPost } = usePost()
  const category = useMemo(() => {
    if (posts) {
      const groupByCategory = posts.reduce((group, post) => {
        const { category } = post;
        group[category] = group[category] ?? [];
        group[category].push(post);
        return group;
      }, {});
      return groupByCategory
    }
    return {}
  }, [posts])

  return (
    <div className='h-[calc(100vh_-_88px)] w-[300px] py-3 px-2 divide-y-[1px] divide-gray-100 flex flex-col gap-5 overflow-auto fixed'>
      <a href='/posts/edit' className='w-full inline-block p-2 text-center text-lg bg-teal-500 rounded-lg text-white hover:text-gray-100 hover:bg-teal-400 duration-500'>Create Post</a>
      <div className=''>
        {Object.entries(category).map((data) => {
          const key = data[0]
          const value = data[1] as Posts
          return (
            <div key={key} className='mb-1 p-2'>
              <p className='text-2xl mb-2 text-teal-500'>{key}</p>
              <ul>
                {value.map((v) => {
                  const isActive = v.id === post?.id
                  const textColor = theme === 'dark' ? 'white' : 'rgb(156, 163, 175)'
                  return (
                    <li
                      onClick={() => selectPost(v)}
                      key={v.id}
                      style={{ color: isActive ? textColor : '' }}
                      className='cursor-pointer my-3 hover:text-gray-400 dark:text-gray-400 dark:hover:text-white'>
                      {v.title}
                    </li>)
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Drawer
