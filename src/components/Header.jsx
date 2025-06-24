import bg1 from '../assets/images/bg-1.webp'
import logo from '../assets/images/logo.svg'
import bg2 from '../assets/images/bg-10.webp'
import bg3 from '../assets/images/bg-4.webp'
import bg4 from '../assets/images/bg-3.webp'
import bg5 from '../assets/images/bg-5.webp'
import { useState, useEffect } from 'react'
import useIntersectionObserver from '../hooks/useObserver'

const initialPhotos = [bg1, bg2, bg3, bg4, bg5]

const Header = () => {
  const [photos, setPhotos] = useState(initialPhotos)
  const [isAnimating, setIsAnimating] = useState(false)
  const [breakpoint, setBreakpoint] = useState('big')

  useEffect(() => {
    const mainInterval = setInterval(() => {
      setIsAnimating(true)
      const animationTimeout = setTimeout(() => {

        setPhotos(currentPhotos => {
          const last = currentPhotos[currentPhotos.length - 1];
          const rest = currentPhotos.slice(0, currentPhotos.length - 1);
          return [last, ...rest];
        })

        setIsAnimating(false)
      }, 1000)

      return () => clearTimeout(animationTimeout)
    }, 10000) // Pętla uruchamia się co 5 sekund

    return () => clearInterval(mainInterval)
  }, [])

  const [ref, isVisible] = useIntersectionObserver();

  const getBreakpoint = (width) => {
    if (width < 640) return 'sm';
    if (width < 768) return 'md';
    if (width < 1024) return 'lg';
    if (width < 1280) return 'xl';
    if (width < 1536) return '2xl';
    return 'big';
  };

  useEffect(() => {
    setBreakpoint(getBreakpoint(window.innerWidth))
    window.addEventListener('resize', setBreakpoint(getBreakpoint(window.innerWidth)))
  }, [])

  return (
    <header className='h-dvh w-full relative overflow-hidden flex px-[128px] max-xl:px-[92px] max-lg:px-[64px] max-sm:px-[32px]'>
      <img
        src={photos[0]}
        key={photos[0] + '-bg'}
        alt="Tło przedstawiające obraz dachu"
        className='absolute w-full h-full top-0 left-0 object-cover brightness-10 z-0 header-loading'
      />

      <div className='w-full h-[1px] bg-[#161616] absolute right-0 top-[22%] z-2 max-2xl:top-[25%]'></div>
      <div className='w-full h-[1px] bg-[#161616] absolute right-0 bottom-[22%] z-2 max-2xl:bottom-[25%]'></div>

      <section ref={ref} className='relative z-10 flex flex-col justify-center h-full w-[45%] gap-[64px] max-xl:gap-[32px] max-xl:w-[50%] max-lg:w-full max-lg:items-center'>
        <img src={logo} width={130} alt='Logo firmy fema' className={`max-2xl:w-[110px] max-md:w-[90px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '100ms' }} />
        <div className='max-lg:flex max-lg:flex-col max-lg:items-center'>
          <h1 className={`text-[40px] font-semibold max-2xl:text-[35px] max-xl:text-[30px] max-lg:text-center max-lg:max-w-[700px] max-sm:text-[20px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '200ms' }}>Pokrycia dachowe w Tarnowie i&nbsp;regionie – blacha na wymiar</h1>
          <p className={`text-[20px] font-light mt-[16px] max-2xl:text-[18px] max-xl:text-[16px] max-sm:text-[13px] max-lg:text-center transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '300ms' }}>Wykonujemy blachy na wymiar, systemy rynnowe, blachy II gatunku i akcesoria w regionie Tarnowskim </p>
        </div>
        <p className={`font-light text-[16px] max-xl:text-[14px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '400ms' }}>Na rynku od 1992 roku</p>
      </section>

      {photos.slice(1).map((photoSrc, index) => {
        const originalIndex = index + 1;
        return (
          <img key={photoSrc} src={photoSrc} alt="" className={`absolute w-[200px] h-[680px] object-cover rounded-[40px] top-[50%] translate-y-[-50%] z-10 max-2xl:w-[150px] max-2xl:h-[500px] max-2xl:rounded-[25px] max-xl:w-[100px] max-xl:h-[450px] max-xl:rounded-[20px] max-lg:w-[150px] max-lg:h-[100px] max-lg:top-auto max-lg:bottom-[40px] max-lg:translate-y-0 ${isAnimating && originalIndex === 4 ? 'animate-expand' : 'animate-slide'}`} style={{ right: ((breakpoint === 'big'? 232 : breakpoint === '2xl' ? 166 : breakpoint === 'xl' ? 112 : 166) * originalIndex) - (breakpoint === 'big'? 332 : breakpoint === '2xl' ? 241 : breakpoint === 'xl' ? 162 : breakpoint === 'lg' ? 241 : breakpoint === 'md' ? 407 : 573) }} />
        )
      })}
    </header>
  )
}

export default Header