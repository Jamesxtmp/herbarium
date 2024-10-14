import { create } from 'zustand';

export const usePlantsStore = create( ( set ) => ( {
  plants: [],
  currentPlant: {
    id: "",
    name: '',
    another_name: "",
    use_part: "",
    use: "",
    preparation: "",
    frecuency: "",
    warning: "",
    combination: "",
    provider: "",
    image: "https://ognhpnlmvmxlyzqlyolv.supabase.co/storage/v1/object/public/plants/depositphotos_383693018-stock-illustration-herbal-medicine-icon-vector-illustration.jpg",
  },

  handleCurrentPlant: ( currentPlant ) => set( ( state ) => ( {
    ...state,
    currentPlant
  } ) ),

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
    } )
  } ) )
} ) );