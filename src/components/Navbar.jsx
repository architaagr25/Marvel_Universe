import React, { useEffect, useRef, useState } from 'react';
import { TiLocationArrow } from "react-icons/ti"; 
import Button from "./Button"; 
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const navitems = ['Series', 'Adaptations', 'Cast', 'Assemble', 'Contact'];

const Navbar = () => {

    const [isaudioplaying, setisaudioplaying] = useState(false);
    const [isindicatoractive, setisindicatoractive] = useState(false);

    const[lastScrollY, setLastScrollY] = useState(0);
    const[isNavVisible, setIsNavVisible] = useState(true);

    const navcontainerref = useRef(null);
    const audioelementref = useRef(null);

    {/*for current y scroll property*/}
    const {y : currentScrollY} = useWindowScroll();

    useEffect( () => {
        if(currentScrollY === 0){
            setIsNavVisible(true);
            navcontainerref.current.classList.remove('floating-nav'); {/*removes the black background for navbar when it is at top*/}
        } 
        else if(currentScrollY > lastScrollY){ {/*this means user is just scrolling down */}
            setIsNavVisible(false);
            navcontainerref.current.classList.add('floating-nav');
        }
        else if(currentScrollY < lastScrollY){ {/*user is scrolling up*/}
        setIsNavVisible(true);
        navcontainerref.current.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY);  {/*this monitors and updates the last scroll*/}
    }, [currentScrollY, lastScrollY])

{/*use effect which changes whenever visibilty of navbar changes*/}

    useEffect(() => {
        gsap.to(navcontainerref.current, {
          y: isNavVisible ? 0 : -100,
           opacity: isNavVisible ? 1 : 0,
           duration: 0.2,

        })
    }, [isNavVisible])


    {/*function for audio playing*/}
    const toggleaudioindicator = () => {
        setisaudioplaying((prev) => !prev);
        setisindicatoractive((prev) => !prev);
    } 

    {/*use effect for audio*/}
    useEffect( () => {
        if(isaudioplaying ) {
            audioelementref.current.play();
        }
        else{
            audioelementref.current.pause();
        }
    }, [isaudioplaying])

  return (
    <div ref={navcontainerref} className='fixed inset-x-0 top-4 z-50 h-16
    border-none transition-all duration-700 sm:inset-x-6'> {/*inset-x defines left and right positioning*/}

    <header className='absolute top-1/2 w-full -translate-y-1/2'>

    <nav className='flex size-full items-center
    justify-between p-4'>

{/*left side of navbar*/}
        <div className='flex items-center gap-7'>
    <img src="https://res.cloudinary.com/dqbhvzioe/image/upload/v1744102878/logo_acef5r.png" alt="logo" className='w-10'/>
    <Button
    id="product-button"
    title="Products"
    rightIcon={<TiLocationArrow/>}
    containerClass="bg-yellow-300 md:flex hidden
    items-center justify-center gap-1"/>
        </div>

    {/*for items in navbar*/}
        <div className='flex h-full items-center'>
            <div className='hidden md:block'>
                {navitems.map((item) => (
                    <a key={item}  href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                        {item}
                    </a>
                ))}
            </div>

                {/*button for music*/}
            <button className='ml-10 flex items-center
            space-x-0.5' onClick={toggleaudioindicator}>
                <audio ref={audioelementref}
                       className='hidden'
                       src='/audio/loop.mp3'
                       loop/>
                        
                        {/*showing line bars for audio animation*/}
                        {[1,2,3,4].map((bar) => (
                           <div key={bar} className={`indicator-line ${isindicatoractive ? 'active' : ''}`}
                           style={{animationDelay: `${bar * 0.1}s`}}/>

                        ))}
            </button>
        </div>
    </nav>

    </header>

    </div>
  );
};

export default Navbar