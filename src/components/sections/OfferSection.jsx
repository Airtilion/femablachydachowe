import offer1 from '../../assets/images/bg-4.webp'
import offer2 from '../../assets/images/bg-8.webp'
import offer3 from '../../assets/images/bg-7.webp'
import offer4 from '../../assets/images/bg-2.webp'
import useIntersectionObserver from '../../hooks/useObserver'

const offer = [
    {
        name: 'Blacha na wymiar',
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
        ],
        image: offer1,
        alt: 'Zdjęcie przedstawiające pokrycie dachowe z blachy'
    },
    {
        name: 'Systemy rynnowe',
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
        ],
        image: offer2,
        alt: 'Zdjęcie przedstawiające systemy rynnowe'
    },
    {
        name: 'Blacha II kategorii',
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
        ],
        image: offer3,
        alt: 'Zdjęcie przedstawiające blachę drugiej kategorii'
    },
    {
        name: 'Akcesoria',
        description: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum diam eget nisi scelerisque interdum. Sed placerat nibh vel dignissim ornare. Aenean vestibulum convallis nunc et pharetra. Aliquam id ante urna. Praesent porta nunc metus, vel tincidunt libero laoreet non. Proin quis lacinia est, ac congue est. Praesent libero dolor, luctus at volutpat egestas, maximus sit amet nunc.',
        ],
        image: offer4,
        alt: 'Zdjęcie przedstawiające akcesoria do pokryć dachowych'
    }
]

const OfferSection = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section ref={ref} id="oferta" className='mt-[-96px] flex max-lg:flex-wrap max-sm:mt-[-32px]'>
            {offer.map((el, index) => (
                <article key={index} tabIndex="0" className={`h-[800px] flex-1 relative offer-tile p-[32px] flex flex-col justify-end group cursor-pointer max-xl:h-[600px] max-lg:w-[50%] max-lg:flex-auto max-md:w-full transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-top' : 'element-hidden-top'}`} style={{transitionDelay: index*200 + 'ms'}}>
                    <h2 className='text-[25px] font-semibold uppercase duration-500 max-2xl:text-[20px] max-xl:text-[18px]'>{el.name}</h2>
                    <div className='max-h-0 overflow-hidden transition-all duration-2000 ease-in-out group-hover:max-h-[836px] group-focus:max-h-[836px] group-hover:mt-[16px]'>
                        {el.description.map((el, index) => <p key={index} className='mt-[8px] max-2xl:text-[14px] max-2xl:font-light max-xl:text-[12px] max-lg:text-[14px] max-sm:text-[13px] max-xl:!mt-[2px]'>{el}</p>)}
                    </div>

                    <img src={el.image} alt="Tło" className='w-full h-full object-cover brightness-60 saturate-0 cursor-pointer absolute top-0 left-0 z-[-1] group-hover:brightness-20 group-hover:saturate-100 group-focus:brightness-20 group-focus:saturate-100 duration-2000' />
                </article>
            ))}
        </section>
    )
}

export default OfferSection