/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { usePlantsStore } from "../context/plantsStore";
import supabseControls from "../hooks/supabseControls";
import { useProvidersStore } from "../context/providersStore";

import InputForm from "../components/InputForm";
import SelectForm from "../components/SelectForm";

export default function PlantsForm () {
  const empyPlant = {
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
  }
  const { insertPlant, updatePlant, deletePlant, getAllPlants, uploadImage, getAllProviders } = supabseControls()

  const setInStorePlants = usePlantsStore( ( state ) => state.setPlants )
  const deleteInStorePlants = usePlantsStore( ( state ) => state.deletePlant )
  const insertInStorePlants = usePlantsStore( ( state ) => state.insertPlant )
  const updateInStorePlants = usePlantsStore( ( state ) => state.updatePlant )
  const storePlants = usePlantsStore( ( state ) => state.plants )
  const handleCurrentPlant = usePlantsStore( ( state ) => state.handleCurrentPlant )
  const storeCuerrentPlant = usePlantsStore( ( state ) => state.currentPlant )

  const storeProviders = useProvidersStore( ( state ) => state.providers )
  const setInStoreProviders = useProvidersStore( ( state ) => state.setProviders )

  const [eneableButtonInsert, setEneableButtonInsert] = useState( false )
  const [image, setImage] = useState( null );

  const handleStoreProviders = async () => {
    const allProviders = await getAllProviders();
    setInStoreProviders( allProviders );
  };

  const handleStorePlatns = async () => {
    const allPlants = await getAllPlants();
    setInStorePlants( allPlants )
  };
  const handleInsert = async () => {
    const ansPlanta = await insertPlant( storeCuerrentPlant )
    insertInStorePlants( ansPlanta[0] )
    setEneableButtonInsert( false )
    handleCurrentPlant( ansPlanta[0] )
  };

  const handleUpdate = async () => {
    const ansPlanta = await updatePlant( storeCuerrentPlant.id, storeCuerrentPlant )
    console.log( "crud ansUPDATE: ", ansPlanta[0] )
    updateInStorePlants( ansPlanta[0] )
  };

  const handleDelete = async () => {
    if ( await deletePlant( storeCuerrentPlant.id ) ) {
      deleteInStorePlants( storeCuerrentPlant.id )
      handleCurrentPlant( empyPlant )
    }

  };
  const handleSelectedPlantChange = ( e ) => {
    const selectedPlantId = e.target.value;
    if ( selectedPlantId === "" ) {
      handleCurrentPlant( empyPlant )
    }
    else {
      const selectedPlant = storePlants.find( plant => plant.id === Number( selectedPlantId ) );
      setEneableButtonInsert( false )
      handleCurrentPlant( selectedPlant )

    }
  };

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    handleCurrentPlant( {
      ...storeCuerrentPlant,
      [name]: value
    } );
  };

  const handleNewPlant = () => {
    setEneableButtonInsert( true )
    handleCurrentPlant( empyPlant )
  }
  const handleImageChange = async ( event ) => {
    const selectedImage = event.target.files[0]
  };


  useEffect( () => {
    handleStorePlatns()
    handleStoreProviders()
  }, [] );

  if ( !storeCuerrentPlant ) {
    handleCurrentPlant( empyPlant )
  }
  if ( storeCuerrentPlant ) {
    return (
      <div className="flex justify-center items-center p-6">
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <img className="w-24 h-36 object-cover rounded-md" src={storeCuerrentPlant.image} alt={storeCuerrentPlant.name} />
          </div>

          <SelectForm name="plantsSelect" value={storeCuerrentPlant.id} options={storePlants} onChange={handleSelectedPlantChange}  >Planta:</SelectForm>
          <InputForm name="name" value={storeCuerrentPlant.name} onChange={handleChange} >Nombre:</InputForm>
          <InputForm name="another_name" value={storeCuerrentPlant.another_name} onChange={handleChange} >Nombre indigena/local/cientifico:</InputForm>
          <InputForm name="use_part" value={storeCuerrentPlant.use_part} onChange={handleChange} >Parte utilizada:</InputForm>
          <InputForm name="use" value={storeCuerrentPlant.use} onChange={handleChange} >Uso medicinal:</InputForm>
          <InputForm name="preparation" value={storeCuerrentPlant.preparation} onChange={handleChange} >Preparacion:</InputForm>
          <SelectForm name="frecuency" value={storeCuerrentPlant.frecuency} options={["Diario", "Semanal", "Mensual", "Ocacional"]} onChange={handleChange} >Frecuencia de uso:</SelectForm>
          <InputForm name="warning" value={storeCuerrentPlant.warning} onChange={handleChange} >Efectos secundarios o advertencias:</InputForm>
          <InputForm name="combination" value={storeCuerrentPlant.combination} onChange={handleChange} >Posible combinacion con otras plantas:</InputForm>
          <SelectForm name="provider" value={storeCuerrentPlant.provider} options={storeProviders} onChange={handleChange} >Informante:</SelectForm>

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={eneableButtonInsert ? handleInsert : handleNewPlant}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              {eneableButtonInsert ? 'Insertar' : 'Nueva Planta'}
            </button>
            {!eneableButtonInsert && (
              <>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                >
                  Actualizar
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    );
  }
}
