import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react'
import sectionImage from '../../assets/images/bg-9.webp'
import ArrowIcon from '../ArrowIcon'
import { useState } from 'react'
import useIntersectionObserver from '../../hooks/useObserver'

const faq = [
    {
        id: 1,
        question: "Co obejmuje oferta Wasza oferta?",
        answer: "Specjalizujemy się w produkcji blachy na wymiar, tworzymy kompletne systemy rynnowe oraz dostarczamy niezbędne akcesoria dachowe. Współpracujemy z klientami indywidualnymi i instytucjonalnymi, oferując gotowe arkusze blachy skrojone pod dokładne wymiary dachu (minimalizujemy odpady na budowie), systemy rynnowe dopasowane do każdego typu dachu (stale powlekane, PVC), akcesoria dachowe, takie jak obróbki, wiatrownice, gąsiory czy podkładki uszczelniające. Dzięki szerokiej ofercie pokryć dachowych z blach oraz elastycznemu podejściu do klienta, nasze realizacje trafiają zarówno do inwestorów w Tarnowie, jak i w innych miastach Małopolski oraz całego kraju."
    },
    {
        id: 2,
        question: "Jakie rodzaje blach na dach oferujecie?",
        answer: 'W naszym asortymencie znajdziesz różne blachodachówki oraz profile, które umożliwiają dopasowanie do stylu budynku i oczekiwań inwestora: blachodachówka to popularne, estetyczne pokrycie dachowe o kształcie przypominającym tradycyjną dachówkę, natomiast blacha trapezowa (profile trapezowe) to solidne i lekkie rozwiązanie, idealne na duże powierzchnie dachowe — w ofercie znajduje się również profil Blachotrapez. Blachy na rąbek stojący to nowoczesne, wyjątkowo szczelne pokrycie dachowe, polecane przy spadzistych dachach z widoczną konstrukcją. Klasyczna dachówka stalowa, dostępna w wersji powlekanej, łączy wygląd tradycyjnej dachówki ceramicznej z wytrzymałością stali. Oferujemy wszystkie powyższe materiały w różnych grubościach, kolorach i powłokach (poliestrowych, poliuretanowych), co gwarantuje trwałość i estetykę każdego dachu.'
    },
    {
        id: 3,
        question: "Czy Państwa firma świadczy usługi montażu dachu?",
        answer: "Nasza działalność koncentruje się przede wszystkim na produkcji pokryć dachowych i dostawie gotowych elementów do klienta. Nie prowadzimy bezpośrednio prac montażowych.",
    },
    {
        id: 4,
        question: "Czy transportują Państwo zamówienie?",
        answer: "Tak, zapewniamy transport zamówionych materiałów na terenie Tarnowa i okolic, a także w inne regiony Polski. Niezależnie od tego, czy zamówisz blachę trapezową, systemy rynnowe czy inne pokrycia dachowe — dostarczymy je bezpiecznie pod wskazany adres. O szczegóły dostawy i koszt transportu zapytaj naszych doradców."
    },
    {
        id: 5,
        question: "Jak dbać o pokrycie dachowe z blachy, aby służyło przez lata?",
        answer: "Należy regularnie czyść rynny i kratkę dachową, by zapobiec gromadzeniu się liści i zabrudzeń. Raz w roku skontroluj stan powłoki – w razie drobnych zarysowań użyj farby naprawczej lub odpowiedniej powłoki ochronnej. Sprawdzaj też obróbki blacharskie przy kominie, kalenicy i okapach, upewniając się, że są szczelne. Unikaj chodzenia po dachu bez zabezpieczenia, aby nie uszkodzić powłoki. Zimą usuwaj śnieg i lód przy pomocy sprzętu przeznaczonego do dachów, by nie porysować powierzchni. Dzięki tym prostym krokom dach zachowa szczelność i estetykę na długie lata."
    }
    ,
    {
        id: 6,
        question: "Czy oferujecie obróbki blacharskie i dodatkowe akcesoria dachowe?",
        answer: "Tak. Oprócz samej blachy dachowej produkujemy precyzyjne obróbki blacharskie, które zapewniają szczelność i estetykę wykończenia. Wśród akcesoriów dachowych znajdziesz pasy nadrynnowe i obróbki kominowe, chroniące przed podciekaniem wody i zabezpieczające newralgiczne miejsca dachu, wiatrownice, gąsiory i zakończenia kalenic, które gwarantują prawidłową wentylację i trwałe łączenie arkuszy, a także podkładki uszczelniające, wkręty z uszczelką EPDM oraz profile maskujące, umożliwiające bezpieczne i szczelne mocowanie blachy. Dzięki temu każdy element Twojego pokrycia dachowego jest dopasowany pod wymiar i kolor, a całość spełnia najwyższe standardy jakości."
    }
]

const FaqSection = () => {
    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const [ref, isVisible] = useIntersectionObserver();
    const [ref2, isVisible2] = useIntersectionObserver();


    return (
        <section id="faq" className='w-[1400px] mx-auto flex gap-[64px] max-2xl:w-[1140px] max-xl:w-[960px] max-lg:w-[90%] max-lg:flex-col'>
            <img ref={ref} src={sectionImage} width={400} alt="Nowoczesne pokrycie dachowe z blachodachówki na dwuczęściowym budynku mieszkalnym" className={`w-[400px] max-h-[600px] object-cover max-xl:max-h-[650px] max-lg:w-full max-lg:h-[300px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-left' : 'element-hidden-left'}`} />
            <article className='flex flex-col gap-[16px]'>
                <h2 className='text-[25px] font-semibold max-xl:text-[22px]'>Najczęściej zadawane pytania o pokrycia dachowe</h2>
                <p className='text-[16px] font-light max-xl:text-[14px]'>Poniżej zebraliśmy najczęściej zadawane pytania dotyczące naszej działalności, aby pomóc Ci rozwiać wątpliwości i ułatwić wybór najlepszego rozwiązania. </p>

                <div>
                    {faq.map((details, index) => (
                        <Accordion open={open === details.id} key={index} icon={<ArrowIcon id={details.id} open={open} />} ref={ref2} className={`flex flex-col items-center gap-[16px] transition-all duration-1000 ease-in-out ${isVisible2 ? 'element-visible-left' : 'element-hidden-left'}`} style={{transitionDelay: index*200 + 'ms'}}>
                            <AccordionHeader onClick={() => handleOpen(details.id)} className="cursor-pointer text-[16px] justify-between text-left bg-[#1A1A1A] py-[16px] px-[16px] border-l-[8px] border-l-[#A3886E]">
                                    <p className='text-[16px] font-semibold max-xl:text-[14px] max-sm:font-normal mr-[8px]'>{details.question}</p>
                            </AccordionHeader>
                            <AccordionBody className="text-[16px] overflow-hidden font-normal max-sm:text-[14px] mb-[16px] bg-[#313131] p-[16px]" dangerouslySetInnerHTML={{ __html: details.answer }}></AccordionBody>
                        </Accordion>
                    ))}
                </div>
            </article>
        </section>
    )
}

export default FaqSection