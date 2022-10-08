import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/main'
import SupaProvider from '../providers/SupaProvider'
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '../providers/ThemeProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SupaProvider>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </ThemeProvider>
    </SupaProvider>
  )
}

export default MyApp
