import { Icon } from '@iconify/react/dist/iconify.js';
import roofImage from '../../assets/images/bg-2.webp'
import useIntersectionObserver from '../../hooks/useObserver';

const simpleList = ['Blacha na wymiar', 'Systemy rynnowe', 'Blacha II gatunku', 'Akcesoria'];

const HistorySection = () => {
    const [ref, isVisible] = useIntersectionObserver();
    const [ref2, isVisible2] = useIntersectionObserver();
  return (
    <section>
        <article id="o-firmie" className='w-[1400px] mx-auto flex gap-[32px] justify-between items-end max-2xl:w-[1140px] max-xl:w-[960px] max-lg:w-[90%] max-lg:flex-col'>
            <div ref={ref} className={`w-[780px] flex flex-col gap-[32px] max-2xl:w-[500px] max-lg:w-full transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`}>
                <h2 className='text-[30px] font-semibold max-2xl:text-[25px] max-xl:text-[22px] max-lg:text-[20px]'>Tradycja i nowoczesność w produkcji blach&nbsp;dachowych</h2>
                <img src={roofImage} alt="Pokrycie dachowe z czarnej blachodachówki oraz łapami śniegowymi - nowoczesność z funkcjonalnością" className='h-[375px] object-cover w-full shadow-[4px_4px_20px_#00000040] max-xl:h-[425px] max-lg:h-[300px]'/>
            </div>

            <div ref={ref2} className={`flex-1 transition-all duration-1000 ease-in-out ${isVisible2 ? 'element-visible-right' : 'element-hidden-right'}`}>
                <div className='bg-[#1A1A1A] py-[32px] px-[32px] max-sm:px-[16px]'>
                    <p className='text-[16px] font-light max-xl:text-[14px]'>Od początku istnienia firmy priorytetem było dla nas połączenie tradycyjnych umiejętności blacharskich z nowoczesnymi technologiami obróbki metalu. Dzięki temu nasze systemy rynnowe i akcesoria dachowe cechują się nie tylko doskonałą trwałością, ale także estetyką wykończenia, spełniając oczekiwania klientów ceniących sobie zarówno funkcjonalność, jak i wygląd. Z dumą możemy powiedzieć, że wielu naszych dotychczasowych odbiorców wraca do nas przy kolejnych projektach, rekomendując nasze usługi rodzinie, znajomym i sąsiadom. Zespół doświadczonych specjalistów dba o każdy etap realizacji – od pomiarów po wykonanie blachy dachowej.</p>
                </div>

                <div className='bg-[#1A1A1A] mt-[32px] py-[24px] px-[48px] max-xl:px-[32px]'>
                    <h3 className='text-[20px] font-semibold max-xl:text-[18px]'>Nasza specjalizacja</h3>
                    <ul className='flex flex-wrap gap-y-[8px] gap-x-[24px] mt-[8px] max-lg:w-[400px] max-sm:w-auto max-sm:max-w-[250px]'>
                        {simpleList.map((item, index) => (
                            <li key={index} className='flex gap-[16px]'>
                                <Icon icon="icon-park-outline:check-one" width="24" height="24" className="text-[#A3886E]"/>
                                <p className='max-xl:text-[14px]'>{item}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    </section>
  )
}

export default HistorySection