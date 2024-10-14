/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

export default function InputForm ( { children, name, value, onChange } ) {
  const textareaRef = useRef( null );

  useEffect( () => {
    if ( textareaRef.current ) {
      autoResizeTextarea();
    }
  }, [value] );

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if ( textarea ) {
      textarea.style.height = 'auto'; // Reinicia la altura
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura según el contenido
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2">{children}</label>
      <textarea
        ref={textareaRef}
        name={name}
        value={value}
        onChange={onChange}
        rows={1}
        onInput={autoResizeTextarea}
        className="w-full p-2 border border-gray-300 rounded-md resize-none overflow-hidden" // Añadir overflow-hidden
      />
    </div>
  );
}
