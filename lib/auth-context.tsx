'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'

interface AdminProfile {
  id: string
  email: string
  full_name: string
  role: 'super_admin' | 'admin' | 'hr' | 'sales'
  avatar_url: string | null
}

interface AuthContextType {
  user: User | null
  adminProfile: AdminProfile | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  adminProfile: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    const initSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!mounted) return

      if (user) {
        setUser(user)
        const { data: profile } = await supabase
          .from('admin_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (mounted) {
          setAdminProfile(profile)
        }
      }

      if (mounted) {
        setLoading(false)
      }
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        if (event === 'SIGNED_OUT') {
          setUser(null)
          setAdminProfile(null)
        } else if (session?.user) {
          setUser(session.user)
          const { data: profile } = await supabase
            .from('admin_profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (mounted) {
            setAdminProfile(profile)
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    setAdminProfile(null)
  }

  return (
    <AuthContext.Provider value={{ user, adminProfile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
