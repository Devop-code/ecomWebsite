import { MessageCircle, ThumbsUp, TrendingUp } from 'lucide-react'

interface BlogPost {
  title: string;
  author: string;
  like: number;
  comment: number;
}

export const PopularBlog = () => {
    const blog: BlogPost[] = [
        {
            title: "10 Essential Tips for Modern Web Development",
            author: "Devop",
            like: 142,
            comment: 33
        },
        {
            title: "The Future of AI in Software Engineering",
            author: "Kamga",
            like: 34,
            comment: 23
        },
        {
            title: "Best Practices for React Performance",
            author: "Duval",
            like: 189,
            comment: 45
        },
        {
            title: "Understanding TypeScript's Advanced Features",
            author: "Davina",
            like: 190,
            comment: 97
        },
        {
            title: "Building Scalable Frontend Architecture",
            author: "Devero",
            like: 10,
            comment: 3
        }
    ]

    return (
        <div className='bg-white rounded-lg shadow-sm p-6 w-[320px] mt-6'>
            <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center'>
                <span className='bg-blue-100 p-2 rounded-lg mr-3'>
                    <TrendingUp className='h-5 w-5 text-blue-600' />
                </span>
                Popular Blogs
            </h2>
            <ul className='space-y-6'>
                {blog.map((post, index) => (
                    <li 
                        key={index} 
                        className='group p-3 rounded-lg hover:bg-gray-50 transition-all duration-200'
                    >
                        <h3 className='font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200'>
                            {post.title}
                        </h3>
                        <div className='flex items-center justify-between text-sm'>
                            <span className='text-gray-500 flex items-center'>
                                <span className='inline-block w-2 h-2 bg-green-400 rounded-full mr-2'></span>
                                {post.author}
                            </span>
                            <div className='flex items-center space-x-4'>
                                <div className='flex items-center text-gray-400 hover:text-gray-600'>
                                    <MessageCircle size={14} className='mr-1'/>
                                    <span>{post.comment}</span>
                                </div>
                                <div className='flex items-center text-gray-400 hover:text-gray-600'>
                                    <ThumbsUp size={14} className='mr-1'/>
                                    <span>{post.like}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
