/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { usePlantsStore } from "../context/plantsStore";
import supabseControls from "../hooks/supabseControls";
import { useProvidersStore } from "../context/providersStore";

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
  const { insertPlant, updatePlant, deletePlant, getAllPlants, uploadImage } = supabseControls()

  const setInStorePlants = usePlantsStore( ( state ) => state.setPlants )
  const deleteInStorePlants = usePlantsStore( ( state ) => state.deletePlant )
  const insertInStorePlants = usePlantsStore( ( state ) => state.insertPlant )
  const updateInStorePlants = usePlantsStore( ( state ) => state.updatePlant )
  const storePlants = usePlantsStore( ( state ) => state.plants )
  const storeProviders = useProvidersStore( ( state ) => state.providers )

  const [plant, setPlant] = useState( null )
  const [eneableButtonInsert, setEneableButtonInsert] = useState( false )
  const [image, setImage] = useState( null );

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
    if ( selectedPlantId === 0 ) { setPlant( empyPlant ) }
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
  const autoResizeTextarea = ( e ) => {
    e.target.style.height = 'auto'; // Reinicia la altura
    e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura según el contenido
  };

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

          <div>
            <label htmlFor="plantsSelect" className="block mb-2">Selecciona una planta</label>
            <select
              id="plantsSelect"
              name="plantsSelect"
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option selected value={0}>--Planta no seleccionada--</option>
              {storePlants.map( ( plantStore, i ) => (
                <option key={i} value={plantStore.id}>
                  {plantStore.name}
                </option>
              ) )}
            </select>
          </div>

          <div>
            <label htmlFor="name" className="block mb-2">Nombre</label>
            <textarea
              id="name"
              name="name"
              value={plant.name}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="another_name" className="block mb-2">Nombre indigena/local/cientifico</label>
            <textarea
              id="another_name"
              name="another_name"
              value={plant.another_name}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="use_part" className="block mb-2">Parte utilizada</label>
            <textarea
              id="use_part"
              name="use_part"
              value={plant.use_part}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="use" className="block mb-2">Uso medicinal</label>
            <textarea
              id="use"
              name="use"
              value={plant.use}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="preparation" className="block mb-2">Preparacion</label>
            <textarea
              id="preparation"
              name="preparation"
              value={plant.preparation}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="frecuency" className="block mb-2">Frecuencia de uso</label>
            <select
              id="frecuency"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              name="frecuency"
              value={plant.frecuency}
            >
              <option selected value=""></option>
              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
              <option value="Ocacional">Ocacional</option>
            </select>
          </div>

          <div>
            <label htmlFor="warning" className="block mb-2">Efectos secundarios o advertencias</label>
            <textarea
              id="warning"
              name="warning"
              value={plant.warning}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="combination" className="block mb-2">Posible combinacion con otras plantas</label>
            <textarea
              id="combination"
              name="combination"
              value={plant.combination}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="provider" className="block mb-2">Informante</label>
            <select
              id="provider"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              name="provider"
              value={plant.provider}
            >
              <option selected value=""></option>
              {storeProviders.map( ( providerStore, i ) => (
                <option key={i} value={providerStore.id}>
                  {providerStore.name}
                </option>
              ) )}
            </select>
          </div>

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
