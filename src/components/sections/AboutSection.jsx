import sectionBg from '../../assets/images/bg-6.webp'
import useIntersectionObserver from '../../hooks/useObserver';

const about = [
    {
        title: 'Nasza lokalizacja',
        description: 'Jesteśmy firmą z regionu Tarnowskiego, a konkretniej ze Swarzowa niedaleko Dąbrowy Tarnowskiej.'
    },
    {
        title: 'Od kiedy działamy',
        description: 'Nasza działalność rozpoczęła się w 1992 roku i od tamtej pory nieprzerwanie rozwijamy produkcję wysokiej jakości pokryć dachowych'
    },
    {
        title: 'Gdzie działamy?',
        description: 'Nasze pokrycia dachowe trafiają nie tylko do rodzin z Tarnowa i Dąbrowy Tarnowskiej oraz innych miejscowości Małopolski i Podkarpacia, lecz również do klientów z całej Polski.'
    },
    {
        title: 'Co nas wyróżnia?',
        description: 'Wyróżnia nas precyzja wykonania każdego elementu oraz elastyczne podejście do indywidualnych potrzeb.'
    },
]

const AboutSection = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const [ref2, isVisible2] = useIntersectionObserver();

    return (
        <section className='py-[48px] bg-[#1A1A1A]'>
            <article className='w-[1400px] mx-auto max-2xl:w-[1140px] max-xl:w-[960px] max-lg:w-[90%]'>
                <div ref={ref2} className={`relative p-[32px] overflow-hidden flex flex-col gap-[16px] shadow-[4px_4px_20px_#00000040] transition-all duration-1000 ease-in-out ${isVisible2 ? 'element-visible-bottom' : 'element-hidden-bottom'}`}>
                    <h2 className='relative z-30 text-[24px] font-semibold max-xl:text-[22px] max-lg:text-[20px]'>Firma z tradycją - działamy nieprzerwanie od 1992 roku</h2>
                    <p className='relative z-30 text-[16px] font-light w-[660px] max-xl:text-[14px] max-lg:w-[90%]'>Dzięki wieloletniemu doświadczeniu oraz zaangażowaniu w nieustanny rozwój procesów produkcyjnych, zyskaliśmy zaufanie setek klientów – zarówno właścicieli małych domów jednorodzinnych, jak i większych inwestorów budowlanych. </p>

                    <div className='absolute top-0 left-0 w-full h-full bg-linear-to-r from-[#000000] to-[#00000000] z-20'></div>
                    <img src={sectionBg} alt="Czarne stalowe płotki śniegowe montowane na profiliwanej blachodachówce - zabezpieczenie dachu przed zsuwaniem się śniegu" className='w-full h-full object-cover object-center absolute top-0 left-0 z-10' />
                </div>

                <div className='flex gap-[32px] mt-[32px] max-lg:flex-wrap w-full'>
                    {about.map((el, index) => (
                        <div ref={ref} className={`flex-1 max-lg:flex-grow-0 max-lg:flex-shrink-0 max-lg:basis-auto max-lg:w-[45%] max-sm:w-full transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-top' : 'element-hidden-top'}`} style={{ transitionDelay: index * 200 + 'ms' }} key={index}>
                            <h3 className='text-[20px] font-semibold max-xl:text-[18px] max-sm:text-[16px]'>{el.title}</h3>
                            <p className='text-[14px] font-light mt-[16px] max-xl:text-[13px] max-sm:mt-[8px]'>{el.description}</p>
                        </div>
                    ))}
                </div>
            </article>
        </section>
    )
}

export default AboutSection