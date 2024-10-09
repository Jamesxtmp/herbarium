/* eslint-disable react/prop-types */
import { useState } from 'react';

export function ComboBox ( { options, name, value, onChange } ) {
  const [isEditing, setIsEditing] = useState( false );
  const [inputValue, setInputValue] = useState( value || '' );

  const handleInputChange = ( e ) => {
    setInputValue( e.target.value );
    onChange( { target: { name, value: e.target.value } } );
  };

  const handleSelectChange = ( e ) => {
    setInputValue( e.target.value );
    onChange( e );
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={() => setIsEditing( false )}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      ) : (
        <select
          value={inputValue}
          onChange={handleSelectChange}
          onDoubleClick={() => setIsEditing( true )} // Cambiar a modo de edición al hacer doble clic
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">--Selecciona o escribe--</option>
          {options.map( ( option, i ) => (
            <option key={i} value={option}>
              {option}
            </option>
          ) )}
        </select>
      )}
    </div>
  );
}
