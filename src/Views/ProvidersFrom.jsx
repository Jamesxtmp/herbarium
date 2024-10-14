/* eslint-disable react-hooks/exhaustive-deps */

import supabseControls from "../hooks/supabseControls";
import { useProvidersStore } from "../context/providersStore";
import SelectForm from "../components/SelectForm";
import InputForm from "../components/InputForm";
import CheckBoxFrom from "../components/CheckBoxFrom";
import { useEffect, useState } from "react";
import ButtomTypesGoogle from "../components/ButtomTypesGoogle";
import { objectDeepEqual } from "../tools/objectDeepEqual";

export default function ProvidersFrom () {
  const empyProvider = {
    id: "",
    name: '',
    gender: "",
    occupation: "",
    residence: "",
    experience_time: "",
    how_experence: "",
    opinion_use_plants: "",
    opinion_use_digital: "",
  }
  const { insertProvider, updateProvider, deleteProvider } = supabseControls();

  const deleteInStoreProviders = useProvidersStore( ( state ) => state.deleteProvider );
  const insertInStoreProviders = useProvidersStore( ( state ) => state.insertProvider );
  const updateInStoreProviders = useProvidersStore( ( state ) => state.updateProvider );
  const handleCurrentProvider = useProvidersStore( ( state ) => state.handleCurrentProvider )
  const storeCuerrentProvider = useProvidersStore( ( state ) => state.currentProvider )


  const storeProviders = useProvidersStore( ( state ) => state.providers );

  const [eneableButtonInsert, setEneableButtonInsert] = useState( false );
  const [showForm, setShowForm] = useState( false );
  //-- Check boxes
  const [preserveKnowledge, setPreserveKnowledge] = useState( false );
  const [willingToTeach, setWillingToTeach] = useState( false );
  const [agreeUseName, setAgreeUseName] = useState( false );


  const handleInsert = async () => {
    if ( preserveKnowledge && willingToTeach && agreeUseName ) {
      const ansProvider = await insertProvider( storeCuerrentProvider ); // Retorna un arreglo
      insertInStoreProviders( ansProvider[0] );
      setEneableButtonInsert( false );

      handleCurrentProvider( ansProvider[0] )
    }
  };

  const handleUpdate = async () => {
    const ansProvider = await updateProvider( storeCuerrentProvider.id, storeCuerrentProvider ); // Retorna un arreglo
    updateInStoreProviders( ansProvider[0] );
  };

  const handleDelete = async () => {
    if ( await deleteProvider( storeCuerrentProvider.id ) ) {
      deleteInStoreProviders( storeCuerrentProvider.id );
      handleCurrentProvider( empyProvider )
    }
  };

  const handleSelectProviderChange = ( e ) => {
    const selectedProviderId = e.target.value;
    if ( selectedProviderId === "" ) {
      handleCurrentProvider( empyProvider )
      setShowForm( false );
    } else {
      const selectedProvider = storeProviders.find( ( provider ) => provider.id === Number( selectedProviderId ) );
      setEneableButtonInsert( false );
      handleCurrentProvider( selectedProvider )
      setShowForm( true );
    }
  };

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    handleCurrentProvider( {
      ...storeCuerrentProvider,
      [name]: value
    } );
  };

  const handleNewProvider = () => {
    setEneableButtonInsert( true );
    handleCurrentProvider( empyProvider )
    setShowForm( true );
    window.scrollTo( {
      top: 0,
      behavior: 'smooth'
    } );
  };
  useEffect( () => {
    if ( !objectDeepEqual( storeCuerrentProvider, empyProvider ) ) {
      console.log( storeCuerrentProvider, storeCuerrentProvider )
      setShowForm( true )
    }
  }, [] )

  if ( !storeCuerrentProvider ) {
    handleCurrentProvider( empyProvider )
  }
  if ( storeCuerrentProvider ) {
    return (
      <div className="flex justify-center items-center p-6">
        <form className="w-full max-w-lg lg:max-w-xl bg-white p-6 rounded-lg shadow-md space-y-4"
          onSubmit={( e ) => {
            e.preventDefault();
          }}
        >
          <SelectForm name="providersSelect" value={storeCuerrentProvider.id} options={storeProviders} onChange={handleSelectProviderChange}>Informante:</SelectForm>
          {showForm && (
            <>
              <InputForm name="name" value={storeCuerrentProvider.name} onChange={handleChange} >Nombre:</InputForm>
              <SelectForm name="gender" value={storeCuerrentProvider.gender} options={["Masculino", "Femenino", "Otro"]} onChange={handleChange} >Genero:</SelectForm>
              <InputForm name="occupation" value={storeCuerrentProvider.occupation} onChange={handleChange} >Ocupacion:</InputForm>
              <InputForm name="residence" value={storeCuerrentProvider.residence} onChange={handleChange} >Comunidad o Localidad:</InputForm>
              <SelectForm name="experience_time" value={storeCuerrentProvider.experience_time} options={["Menos de 5 años", "5 - 10 años", "10 - 20 años", "Mas de 20 años"]} onChange={handleChange} >Años de experiecia usando plantas medicinales:</SelectForm>
              <InputForm name="how_experence" value={storeCuerrentProvider.how_experence} onChange={handleChange} >Como adquirio su conocimiento:</InputForm>
              <SelectForm name="opinion_use_plants" value={storeCuerrentProvider.opinion_use_plants} options={["Ha aumentado", "Ha disminuido", "Se ha mantenido igual"]} onChange={handleChange} >Cambio en el uso de plantas medicinales:</SelectForm>
              <SelectForm name="opinion_use_digital" value={storeCuerrentProvider.opinion_use_digital} options={["Muy deacuerdo", "De acuerdo", "Neutral", "En desacuerdo", "Muy en desacuerdo"]} onChange={handleChange} >Acuerdo con la difucion digital:</SelectForm>
            </>
          )}

          {eneableButtonInsert && (
            <div className="space-y-4">
              <CheckBoxFrom checked={preserveKnowledge} onChange={( e ) => setPreserveKnowledge( e.target.checked )}>
                ¿Le gustaría que su conocimiento se preserve a través de la app?
              </CheckBoxFrom>
              <CheckBoxFrom checked={willingToTeach} onChange={( e ) => setWillingToTeach( e.target.checked )}>
                ¿Está dispuesto a enseñar a otras personas?
              </CheckBoxFrom>
              <CheckBoxFrom checked={agreeUseName} onChange={( e ) => setAgreeUseName( e.target.checked )}>
                ¿Está de acuerdo en que su nombre y conocimiento sean usados en la app?
              </CheckBoxFrom>
            </div>
          )}

          <div className="flex justify-between space-x-2">
            <ButtomTypesGoogle
              modalContent={eneableButtonInsert ? `¿Insertar el nuevo informante: ${storeCuerrentProvider.name}?` : null}
              type={eneableButtonInsert ? 'insert' : 'add'}
              onClick={eneableButtonInsert ? handleInsert : handleNewProvider}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              disabled={
                eneableButtonInsert &&
                ( objectDeepEqual( storeCuerrentProvider, empyProvider ) || !( preserveKnowledge && willingToTeach && agreeUseName ) )
              }
            >
            </ButtomTypesGoogle>
            {/* {`${eneableButtonInsert},${objectDeepEqual( storeCuerrentProvider, empyProvider )},${!( preserveKnowledge && willingToTeach && agreeUseName )}`} */}
            {!eneableButtonInsert && showForm && (
              <>
                <ButtomTypesGoogle
                  modalContent="¿Guardar los cambios?"
                  type="update"
                  onClick={handleUpdate}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
                >
                </ButtomTypesGoogle>
                <ButtomTypesGoogle
                  modalContent={`¿Eliminar informante: ${storeCuerrentProvider.name}, permanentemente?`}
                  type="delete"
                  onClick={handleDelete}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                >
                </ButtomTypesGoogle>
              </>
            )}
          </div>
        </form>
      </div>
    );

  }
}
