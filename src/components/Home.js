import React, { useEffect, useRef, useState } from 'react'
import SimmerMeme from './SimmerMeme'
import MemeCard from './MemeCard'

const Home = () => {
  console.log("called#########")
    const [meme, setMeme] = useState([])
    const [showShimmer,setShowShimmer] = useState(false)
    const fetchCalled = useRef(false); // Ref to track if fetchMeme is called

    useEffect(() => {
      if (!fetchCalled.current) {
        fetchCalled.current = true; // Set it to true after the first call
        fetchMeme();
      }
      window.addEventListener('scroll', handleScroll);
    
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  
      const handleScroll = () => {
        if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
            fetchMeme();
        }
    };
    
    
    const fetchMeme = async() => {
        setShowShimmer(true)
        const data = await fetch('https://meme-api.com/gimme/20')
        const res = await data.json()
        setShowShimmer(false)
        setMeme((prev) => [...prev,...res.memes])
    }
    console.log(meme?.length,"length####")
  return (
    <div className='flex flex-wrap'>
      { meme?.map((item,index) => (
        <MemeCard key={index} data={item} />
      ))}
      {showShimmer && <SimmerMeme />}
    </div>
  )
}

export default Home
