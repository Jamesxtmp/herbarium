import { create } from 'zustand';

export const usePlantsStore = create( ( set ) => ( {
  plants: [],

  setPlants: ( plants ) => set( { plants } ),

  deletePlant: ( id ) => set( ( state ) => ( {
    plants: state.plants.filter( ( plant ) => {
      console.log( 'zustand DELETE:', plant )
      return ( plant.id !== id )
    } )
  } ) ),

  insertPlant: ( plant ) => {
    console.log( 'zustand INSERT:', plant )
    set( ( state ) => ( {
      plants: [...state.plants, plant]
    } ) )
  },

  updatePlant: ( plantUpdated ) => set( ( state ) => ( {
    plants: state.plants.map( ( plant ) => {
      console.log( 'zustand UPDATE:', plant, "id: ", plant.id, "upbdate", plantUpdated, "upbdate id:", plantUpdated )
      return ( plant.id === plantUpdated.id ? plantUpdated : plant )
    }
    )
  } ) )
} ) );