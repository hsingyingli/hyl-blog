import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout/main'
import { Toaster } from 'react-hot-toast';
import ThemeProvider from '../providers/ThemeProvider';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'
import { useState } from 'react';
import NotesProvider from '../providers/NotesProvider';


function MyApp({ Component, pageProps, router }: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ThemeProvider>
        <Layout path={router.asPath}>
          {
            router.asPath.includes("/notes") ?
              <NotesProvider>
                <Component {...pageProps} />
              </NotesProvider>
              :
              <Component {...pageProps} />
          }
          <Toaster />
        </Layout>
      </ThemeProvider>
    </SessionContextProvider>
  )
}

export default MyApp
