import React from 'react'
import homePhoto from '../assets/home-photo.png'

import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className='main-div'>

        <Navbar/>

        <div className='right-side' id="home-page">
            <div className='home-topText'>
                <span className='heading-txt'>Welcome to Bikini Bottom Creator!</span>
                <span className='desc-txt'>Create your own Bikini Bottom with select characters using this tool</span>
            </div>

            <div className="homePhoto-div">
                 <img src={homePhoto} alt="photo of. bikini bottom characters: Patrick, Squidward, & Spongebob" className='home-photo'/>
            </div>
        </div>

    </div>
  )
}
