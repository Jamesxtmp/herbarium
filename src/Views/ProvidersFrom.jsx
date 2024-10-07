/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import supabseControls from "../hooks/supabseControls";
import { useProvidersStore } from "../context/providersStore";

export default function ProvidersFrom () {
  const empyProvider = {
    id: "",
    name: '',
    gender: "",
    occupation: "",
    residence: "",
    experience_time: 0,
    how_experence: "",
    opinion_use_plants: "",
    opinion_use_digital: "",
  }
  const { insertProvider, updateProvider, deleteProvider, getAllProviders } = supabseControls()

  const setInStoreProviders = useProvidersStore( ( state ) => state.setProviders )
  const deleteInStoreProviders = useProvidersStore( ( state ) => state.deleteProvider )
  const insertInStoreProviders = useProvidersStore( ( state ) => state.insertProvider )
  const updateInStoreProviders = useProvidersStore( ( state ) => state.updateProvider )
  const storeProviders = useProvidersStore( ( state ) => state.providers )

  const [provider, setProvider] = useState( null )
  const [eneableButtonInsert, setEneableButtonInsert] = useState( false )

  const handleStoreProviders = async () => {
    const allProviders = await getAllProviders();
    setInStoreProviders( allProviders )
    setProvider( allProviders[0] )
  };
  const handleInsert = async () => {
    const ansProvider = await insertProvider( provider ) // Retorna un arreglo
    insertInStoreProviders( ansProvider[0] )
    setProvider( ansProvider[0] )
    setEneableButtonInsert( false )
  };

  const handleUpdate = async () => {
    const ansProvider = await updateProvider( provider.id, provider ) // Retorna un arreglo
    console.log( "crud ansUPDATE: ", ansProvider[0] )
    updateInStoreProviders( ansProvider[0] )
  };
  const handleDelete = async () => {
    await deleteProvider( provider.id )
    deleteInStoreProviders( provider.id )
    console.log( "crud DELETE:", storeProviders[0] )
    setProvider( empyProvider );
  };

  const handleSelectChange = ( e ) => {
    const selectedProviderId = e.target.value;
    if ( selectedProviderId === 0 ) { setProvider( empyProvider ) }
    else {
      const selectedProvider = storeProviders.find( provider => provider.id === Number( selectedProviderId ) );
      setProvider( selectedProvider )
      setEneableButtonInsert( false )
    }
  };

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    console.log( 'crud change:', name, value )
    setProvider( prevState => ( {
      ...prevState,
      [name]: value
    } ) );
  }
  const handleNewProvider = () => {
    setProvider( empyProvider )
    setEneableButtonInsert( true )
  }
  useEffect( () => {
    handleStoreProviders()
  }, [] );

  if ( !provider ) {
    setProvider( empyProvider )
  }
  if ( provider ) {
    return (
      <div className="flex justify-center items-center p-6">
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <select
            name="providersSelect"
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option selected value={0}>--Informante no seleccionado--</option>
            {storeProviders.map( ( providerStore, i ) => (
              <option key={i} value={providerStore.id}>
                {providerStore.name}
              </option>
            ) )}
          </select>

          <input
            type="text"
            name="name"
            value={provider.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="gender"
            value={provider.gender}
            onChange={handleChange}
            placeholder="Genero"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="occupation"
            value={provider.occupation}
            onChange={handleChange}
            placeholder="Ocupacion"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="residence"
            value={provider.residence}
            onChange={handleChange}
            placeholder="Residencia"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="experience_time"
            value={provider.experience_time}
            onChange={handleChange}
            placeholder="Años de Experiecia"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="how_experence"
            value={provider.how_experence}
            onChange={handleChange}
            placeholder="Como obtuvo experiencia"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            name="opinion_use_plants"
            value={provider.opinion_use_plants}
          >
            <option selected value=""></option>
            <option value="Ha aumentado">Ha aumentado</option>
            <option value="Ha disminuido">Ha disminuido</option>
            <option value="Se ha mantenido igual">Se ha mantenido igual</option>
          </select>

          <select
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            name="opinion_use_digital"
            value={provider.opinion_use_digital}
          >
            <option selected value=""></option>
            <option value="Muy deacuerdo">Muy deacuerdo</option>
            <option value="De acuerdo">De acuerdo</option>
            <option value="Neutral">Neutral</option>
            <option value="En desacuerdo">En desacuerdo</option>
            <option value="Muy en desacuerdo">Muy en desacuerdo</option>
          </select>

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={eneableButtonInsert ? handleInsert : handleNewProvider}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              {eneableButtonInsert ? 'Insertar' : 'Nuevo Provider'}
            </button>
            {
              !eneableButtonInsert && (
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
              )
            }
          </div>
        </form>
      </div>
    );

  }
}
