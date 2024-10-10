export function isColorDark ( color ) {
  // Eliminar el símbolo '#' si está presente
  color = color.replace( '#', '' );

  // Convertir el color a valores RGB
  const r = parseInt( color.substring( 0, 2 ), 16 );
  const g = parseInt( color.substring( 2, 4 ), 16 );
  const b = parseInt( color.substring( 4, 6 ), 16 );

  // Calcular el brillo usando la fórmula de luminancia relativa
  const brightness = ( r * 299 + g * 587 + b * 114 ) / 1000;

  // Devolver true si el color es oscuro, false si es claro
  return brightness < 128;
}
