import { useState } from 'react'
import logo from '../assets/images/short-logo.svg'
import { useEffect } from 'react';
import { useReducer } from 'react';
import { useRef } from 'react';
import useIntersectionObserver from '../hooks/useObserver';

const menu = [
    {
        name: 'Firma',
        link: '#o-firmie'
    },
    {
        name: 'Oferta',
        link: '#oferta'
    },
    {
        name: 'FAQ',
        link: '#faq'
    },
    {
        name: 'Kontakt',
        link: '#kontakt'
    },
]

const Navbar = () => {
    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const menuVisibilityHandle = () => {
        const mButton = menuRef.current;
        const mMenu = mobileMenuRef.current;
        if (mButton.classList.contains("active")) {
            mButton.classList.remove("active");
        } else {
            mButton.classList.add("active");
        }
        if (mMenu.classList.contains("flex")) {
            mMenu.classList.remove("flex");
            mMenu.classList.add("hidden");
        } else {
            mMenu.classList.add("flex");
            mMenu.classList.remove("hidden");
        }
    };

    const handleResize = () => {
        if (window.innerWidth > 767) {
            mobileMenuRef.current.classList.add("hidden");
            mobileMenuRef.current.classList.remove("flex");
            menuRef.current.classList.remove("active");
        }
    };

    const scrollToSection = (e, hash) => {
        e.preventDefault();
        const element = document.getElementById(hash.slice(1));
        if (element) {
            const offset = 128;
            const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const [ref, isVisible] = useIntersectionObserver();

    return (
        <nav ref={ref} className={`fixed top-0 z-50 px-[128px] h-[120px] flex gap-[48px] items-center w-full max-xl:px-[92px] max-lg:px-[64px] max-sm:px-[32px] ${isScrolled && 'bg-[#00000040] backdrop-blur-[10px]'}`}>
            <img src={logo} alt="Skrócone logo firmy FEMA" className={`w-[74px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-top' : 'element-hidden-top'}`} />
            <ul className={`flex gap-[48px] items-center max-md:hidden`}>
                {menu.map((item, index) => (
                    <a href={item.link} key={index} onClick={(e) => scrollToSection(e, item.link)} className={`transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-top' : 'element-hidden-top'}`} style={{transitionDelay: index*200 + 'ms'}}><li>{item.name}</li></a>
                ))}
            </ul>

            <div
                ref={menuRef}
                onClick={menuVisibilityHandle}
                className='hidden max-md:flex hamburger-menu duration-500 w-14 h-14 bg-white fixed flex-col justify-between items-center py-4 px-3 right-[64px] top-[32px] z-70 max-sm:right-[32px]'
                // style={{ background: isScrolled && '#898989', top: isScrolled && '24px' }}
            >
                <span className={`w-8 h-1 bg-[#222222] duration-500 rounded-full`}></span>
                <span className={`w-8 h-1 bg-[#222222] duration-500 rounded-full`}></span>
                <span className={`w-8 h-1 bg-[#222222] duration-500 rounded-full`}></span>
            </div>

            <div ref={mobileMenuRef} className='menu-mobile fixed top-0 left-0 w-full h-dvh bg-[#000000c1] hidden backdrop-blur-[5px] flex-col gap-[32px] justify-center items-center z-60'>
                <ul className='flex gap-[48px] items-center flex-col text-[18px] xl:text-[17px] text-white'>
                    {menu.map((item, index) => (
                        <a href={item.link} onClick={(e) => {scrollToSection(e, item.link); menuVisibilityHandle()}} key={index}><li>{item.name}</li></a>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar