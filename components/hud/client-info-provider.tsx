"use client"

import { createContext, useContext } from "react"

import { useClientInfo, type ClientInfoState } from "@/hooks/use-client-info"

const ClientInfoContext = createContext<ClientInfoState>({
  data: null,
  rttMs: null,
  error: false,
})

/** Keeps every rail on a single /api/client-info poll instead of one each. */
export function ClientInfoProvider({ children }: { children: React.ReactNode }) {
  const value = useClientInfo()
  return (
    <ClientInfoContext.Provider value={value}>
      {children}
    </ClientInfoContext.Provider>
  )
}

export function useClientInfoContext() {
  return useContext(ClientInfoContext)
}
