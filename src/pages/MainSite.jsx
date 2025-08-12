import React, { Suspense, lazy } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Footer from '../components/Footer'

const DataSection = lazy(() => import('../components/sections/DataSection'))
const HistorySection = lazy(() => import('../components/sections/HistorySection'))
const AboutSection = lazy(() => import('../components/sections/AboutSection'))
const OfferSection = lazy(() => import('../components/sections/OfferSection'))
const FaqSection = lazy(() => import('../components/sections/FaqSection'))
const ContactSection = lazy(() => import('../components/sections/ContactSection'))

const MainSite = () => {
  return (
    <>
      <Navbar />
      <Header />
      <main className="flex flex-col gap-[128px] max-sm:gap-[64px] overflow-x-hidden">
        <Suspense fallback={<div>Ładowanie...</div>}>
          <DataSection />
          <HistorySection />
          <AboutSection />
          <OfferSection />
          <FaqSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default MainSite
