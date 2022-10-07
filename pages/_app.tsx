import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/main'
import SupaProvider from '../providers/SupaProvider'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SupaProvider>
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </SupaProvider>
  )
}

export default MyApp
