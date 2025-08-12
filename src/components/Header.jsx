import React, { useEffect, useRef, useState, useMemo } from 'react'
import logo from '../assets/images/logo.svg'
import useIntersectionObserver from '../hooks/useObserver'

const thumbModules = import.meta.glob('../assets/images/*-thumb.webp', { as: 'url', eager: true })
const largeLoaders = import.meta.glob('../assets/images/*-lg.webp', { as: 'url' })

const MAX_CONCURRENT_PRELOADS = 2
const ROTATE_INTERVAL_MS = 10000
const ANIMATION_DURATION_MS = 1000

const Header = () => {
  
  const slides = useMemo(() => {
    const arr = Object.keys(thumbModules).map((thumbPath) => {
      const m = thumbPath.match(/\/([^\/]+)-thumb\.webp$/)
      if (!m) return null
      const base = m[1] 
      const largePath = thumbPath.replace('-thumb.webp', '-lg.webp')
      const largeLoader = largeLoaders[largePath] || null
      return {
        id: base,
        thumb: thumbModules[thumbPath],
        largeLoader 
      }
    }).filter(Boolean)

    
    arr.sort((a, b) => {
      const na = (a.id.match(/\d+/) || [0])[0]
      const nb = (b.id.match(/\d+/) || [0])[0]
      return Number(na) - Number(nb)
    })

    return arr
  }, [])

  const [order, setOrder] = useState(() => slides.map(s => s.id))
  const [isAnimating, setIsAnimating] = useState(false)
  const [loadedLarge, setLoadedLarge] = useState({}) 
  const [breakpoint, setBreakpoint] = useState('big')

  const [ref, isVisible] = useIntersectionObserver()

  const pendingQueueRef = useRef([]) 
  const activePreloadsRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    const getBreakpoint = (width) => {
      if (width < 640) return 'sm';
      if (width < 768) return 'md';
      if (width < 1024) return 'lg';
      if (width < 1280) return 'xl';
      if (width < 1536) return '2xl';
      return 'big';
    }
    const handler = () => setBreakpoint(getBreakpoint(window.innerWidth))
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const enqueueLoader = (id, loader) => {
    if (!loader || !id) return
    if (loadedLarge[id]) return

    if (pendingQueueRef.current.some(item => item.id === id)) return

    pendingQueueRef.current.push({ id, loader })
    processQueue()
  }

  const processQueue = () => {
    while (activePreloadsRef.current < MAX_CONCURRENT_PRELOADS && pendingQueueRef.current.length > 0) {
      const { id, loader } = pendingQueueRef.current.shift()
      activePreloadsRef.current += 1
      loader()
        .then(url => new Promise((res, rej) => {
          const img = new Image()
          img.decoding = 'async'
          img.src = url
          img.onload = () => res({ id, url })
          img.onerror = rej
        }))
        .then(({ id }) => {
          setLoadedLarge(prev => {
            if (prev[id]) return prev
            return { ...prev, [id]: true }
          })
        })
        .catch(() => {
          // ignorujemy błędy preloada
        })
        .finally(() => {
          activePreloadsRef.current -= 1
          setTimeout(processQueue, 150)
        })
    }
  }

  useEffect(() => {
    if (order.length === 0 || slides.length === 0) return
    const firstId = order[0]
    const slide = slides.find(s => s.id === firstId)
    if (slide && slide.largeLoader) {
      enqueueLoader(firstId, slide.largeLoader)
    }
  }, [slides])

  useEffect(() => {
    if (order.length === 0) return

    const tick = () => {
      setIsAnimating(true)

      const expandIndex = Math.min(4, order.length - 1)
      const expandId = order[expandIndex]
      if (expandId) {
        const expandSlide = slides.find(s => s.id === expandId)
        if (expandSlide && expandSlide.largeLoader && !loadedLarge[expandId]) {
          pendingQueueRef.current.unshift({ id: expandId, loader: expandSlide.largeLoader })
          processQueue()
        }
      }

      const nextMainId = expandId
      if (nextMainId) {
        const nextMainSlide = slides.find(s => s.id === nextMainId)
        if (nextMainSlide && nextMainSlide.largeLoader && !loadedLarge[nextMainId]) {
          enqueueLoader(nextMainId, nextMainSlide.largeLoader)
        }
      }

      const animationTimeout = setTimeout(() => {
        setOrder(current => {
          if (current.length === 0) return current
          const newArr = [...current]
          const last = newArr.pop()
          return [last, ...newArr]
        })
        setIsAnimating(false)
      }, ANIMATION_DURATION_MS)

      return () => clearTimeout(animationTimeout)
    }

    intervalRef.current = setInterval(tick, ROTATE_INTERVAL_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [order, slides, loadedLarge])

  useEffect(() => {
    if (!isVisible) return
    const next = order[1]
    const expandCandidate = order[Math.min(4, order.length - 1)]
    if (next) {
      const s = slides.find(sl => sl.id === next)
      if (s && s.largeLoader) enqueueLoader(next, s.largeLoader)
    }
    if (expandCandidate) {
      const s = slides.find(sl => sl.id === expandCandidate)
      if (s && s.largeLoader) enqueueLoader(expandCandidate, s.largeLoader)
    }
  }, [isVisible, order, slides])

  const getSrcForId = (id) => {
    const s = slides.find(sl => sl.id === id)
    if (!s) return ''
    return loadedLarge[id] && s.largeLoader ? undefined : s.thumb
  }

  const getLargeUrl = async (id) => {
    const s = slides.find(sl => sl.id === id)
    if (!s || !s.largeLoader) return null
    try {
      const url = await s.largeLoader()
      return url
    } catch {
      return null
    }
  }

  const largeUrlCacheRef = useRef({})

  useEffect(() => {
    const ids = Object.keys(loadedLarge).filter(k => loadedLarge[k] && !largeUrlCacheRef.current[k])
    if (ids.length === 0) return
    ids.forEach(async (id) => {
      const url = await getLargeUrl(id)
      if (url) {
        largeUrlCacheRef.current[id] = url
        setLoadedLarge(prev => ({ ...prev }))
      }
    })
  }, [loadedLarge])

  // Render
  if (slides.length === 0) return null

  return (
    <header className='h-dvh w-full relative overflow-hidden flex px-[128px] max-xl:px-[92px] max-lg:px-[64px] max-sm:px-[32px]'>
      <img
        src={ largeUrlCacheRef.current[order[0]] || slides.find(s => s.id === order[0]).thumb }
        key={ order[0] + '-bg' }
        alt="Blacha dachowa na wymiar w regionie Tarnowskim"
        className='absolute w-full h-full top-0 left-0 object-cover brightness-10 z-0 header-loading'
        decoding="async"
      />

      <div className='w-full h-[1px] bg-[#161616] absolute right-0 top-[22%] z-2 max-2xl:top-[25%]'></div>
      <div className='w-full h-[1px] bg-[#161616] absolute right-0 bottom-[22%] z-2 max-2xl:bottom-[25%]'></div>

      <section ref={ref} className='relative z-10 flex flex-col justify-center h-full w-[45%] gap-[64px] max-2xl:gap-[32px] max-xl:gap-[24px] max-xl:w-[50%] max-lg:w-full max-lg:items-center'>
        <img src={logo} width={130} alt='Fema pokrycia dachowe Tarnów' className={`max-2xl:w-[110px] max-xl:w-[100px] max-md:w-[90px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '100ms' }} />
        <div className='max-lg:flex max-lg:flex-col max-lg:items-center'>
          <h1 className={`text-[40px] font-semibold max-2xl:text-[30px] max-xl:text-[25px] max-lg:text-center max-lg:max-w-[700px] max-sm:text-[20px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '200ms' }}>Pokrycia dachowe w Tarnowie i&nbsp;regionie – blacha na wymiar</h1>
          <p className={`text-[20px] font-light mt-[16px] max-2xl:text-[18px] max-xl:text-[16px] max-sm:text-[13px] max-lg:text-center transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '300ms' }}>Wykonujemy blachy na wymiar, systemy rynnowe, blachy II gatunku i akcesoria w regionie Tarnowskim </p>
        </div>
        <p className={`font-light text-[16px] max-xl:text-[14px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} style={{ transitionDelay: '400ms' }}>Na rynku od 1992 roku</p>
      </section>

      {order.slice(1).map((id, idx) => {
        const s = slides.find(sl => sl.id === id)
        if (!s) return null
        const originalIndex = idx + 1
        const willExpand = isAnimating && originalIndex === 4
        if (willExpand && s.largeLoader && !loadedLarge[id]) {
          if (!pendingQueueRef.current.some(item => item.id === id)) {
            pendingQueueRef.current.unshift({ id, loader: s.largeLoader })
            processQueue()
          }
        }

        const styleRight = ((breakpoint === 'big' ? 232 : breakpoint === '2xl' ? 166 : breakpoint === 'xl' ? 112 : 166) * originalIndex) - (breakpoint === 'big' ? 332 : breakpoint === '2xl' ? 241 : breakpoint === 'xl' ? 162 : breakpoint === 'lg' ? 241 : breakpoint === 'md' ? 407 : 573)

        const thumbSrc = s.thumb
        const largeCached = largeUrlCacheRef.current[id]
        const srcToUse = largeCached ? largeCached : thumbSrc

        return (
          <img
            key={id}
            src={srcToUse}
            alt="Pokrycia dachowe"
            loading="lazy"
            decoding="async"
            className={`absolute w-[200px] h-[680px] object-cover rounded-[40px] top-[50%] translate-y-[-50%] z-10 max-2xl:w-[150px] max-2xl:h-[500px] max-2xl:rounded-[25px] max-xl:w-[100px] max-xl:h-[450px] max-xl:rounded-[20px] max-lg:w-[150px] max-lg:h-[100px] max-lg:top-auto max-lg:bottom-[40px] max-lg:translate-y-0 ${willExpand ? 'animate-expand' : 'animate-slide'}`}
            style={{ right: styleRight }}
          />
        )
      })}
    </header>
  )
}

export default Header
