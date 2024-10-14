import { create } from 'zustand';

export const useProvidersStore = create( ( set ) => ( {
  providers: [],
  currentProvider: {
    id: "",
    name: '',
    gender: "",
    occupation: "",
    residence: "",
    experience_time: 0,
    how_experence: "",
    opinion_use_plants: "",
    opinion_use_digital: "",
  },

  handleCurrentProvider: ( currentProvider ) => set( ( state ) => ( {
    ...state,
    currentProvider
  } ) ),

  setProviders: ( providers ) => set( { providers } ),

  deleteProvider: ( id ) => set( ( state ) => ( {
    providers: state.providers.filter( ( provider ) => {
      console.log( 'zustand DELETE:', provider )
      return ( provider.id !== id )
    } )
  } ) ),

  insertProvider: ( provider ) => {
    console.log( 'zustand INSERT:', provider )
    set( ( state ) => ( {
      providers: [...state.providers, provider]
    } ) )
  },

  updateProvider: ( providerUpdated ) => set( ( state ) => ( {
    providers: state.providers.map( ( provider ) => {
      console.log( 'zustand UPDATE:', provider, "id: ", provider.id, "upbdate", providerUpdated, "upbdate id:", providerUpdated )
      return ( provider.id === providerUpdated.id ? providerUpdated : provider )
    }
    )
  } ) )
} ) );