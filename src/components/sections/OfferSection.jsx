import offer1 from '../../assets/images/bg-4-lg.webp'
import offer2 from '../../assets/images/bg-8.webp'
import offer3 from '../../assets/images/bg-7.webp'
import offer4 from '../../assets/images/bg-2-lg.webp'
import useIntersectionObserver from '../../hooks/useObserver'

const offer = [
    {
        name: 'Blacha na wymiar',
        description: [
            'Wykonujemy blachy na wymiar dopasowane do każdego projektu - od dachów garażowych po złożone dachy na budynkach mieszkalnych i przemysłowych. Korzystamy z wysokiej jakości materiałów i precyzyjnych wykrojników, dzięki czemu każdy element idealnie pasuje, nie wymaga dodatkowych przeróbek i przyspiesza montaż.',
            'Zamawiając blachę u nas zyskujesz trwałość i estetykę na lata oraz szybką realizację. Oferujemy doradztwo techniczne, cięcie na wymiar i możliwość zamówienia kolorów oraz powłok odpornych na warunki atmosferyczne - skontaktuj się po bezpłatną wycenę i dobór rozwiązania.',
            'Zadzwoń do nas i dowiedz się więcej na temat oferty - odpowiemy na każde pytanie'
        ],
        image: offer1,
        alt: 'Blacha dachowa na wymiar - precyzyjne cięcie i montaż'
    },

    {
        name: 'Systemy rynnowe',
        description: [
            'Dostarczamy kompletne systemy rynnowe zaprojektowane tak, by skutecznie odprowadzać wodę i chronić konstrukcję budynku. Oferujemy rynny i rury spustowe z trwałych materiałów, dopasowane kolorystycznie do pokrycia dachu i elewacji, odporne na korozję oraz zmienne warunki pogodowe.',
            'Montaż wykonujemy z zachowaniem zasad szczelności i estetyki - zapewniamy też serwis i szybkie naprawy. Doradzimy optymalny przekrój i sposób montażu pod kątem spadków dachu oraz ilości wody do odprowadzenia, żeby rynny działały bezawaryjnie przez lata.',
            'Zadzwoń do nas i dowiedz się więcej na temat oferty - odpowiemy na każde pytanie'
        ],
        image: offer2,
        alt: 'Kompletny system rynnowy - trwałe rynny i rury spustowe'
    },

    {
        name: 'Blacha II kategorii',
        description: [
            'Oferujemy ekonomiczne arkusze blachy II kategorii - to doskonałe rozwiązanie, gdy liczy się dobra jakość przy ograniczonym budżecie. Arkusze II gatunku mogą mieć drobne niedoskonałości kosmetyczne, które nie wpływają na ich parametry techniczne ani trwałość, a pozwalają znacznie obniżyć koszty materiału.',
            'Takie blachy świetnie sprawdzają się na obiektach pomocniczych, halach, garażach czy małych dachach użytkowych. Oferujemy przegląd dostępnych partii, doradztwo przy wyborze oraz możliwość cięcia na wymiar - skontaktuj się, by poznać aktualne ceny i dostępność.',
            'Zadzwoń do nas i dowiedz się więcej na temat oferty - odpowiemy na każde pytanie'
        ],
        image: offer3,
        alt: 'Blacha dachowa II kategorii - ekonomiczne rozwiązanie'
    },

    {
        name: 'Akcesoria',
        description: [
            'W naszej ofercie znajdziesz pełen zestaw akcesoriów dachowych: obróbki, rąbki, zakończenia, elementy dociepleń, mocowania, uszczelki i zabezpieczenia przeciwśniegowe. Wszystkie elementy dobieramy tak, aby zapewnić szczelność, estetykę i zgodność z systemem pokrycia.',
            'Dostarczamy akcesoria pasujące do naszych blach i rynien oraz oferujemy profesjonalny montaż i doradztwo techniczne. Dzięki temu masz pewność, że każdy detal dachu będzie trwały i poprawnie zamontowany - zapytaj o kompletny pakiet dopasowany do Twojego projektu.',
            'Zadzwoń do nas i dowiedz się więcej na temat oferty - odpowiemy na każde pytanie'
        ],
        image: offer4,
        alt: 'Akcesoria dachowe: obróbki, łączniki i mocowania'
    }
]


const OfferSection = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section ref={ref} id="oferta" className='mt-[-96px] flex max-lg:flex-wrap max-sm:mt-[-32px]'>
            {offer.map((el, index) => (
                <article key={index} tabIndex="0" className={`h-[800px] flex-1 relative offer-tile p-[32px] flex flex-col justify-end group cursor-pointer max-xl:h-[600px] max-lg:w-[50%] max-lg:flex-auto max-md:w-full transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-top' : 'element-hidden-top'}`} style={{ transitionDelay: index * 200 + 'ms' }}>
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