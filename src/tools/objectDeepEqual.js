export function objectDeepEqual ( obj1, obj2, path = '' ) {
  const VERBOSE = false
  if ( obj1 === obj2 ) return true;

  if ( typeof obj1 !== 'object' || obj1 === null ||
    typeof obj2 !== 'object' || obj2 === null ) {
    VERBOSE && console.log( `Difference at ${path}: ${obj1} !== ${obj2}` );
    return false;
  }

  let keys1 = Object.keys( obj1 );
  let keys2 = Object.keys( obj2 );

  if ( keys1.length !== keys2.length ) {
    VERBOSE && console.log( `Different number of keys at ${path}: ${keys1.length} !== ${keys2.length}` );
    return false;
  }

  for ( let key of keys1 ) {
    const newPath = path ? `${path}.${key}` : key;
    if ( !keys2.includes( key ) ) {
      VERBOSE && console.log( `Key "${key}" missing in second object at ${path}` );
      return false;
    }
    if ( !objectDeepEqual( obj1[key], obj2[key], newPath ) ) {
      return false;
    }
  }

  return true;
}