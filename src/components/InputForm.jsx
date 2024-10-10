/* eslint-disable react/prop-types */
export default function InputForm ( { children, name, value, onChange } ) {

  const autoResizeTextarea = ( e ) => {
    e.target.style.height = 'auto'; // Reinicia la altura
    e.target.style.height = `${e.target.scrollHeight}px`; // Ajusta la altura según el contenido
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-2">{children}</label>
      <textarea
        // id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={1}
        onInput={autoResizeTextarea}
        className="w-full p-2 border border-gray-300 rounded-md resize-none"
      />
    </div>
  )
}