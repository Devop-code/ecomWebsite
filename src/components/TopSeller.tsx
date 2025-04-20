import { useEffect, useState } from 'react'

interface Author {
    name: string;
    isFollowing: boolean;
    image : string
  }

// Sample data for testing
const sampleAuthors: Author[] = [
    {
        name: 'John Doe',
        isFollowing: false,
        image: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg'
    },
    {
        name: 'Jane Smith',
        isFollowing: false,
        image: 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg'
    },
    {
        name: 'Mike Johnson',
        isFollowing: true,
        image: 'https://xsgames.co/randomusers/assets/avatars/male/3.jpg'
    },
    {
        name: 'Sarah Wilson',
        isFollowing: false,
        image: 'https://xsgames.co/randomusers/assets/avatars/female/4.jpg'
    },
    {
        name: 'David Brown',
        isFollowing: true,
        image: 'https://xsgames.co/randomusers/assets/avatars/male/5.jpg'
    }
];

export const TopSeller = () => {
    const [authors, setAuthor] = useState<Author[]>(sampleAuthors)
    useEffect(() => {
        // Initialize with sample data
        setAuthor(sampleAuthors)
    },[])
    const handleFollow =(index : number)=>{
         setAuthor(prevAuthor => prevAuthor.map((author,i)=> i === index ?{...author,isFollowing:!author.isFollowing}:author)
    )}
  return (
    <div className='bg-white rounded-lg shadow-sm p-6 w-[320px]'>
        <h2 className='text-xl font-bold text-gray-900 mb-6 flex items-center'>
          <span className='bg-blue-100 p-2 rounded-lg mr-3'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </span>
          Top Sellers
        </h2>
        <ul className='space-y-4'>
            {authors.map((author, index) => (
               <li key={index} className='flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
                  <div className='flex items-center flex-1'>
                    <div className='relative'>
                      <img 
                        src={author.image} 
                        alt={author.name} 
                        className='w-12 h-12 object-cover rounded-full ring-2 ring-gray-100'
                      />
                      <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full'></span>
                    </div>
                    <div className='ml-4'>
                      <h3 className='font-medium text-gray-900'>{author.name}</h3>
                      <p className='text-sm text-gray-500'>Active now</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleFollow(index)} 
                    className={`ml-4 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      author.isFollowing 
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {author.isFollowing ? 'Following' : 'Follow'}
                  </button>
               </li>
            ))}
        </ul>
    </div>
  )
}