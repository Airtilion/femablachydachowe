import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import DataSection from '../components/sections/DataSection'
import HistorySection from '../components/sections/HistorySection'
import AboutSection from '../components/sections/AboutSection'
import OfferSection from '../components/sections/OfferSection'
import FaqSection from '../components/sections/FaqSection'
import ContactSection from '../components/sections/ContactSection'
import Footer from '../components/Footer'

const MainSite = () => {
  return (
    <>
        <Navbar/>
        <Header/>
        <main className='flex flex-col gap-[128px] max-sm:gap-[64px] overflow-x-hidden'>
          <DataSection/>
          <HistorySection/>
          <AboutSection/>
          <OfferSection/>
          <FaqSection/>
          <ContactSection/>
        </main>
        <Footer/>
    </>
  )
}

export default MainSite