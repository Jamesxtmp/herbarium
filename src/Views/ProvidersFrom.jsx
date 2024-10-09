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
  const { insertProvider, updateProvider, deleteProvider, getAllProviders } = supabseControls();
  const setInStoreProviders = useProvidersStore( ( state ) => state.setProviders );
  const deleteInStoreProviders = useProvidersStore( ( state ) => state.deleteProvider );
  const insertInStoreProviders = useProvidersStore( ( state ) => state.insertProvider );
  const updateInStoreProviders = useProvidersStore( ( state ) => state.updateProvider );
  const storeProviders = useProvidersStore( ( state ) => state.providers );

  const [provider, setProvider] = useState( null );
  const [eneableButtonInsert, setEneableButtonInsert] = useState( false );
  const [preserveKnowledge, setPreserveKnowledge] = useState( false );
  const [willingToTeach, setWillingToTeach] = useState( false );
  const [agreeUseName, setAgreeUseName] = useState( false );

  const handleStoreProviders = async () => {
    const allProviders = await getAllProviders();
    setInStoreProviders( allProviders );
    setProvider( allProviders[0] );
  };

  const handleInsert = async () => {
    if ( preserveKnowledge && willingToTeach ) {
      const updatedProvider = {
        ...provider,
        name: agreeUseName ? provider.name : "Comunidad",
      };

      const ansProvider = await insertProvider( updatedProvider ); // Retorna un arreglo
      insertInStoreProviders( ansProvider[0] );
      setProvider( ansProvider[0] );
      setEneableButtonInsert( false );
    }
  };

  const handleUpdate = async () => {
    const ansProvider = await updateProvider( provider.id, provider ); // Retorna un arreglo
    updateInStoreProviders( ansProvider[0] );
  };

  const handleDelete = async () => {
    await deleteProvider( provider.id );
    deleteInStoreProviders( provider.id );
    setProvider( empyProvider );
  };

  const handleSelectChange = ( e ) => {
    const selectedProviderId = e.target.value;
    if ( selectedProviderId === "0" ) {
      setProvider( empyProvider );
    } else {
      const selectedProvider = storeProviders.find( ( provider ) => provider.id === Number( selectedProviderId ) );
      setProvider( selectedProvider );
      setEneableButtonInsert( false );
    }
  };

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setProvider( ( prevState ) => ( {
      ...prevState,
      [name]: value,
    } ) );
  };

  const handleNewProvider = () => {
    setProvider( empyProvider );
    setEneableButtonInsert( true );
  };

  useEffect( () => {
    handleStoreProviders();
  }, [] );
  const autoResizeTextarea = ( e ) => {
    e.target.style.height = 'auto'; // Reinicia la altura
    e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura según el contenido
  };

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

          <div>
            <label htmlFor="name" className="block mb-2">Nombre</label>
            <textarea
              id="name"
              name="name"
              value={provider.name}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2">Genero</label>
            <select
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              name="gender"
              value={provider.gender}
            >
              <option selected value=""></option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label htmlFor="occupation" className="block mb-2">Ocupacion</label>
            <textarea
              id="occupation"
              name="occupation"
              value={provider.occupation}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>

          <div>
            <label htmlFor="residence" className="block mb-2">Comunidad o Localidad</label>
            <textarea
              id="residence"
              name="residence"
              value={provider.residence}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>
          <div>
            <label htmlFor="experience_time" className="block mb-2">Años usando plantas medicinales</label>
            <select
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              name="experience_time"
              value={provider.experience_time}
            >
              <option selected value=""></option>
              <option value="Menos de 5 años">Menos de 5 años</option>
              <option value="5 - 10 años">5 - 10 años</option>
              <option value="10 - 20 años">10 - 20 años</option>
              <option value="Mas de 20 años">Mas de 20 años</option>
            </select>

          </div>

          <div>
            <label htmlFor="how_experence" className="block mb-2">Como adquirio su conocimiento</label>
            <textarea
              id="how_experence"
              name="how_experence"
              value={provider.how_experence}
              onChange={handleChange}
              rows={1}
              onInput={autoResizeTextarea}
              className="w-full p-2 border border-gray-300 rounded-md resize-none"
            />
          </div>
          <div>
            <label htmlFor="opinion_use_plants" className="block mb-2">Cambio en el uso de plantas medicinales</label>
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
          </div>
          <div>
            <label htmlFor="opinion_use_digital" className="block mb-2">Acuerdo con la difucion digital</label>
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
          </div>

          {eneableButtonInsert && (
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={preserveKnowledge}
                  onChange={( e ) => setPreserveKnowledge( e.target.checked )}
                  className="mr-2"
                />
                <label>Le gustaría que su conocimiento se preserve a través de la app?</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={willingToTeach}
                  onChange={( e ) => setWillingToTeach( e.target.checked )}
                  className="mr-2"
                />
                <label>Está dispuesto a enseñar a otras personas?</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeUseName}
                  onChange={( e ) => setAgreeUseName( e.target.checked )}
                  className="mr-2"
                />
                <label>Está de acuerdo en que su nombre y conocimiento sean usados en la app?</label>
              </div>
            </div>
          )}

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={eneableButtonInsert ? handleInsert : handleNewProvider}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              disabled={eneableButtonInsert && !( preserveKnowledge && willingToTeach )}
            >
              {eneableButtonInsert ? 'Insertar' : 'Nuevo Provider'}
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
