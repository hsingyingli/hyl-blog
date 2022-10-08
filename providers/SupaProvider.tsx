import { Session } from '@supabase/supabase-js'
import React, { useState, useEffect, createContext } from 'react'
import supabase from '../utils/supabaseClient'

interface Props {
  children: React.ReactNode
}

interface SupaInterface {
  isLoading: boolean
  session: Session | null
}

const SupaContext = createContext<SupaInterface>({
  isLoading: true,
  session: null
})

const SupaProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    let mounted = true

    async function getInitialSession() {
      const session = supabase.auth.session()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session)
        } else {
          fetch("/api/auth/remove", { method: "GET", credentials: "same-origin" })
        }
        setIsLoading(false)
      }
    }

    getInitialSession()

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        if (session) {
          fetch('/api/auth/auth', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'same-origin',
            body: JSON.stringify({ event, session }),
          })
        } else {
          fetch("/api/auth/remove", { method: "GET", credentials: "same-origin" })
        }

      }
    )

    return () => {
      mounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <SupaContext.Provider value={{ isLoading, session }}>
      {children}
    </SupaContext.Provider>
  )
}

export default SupaProvider
export { SupaContext }
