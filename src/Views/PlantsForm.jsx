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
    image: "",
  }
  const { insertPlant, updatePlant, deletePlant, getAllPlants, uploadImage, getAllProviders } = supabseControls()

  const setInStorePlants = usePlantsStore( ( state ) => state.setPlants )
  const deleteInStorePlants = usePlantsStore( ( state ) => state.deletePlant )
  const insertInStorePlants = usePlantsStore( ( state ) => state.insertPlant )
  const updateInStorePlants = usePlantsStore( ( state ) => state.updatePlant )
  const storePlants = usePlantsStore( ( state ) => state.plants )
  const storeProviders = useProvidersStore( ( state ) => state.providers )
  const setInStoreProviders = useProvidersStore( ( state ) => state.setProviders )

  const [plant, setPlant] = useState( null )
  const [eneableButtonInsert, setEneableButtonInsert] = useState( false )
  const [image, setImage] = useState( null );

  const handleStoreProviders = async () => {
    const allProviders = await getAllProviders();
    setInStoreProviders( allProviders );
  };

  const handleStorePlatns = async () => {
    const allPlants = await getAllPlants();
    setInStorePlants( allPlants )
    setPlant( allPlants[0] )
  };
  const handleInsert = async () => {
    const ansPlanta = await insertPlant( plant ) // Retorna un arreglo
    insertInStorePlants( ansPlanta[0] )
    setPlant( ansPlanta[0] )
    setEneableButtonInsert( false )
  };

  const handleUpdate = async () => {
    const ansPlanta = await updatePlant( plant.id, plant ) // Retorna un arreglo
    console.log( "crud ansUPDATE: ", ansPlanta[0] )
    updateInStorePlants( ansPlanta[0] )
  };
  const handleDelete = async () => {
    if ( await deletePlant( plant.id ) ) { // Retorna un arreglo
      deleteInStorePlants( plant.id )
      console.log( "crud DELETE:", storePlants[0] )
      setPlant( storePlants[1] ? storePlants[1] : empyPlant );
    }
  };

  const handleSelectChange = ( e ) => {
    const selectedPlantId = e.target.value;
    if ( selectedPlantId === "" ) { setPlant( empyPlant ) }
    else {
      const selectedPlant = storePlants.find( plant => plant.id === Number( selectedPlantId ) );
      setPlant( selectedPlant )
      setEneableButtonInsert( false )
    }
  };

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setPlant( prevState => ( {
      ...prevState,
      [name]: value
    } ) );
  }

  const handleNewPlant = () => {
    setPlant( empyPlant )
    setEneableButtonInsert( true )
  }
  const handleImageChange = async ( event ) => {
    const selectedImage = event.target.files[0]
    console.log( "supabase response: ", await uploadImage( selectedImage ) );
  };


  useEffect( () => {
    handleStorePlatns()
    handleStoreProviders()
  }, [] );

  if ( !plant ) {
    setPlant( empyPlant )
  }
  if ( plant ) {
    return (
      <div className="flex justify-center items-center p-6">
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <img className="w-24 h-36 object-cover rounded-md" src={plant.image} alt={plant.name} />
          </div>

          <SelectForm name="plantsSelect" options={storePlants} onChange={handleSelectChange} >Planta:</SelectForm>
          <InputForm name="name" value={plant.name} onChange={handleChange} >Nombre:</InputForm>
          <InputForm name="another_name" value={plant.another_name} onChange={handleChange} >Nombre indigena/local/cientifico:</InputForm>
          <InputForm name="use_part" value={plant.use_part} onChange={handleChange} >Parte utilizada:</InputForm>
          <InputForm name="use" value={plant.use} onChange={handleChange} >Uso medicinal:</InputForm>
          <InputForm name="preparation" value={plant.preparation} onChange={handleChange} >Preparacion:</InputForm>
          <SelectForm name="frecuency" value={plant.frecuency} options={["Diario", "Semanal", "Mensual", "Ocacional"]} onChange={handleChange} >Frecuencia de uso:</SelectForm>
          <InputForm name="warning" value={plant.warning} onChange={handleChange} >Efectos secundarios o advertencias:</InputForm>
          <InputForm name="combination" value={plant.combination} onChange={handleChange} >Posible combinacion con otras plantas:</InputForm>
          <SelectForm name="provider" value={plant.provider} options={storeProviders} onChange={handleChange} >Informante:</SelectForm>

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
