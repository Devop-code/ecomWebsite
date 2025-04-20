import { MessageCircle, ThumbsUp } from 'lucide-react'
export const PopularBlog = () => {
    const blog =[
        {
            title:"My amazing Blog title 1",
            author:"Devop",
            like:142,
            comment:33
        },
        {
            title:"My amazing Blog title 2",
            author:"kamga",
            like:34,
            comment:23
        },
        {
            title:"My amazing Blog title 3",
            author:"Duval",
            like:189,
            comment:45
        },
        {
            title:"My amazing Blog title 4",
            author:"Davina",
            like:190,
            comment:97
        },
        {
            title:"My amazing Blog title 5",
            author:"Devero",
            like:10,
            comment:3
        }
    ]
  return (
    <div className='bg-white p-5 border w-[23rem] mt-4 ml-5 rounded'>
        <h2 className='text-xl font-bold mb-5'>Popular Blog</h2>
        <ul>
            {blog.map((blog , index)=>(
                <li key={index} className='flex justify-between items-center mb-4'>
                    <span className='font-bold mb-2 text-gray-600'>{blog.title}</span>
                    <span className='text-gray-600'>Published by {blog.author}</span>
                    <div className='flex items-center mt-2'>
                        <MessageCircle size={16}/>
                        <span className='text-gray-500 mr-5 ml-1'>{blog.comment}</span>
                        <ThumbsUp size={16}/>
                        <span className='text-gray-500 mr-5 ml-1'>{blog.like}</span>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  )
}
