/* eslint-disable react/prop-types */
export default function CheckBoxFrom ( { children, checked, onChange } ) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-2"
      />
      <label>{children}</label>
    </div>
  )
}
