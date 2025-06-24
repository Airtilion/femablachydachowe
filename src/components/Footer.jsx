import { Icon } from '@iconify/react/dist/iconify.js'
import logoAirtilion from '../assets/images/airtilion-footer.svg'
import bg from '../assets/images/bg-1.webp'
import logo from '../assets/images/logo.svg'
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

const Footer = () => {
    const data = new Date();

    return (
        <footer className='relative py-[32px] flex flex-col gap-[32px]'>
            <section className='flex justify-between w-[1400px] mx-auto max-2xl:w-[1200px] max-xl:w-[960px] max-lg:w-[90%] max-lg:flex-col max-lg:gap-[32px]'>
                <article className='flex items-center gap-[64px] max-xl:flex-col max-xl:items-start max-xl:gap-[32px] max-lg:items-center'>
                    <img src={logo} alt="Logo firmy fema" className='h-[125px]'/>
                    <div>
                        <p className='text-[14px] mb-[8px] max-lg:text-center'>Zapraszamy do polubienia:</p>
                        <a href="https://www.facebook.com/profile.php?id=61576876537530" className='flex gap-[8px] group '>
                            <Icon icon="ic:baseline-facebook" width="24" height="24" className='text-white group-hover:text-[#A3886E] duration-500'/>
                            <p className='group-hover:text-[#A3886E] duration-500'>FEMA - blachy dachowe</p>
                        </a>
                    </div>
                </article>
                <article className='max-lg:flex max-lg:flex-col max-lg:items-center'>
                    <h2 className='text-[18px] font-bold mb-[8px] max-md:text-[16px]'>Nawigacja</h2>
                    <ul className='flex flex-col gap-[8px] max-lg:items-center'>{menu.map((el, index) => (
                        <li key={index}><a href={el.link} className='text-[16px] font-light max-md:text-[14px]'>{el.name}</a></li>
                    ))}</ul>
                </article>
                <article className='flex flex-col gap-[8px] max-lg:items-center'>
                    <h2 className='text-[18px] font-bold max-md:text-[16px] max-sm:text-center'>Dane firmy</h2>
                    <p className='text-[16px] font-light max-md:text-[14px] max-sm:text-center'>Wiesław Łapa - Firma Produkcyjno-Handlowa "FEMA"</p>
                    <p className='text-[16px] font-light max-md:text-[14px] max-sm:text-center'>Swarzów 49, 33-210 Swarzów</p>
                    <p className='text-[16px] font-light max-md:text-[14px] max-sm:text-center'>+48 782 082 219</p>
                </article>
            </section>

            <section className='flex justify-end items-center border-t-[1px] py-[16px] border-[#737373] w-[1400px] mx-auto relative max-2xl:w-[1200px] max-xl:w-[960px] max-xl:justify-between max-lg:w-[90%] max-md:flex-col max-md:gap-[16px]'>
                <p className='absolute left-[50%] top-[50%] translate-[-50%] max-xl:relative max-xl:translate-0 max-xl:top-auto max-xl:left-auto max-md:text-[14px]'>© 1992-{data.getFullYear()} FEMA Blachy Dachowe</p>
                <a href="https://airtilion.com" target="_blank" rel='noreferrer noopener' aria-label="Przejdź do strony Airtillion - projekt i wykonanie" className='flex justify-center items-center gap-[8px] duration-700 hover:scale-110 max-md:text-[12px]'>
                    <span>Projekt i wykonanie</span>
                    <img src={logoAirtilion} alt="Logo Airtilion - projekt i wykonanie" width="138" height="20" loading="lazy" className='fill-white text-white max-md:w-[100px]' />
                </a>
            </section>

            <div className='absolute inset-0 bg-[#1a1a1adc] backdrop-blur-[10px] z-[-1]'></div>
            <img src={bg} alt="Tło przedstawjające dach z blachodachówki na czarnym tle" className='w-full h-full object-cover absolute inset-0 z-[-2]'/>
        </footer>
    )
}

export default Footer