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
    <div className='bg-white p-5 mt-[5rem] border w-[23rem] rounded'>
        <h2 className='text-xl font-bold mb-5'>Top Sellers</h2>
        <ul>
            {authors.map((author , index)=>(
               <li key={index} className='flex items-center justify-between mb-4'>
                  <section className='flex justify-between items-center'>
                    <img src={author.image} alt={author.name} className='w-12 h-12 object-cover rounded-full'/>
                    <span className='ml-4'>{author.name}</span>
                   <div className=' row-auto items-center flex-col'>
                   <button onClick={()=>handleFollow(index)} className={`py-1 cursor-pointer px-3 rounded ml-15 ${author.isFollowing ? "bg-red-500 text-white":"bg-black text-white"} `}>{author.isFollowing ? 'UnFollow':'Follow'}</button>
                   </div>
                  </section>
               </li>
            ))}
        </ul>
    </div>
  )
}