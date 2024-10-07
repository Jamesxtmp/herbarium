import { useEffect, useState } from "react";
import { useSessionStore } from "../context/sessionUser";
import { supabase } from "../context/supabaseCreator";


export default function MainView () {
  const [students, setStudents] = useState( [] );

  useEffect( () => {
    getStudents();
  }, [] );

  async function getStudents () {
    const { data } = await supabase.from( "students" ).select( "*" ).eq( 'user_id', userId );
    setStudents( data );
    console.log( data );
  }


  const session = useSessionStore( ( state ) => state.session )
  const userEmail = session.user.email;
  const userId = session.user.id;

  const addRow = async ( studentName ) => {

    const { data, error } = await supabase
      .from( 'students' )
      .insert( [
        { name: studentName, user_id: userId },
      ] )
      .select()
    data && setStudents( [...students, data] )
    error && console.log( "Error al añadir el estudiente" )
  }
  return (
    <div>
      <div>Logged in! {userEmail} : {userId}</div>
      <div onClick={async () => await supabase.auth.signOut()}>
        Salir
      </div>
      <div onClick={() => addRow( "Dulce" )} >Añadir</div>
      <ul>
        {students.map( ( student ) => (
          <li key={student.name}>{student.name}</li>
        ) )}
      </ul>
    </div>
  )
}

/*
const [countries, setCountries] = useState([]);

    useEffect(() => {
      getCountries();
    }, []);

    async function getCountries() {
      const { data } = await supabase.from("countries").select();
      setCountries(data);
    }

    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name}>{country.name}</li>
        ))}
      </ul>
    );

*/