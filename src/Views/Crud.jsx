import { useEffect, useState } from "react";
import { supabase } from "../context/supabaseCreator";

export default function Crud () {
  const [plant, setPlant] = useState( {
    id: '',
    name: '',
    another_name: '',
    use_part: '',
    use: '',
    preparation: '',
    frecuency: '',
    warning: '',
    combination: ''
  } );

  useEffect( () => {
    getAllPlants();
  }, [] );

  async function getAllPlants () {
    let { data: plants, error } = await supabase
      .from( 'plants' )
      .select( '*' );
    console.log( plants, error );
  }

  async function getPlantById ( id ) {
    let { data: plant, error } = await supabase
      .from( 'plants' )
      .select( '*' )
      .eq( 'id', id )
      .single();
    if ( error ) {
      console.error( error );
    } else {
      setPlant( plant );
    }
  }

  async function insertPlant ( plant ) {
    const { name, another_name, use_part, use, preparation, frecuency, warning, combination } = plant;
    const { data, error } = await supabase
      .from( 'plants' )
      .insert( [
        { name, another_name, use_part, use, preparation, frecuency, warning, combination },
      ] )
      .select();
    console.log( data, error );
  }

  async function updatePlant ( id, updatedPlant ) {
    const { name, another_name, use_part, use, preparation, frecuency, warning, combination } = updatedPlant;
    const { data, error } = await supabase
      .from( 'plants' )
      .update( { name, another_name, use_part, use, preparation, frecuency, warning, combination } )
      .eq( 'id', id )
      .select();
    console.log( data, error );
  }

  async function deletePlant ( id ) {
    const { data, error } = await supabase
      .from( 'plants' )
      .delete()
      .eq( 'id', id )
      .select();
    console.log( data, error );
    if ( !error ) {
      setPlant( {
        id: '',
        name: '',
        another_name: '',
        use_part: '',
        use: '',
        preparation: '',
        frecuency: '',
        warning: '',
        combination: ''
      } );
    }
  }

  const handleChange = ( e ) => {
    const { name, value } = e.target;
    setPlant( prevState => ( {
      ...prevState,
      [name]: value
    } ) );
  };

  const handleSearch = () => {
    getPlantById( plant.id );
  };

  const handleDelete = () => {
    deletePlant( plant.id );
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="id"
          value={plant.id}
          onChange={handleChange}
          placeholder="ID"
        />
        <button type="button" onClick={handleSearch}>Buscar</button>
        <input
          type="text"
          name="name"
          value={plant.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="another_name"
          value={plant.another_name}
          onChange={handleChange}
          placeholder="Another Name"
        />
        <input
          type="text"
          name="use_part"
          value={plant.use_part}
          onChange={handleChange}
          placeholder="Use Part"
        />
        <input
          type="text"
          name="use"
          value={plant.use}
          onChange={handleChange}
          placeholder="Use"
        />
        <input
          type="text"
          name="preparation"
          value={plant.preparation}
          onChange={handleChange}
          placeholder="Preparation"
        />
        <input
          type="text"
          name="frecuency"
          value={plant.frecuency}
          onChange={handleChange}
          placeholder="Frecuency"
        />
        <input
          type="text"
          name="warning"
          value={plant.warning}
          onChange={handleChange}
          placeholder="Warning"
        />
        <input
          type="text"
          name="combination"
          value={plant.combination}
          onChange={handleChange}
          placeholder="Combination"
        />
        <button type="button" onClick={() => insertPlant( plant )}>Insert Plant</button>
        <button type="button" onClick={() => updatePlant( plant.id, plant )}>Update Plant</button>
        <button type="button" onClick={handleDelete}>Eliminar</button>
      </form>
    </div>
  );
}
