/* eslint-disable react/prop-types */
export default function SelectForm ( { children, name, value, options, onChange } ) {
  return (
    <div>
      <label htmlFor="name" className="block mb-2">{children}</label>
      <select
        // id="name"
        name={name}
        onChange={onChange}
        className="w-full p-2 border border-gray-300 rounded-md"
        {...( value !== undefined && { value } )}
      >
        <option selected value="">--No ha seleccionado--</option>
        {options.map( ( value, i ) => (
          <option key={i} value={value.id || value}>
            {value.name || value}
          </option>
        ) )}
      </select>
    </div>
  )
}