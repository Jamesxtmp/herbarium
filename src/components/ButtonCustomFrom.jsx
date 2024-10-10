import { isColorDark } from "../tools/isColorDArk";

/* eslint-disable react/prop-types */

export default function ButtonCustomForm ( { color, isActive = true, onClick, children } ) {
  const isDark = isColorDark( color );
  const activeStyle = {
    backgroundColor: color,
    color: isDark ? 'white' : 'black',
  };

  const inactiveStyle = {
    backgroundColor: 'gray',
    color: 'black',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-2 px-4 rounded-md"
      style={isActive ? activeStyle : inactiveStyle}
    >
      {children}
    </button>
  );
}