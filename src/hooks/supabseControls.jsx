import { supabase } from "../context/supabaseCreator";

export default function supabseControls () {

  async function getPlantById ( id ) {
    let { data: plant, error } = await supabase
      .from( 'plants' )
      .select( '*' )
      .eq( 'id', id )
      .single();
    if ( error ) {
      console.error( error );
    } else {
      return plant;
    }
  }

  //Plants
  async function insertPlant ( plant ) {
    const { name, another_name, use_part, use, preparation, frecuency, warning, combination, image, provider } = plant;
    const { data, error } = await supabase
      .from( 'plants' )
      .insert( [
        { name, another_name, use_part, use, preparation, frecuency, warning, combination, image, provider },
      ] )
      .select();
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function updatePlant ( id, updatedPlant ) {
    console.log( "supabase UPDATE: ", id, updatedPlant );

    const { name, another_name, use_part, use, preparation, frecuency, warning, combination, image, provider } = updatedPlant;
    const { data, error } = await supabase
      .from( 'plants' )
      .update( { name, another_name, use_part, use, preparation, frecuency, warning, combination, image, provider } )
      .eq( 'id', id )
      .select();
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function deletePlant ( id ) {
    console.log( id )
    const { data, error } = await supabase
      .from( 'plants' )
      .delete()
      .eq( 'id', id )
      .select();
    console.log( data, error );
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function getAllPlants () {
    let { data, error } = await supabase
      .from( 'plants' )
      .select( '*' );
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function uploadImage ( file ) {
    if ( !file ) return;
    const { data, error } = await supabase.storage
      .from( 'plants' )
      .upload( `public/${file.name}`, file );
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  };



  //Providers
  async function insertProvider ( provider ) {
    const { name, gender, occupation, residence, experience_time, how_experence, opinion_use_plants, opinion_use_digital } = provider;
    console.log( "control: ", name, gender, occupation, residence, experience_time, how_experence, opinion_use_plants, opinion_use_digital )
    const { data, error } = await supabase
      .from( 'providers' )
      .insert( [
        { name, gender, occupation, residence, experience_time, how_experence, opinion_use_plants, opinion_use_digital },
      ] )
      .select();
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function updateProvider ( id, updatedProvider ) {
    console.log( "supabase UPDATE: ", id, updatedProvider );

    const { name, gender, occupation, residence, experience_time, how_experence, opinion_use_plants, opinion_use_digital } = updatedProvider;
    const { data, error } = await supabase
      .from( 'providers' )
      .update( { name, gender, occupation, residence, experience_time, how_experence, opinion_use_plants, opinion_use_digital } )
      .eq( 'id', id )
      .select();
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function deleteProvider ( id ) {
    console.log( id )
    const { data, error } = await supabase
      .from( 'providers' )
      .delete()
      .eq( 'id', id )
      .select();
    console.log( data, error );
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  async function getAllProviders () {
    let { data, error } = await supabase
      .from( 'providers' )
      .select( '*' );
    if ( error ) { console.error( error ) }
    if ( !error ) { return data }
  }

  return {
    getPlantById, insertPlant, updatePlant, deletePlant, getAllPlants, uploadImage,
    insertProvider, updateProvider, deleteProvider, getAllProviders
  }
}
