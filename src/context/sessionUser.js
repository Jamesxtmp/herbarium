import { create } from 'zustand'

export const useSessionStore = create( ( set ) => ( {
  session: null,
  setSession: ( session ) => set( () => ( { session } ) )
} ) )
