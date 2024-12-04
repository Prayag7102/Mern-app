import React from 'react'
import Header from '../components/Header'
import ProductsCard from './ProductsCard'
import SwiperBanner from './SwiperBanner'

export default function HomePage() {
  return (
    <>
      <Header/>
      <SwiperBanner/>
      <ProductsCard/>
    </>
  )
}
