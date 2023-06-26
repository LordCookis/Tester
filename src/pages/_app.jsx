import { useEffect } from 'react'
import { services } from '@/services'
import '@/styles/globals.sass'
import Layout from '../layouts/Layout'

export default function App({ Component, pageProps }) {
  const connect = async() => await services.base.connect()
  useEffect(()=>{connect()}, [])

  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}