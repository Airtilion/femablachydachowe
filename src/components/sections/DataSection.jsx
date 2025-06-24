import React, { useState, useEffect } from 'react';
import useIntersectionObserver from '../../hooks/useObserver';
import AnimatedValue from '../AnimatedValue';

const informations = [
    {
        title: 'Zadowolonych klientów',
        value: '2000+'
    },
    {
        title: 'Lat obecności na&nbsp;rynku',
        value: '30+'
    },
    {
        title: 'Klientów poleca nas dalej',
        value: '99%'
    },
    {
        title: 'Od poniedziałku do soboty',
        value: '7<sup class="index-up">00</sup>-16<sup class="index-up">00</sup>'
    },
];


const DataSection = () => {
    const [ref, isVisible] = useIntersectionObserver();

    return (
        <section className='w-full bg-[#1A1A1A] py-[48px] flex justify-center'>
            <div ref={ref} className={`grid gap-[32px] w-[1400px] max-2xl:w-[1100px] max-xl:w-[900px] max-lg:w-full max-lg:grid-cols-2 grid-cols-4 max-lg:px-[32px] max-sm:flex max-sm:flex-col`}>
                {informations.map((element, index) => (
                    <div key={index} className={`bg-[#222222] h-[200px] flex justify-center items-center flex-col relative numbers-container max-2xl:h-[170px] max-xl:h-[130px] transition-all duration-1000 ease-in-out ${isVisible ? 'element-visible-top' : 'element-hidden-top'}`} style={{ transitionDelay: index * 100 + 'ms' }}>
                        
                        <AnimatedValue value={element.value} isVisible={isVisible} className='font-black text-[60px] max-2xl:text-[40px] max-xl:text-[30px] max-sm:text-[25px]'/>
                        
                        <p className='font-light text-[20px] max-2xl:text-[16px] max-2xl:w-[150px] max-2xl:text-center max-xl:text-[14px] max-sm:text-[13px]' dangerouslySetInnerHTML={{ __html: element.title }}></p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DataSection;