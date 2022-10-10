import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/main'
import SupaProvider from '../providers/SupaProvider'
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '../providers/ThemeProvider';
import NoteSelector from '../providers/NoteSelector';

function MyApp({ Component, pageProps, router }: AppProps) {

  return (
    <SupaProvider>
      <ThemeProvider>
        <Layout path={router.asPath}>
          <NoteSelector>
            <Component {...pageProps} />
            <Toaster />
          </NoteSelector>
        </Layout>
      </ThemeProvider>
    </SupaProvider>
  )
}

export default MyApp
