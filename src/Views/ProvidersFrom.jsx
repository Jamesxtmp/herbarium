/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import supabseControls from "../hooks/supabseControls";
import { useProvidersStore } from "../context/providersStore";
import SelectForm from "../components/SelectForm";
import InputForm from "../components/InputForm";
import CheckBoxFrom from "../components/CheckBoxFrom";

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
  //-- Check boxes
  const [preserveKnowledge, setPreserveKnowledge] = useState( false );
  const [willingToTeach, setWillingToTeach] = useState( false );
  const [agreeUseName, setAgreeUseName] = useState( false );

  const handleStoreProviders = async () => {
    const allProviders = await getAllProviders();
    setInStoreProviders( allProviders );
    setProvider( allProviders[0] );
  };

  const handleInsert = async () => {
    if ( preserveKnowledge && willingToTeach && agreeUseName ) {
      const ansProvider = await insertProvider( provider ); // Retorna un arreglo
      insertInStoreProviders( ansProvider[0] );
      setProvider( ansProvider[0] );
      setEneableButtonInsert( false );
    } else {
      console.log( "Debes haceptar todos los acuerdos" )
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

  if ( !provider ) {
    setProvider( empyProvider )
  }
  if ( provider ) {
    return (
      <div className="flex justify-center items-center p-6">
        <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
          <SelectForm name="providersSelect" options={storeProviders} onChange={handleSelectChange}>Informante:</SelectForm>
          <InputForm name="name" value={provider.name} onChange={handleChange} >Nombre:</InputForm>
          <SelectForm name="gender" value={provider.gender} options={["Masculino", "Femenino", "Otro"]} onChange={handleChange} >Genero:</SelectForm>
          <InputForm name="occupation" value={provider.occupation} onChange={handleChange} >Ocupacion:</InputForm>
          <InputForm name="residence" value={provider.residence} onChange={handleChange} >Comunidad o Localidad:</InputForm>
          <SelectForm name="experience_time" value={provider.experience_time} options={["Menos de 5 años", "5 - 10 años", "10 - 20 años", "Mas de 20 años"]} onChange={handleChange} >Años usando plantas medicinales:</SelectForm>
          <InputForm name="how_experence" value={provider.how_experence} onChange={handleChange} >Como adquirio su conocimiento:</InputForm>
          <SelectForm name="opinion_use_plants" value={provider.opinion_use_plants} options={["Ha aumentado", "Ha disminuido", "Se ha mantenido igual"]} onChange={handleChange} >Cambio en el uso de plantas medicinales:</SelectForm>
          <SelectForm name="opinion_use_digital" value={provider.opinion_use_digital} options={["Muy deacuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"]} onChange={handleChange} >Acuerdo con la difucion digital:</SelectForm>

          {eneableButtonInsert && (
            <div className="space-y-4">
              <CheckBoxFrom checked={preserveKnowledge} onChange={( e ) => setPreserveKnowledge( e.target.checked )}>
                ¿Le gustaría que su conocimiento se preserve a través de la app?
              </CheckBoxFrom>
              <CheckBoxFrom checked={willingToTeach} onChange={( e ) => setWillingToTeach( e.target.checked )}>
                ¿Está dispuesto a enseñar a otras personas?
              </CheckBoxFrom>
              <CheckBoxFrom checked={agreeUseName} onChange={( e ) => setAgreeUseName( e.target.checked )}>
                ¿Le gustaría que su conocimiento se preserve a través de la app?
              </CheckBoxFrom>
            </div>
          )}

          <div className="flex justify-between space-x-2">
            <button
              type="button"
              onClick={eneableButtonInsert ? handleInsert : handleNewProvider}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              disabled={eneableButtonInsert && !( preserveKnowledge && willingToTeach )}
            >
              {eneableButtonInsert ? 'Insertar' : 'Nuevo Informante'}
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
