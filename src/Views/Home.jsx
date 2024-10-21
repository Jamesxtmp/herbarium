import { useState, useEffect } from "react";
import { usePlantsStore } from "../context/plantsStore"

export default function Home () {
  const allPlants = usePlantsStore( state => state.plants )
  const [searchTerm, setSearchTerm] = useState( "" );
  const [filteredPlants, setFilteredPlants] = useState( allPlants );
  const [currentPage, setCurrentPage] = useState( 1 );
  const itemsPerPage = 6;

  useEffect( () => {
    const searchWords = searchTerm.toLowerCase().split( /\s+/ ).filter( word => word.length > 0 );

    const results = allPlants.filter( plant => {
      const plantValues = Object.values( plant ).join( " " ).toLowerCase();
      return searchWords.every( word => plantValues.includes( word ) );
    } );

    setFilteredPlants( results );
    setCurrentPage( 1 );
  }, [searchTerm, allPlants] );

  // Paginated plants
  const indexOfLastPlant = currentPage * itemsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - itemsPerPage;
  const currentPlants = filteredPlants.slice( indexOfFirstPlant, indexOfLastPlant );

  const totalPages = Math.ceil( filteredPlants.length / itemsPerPage );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {/* Search*/}
      <div className="bg-white p-4 shadow-sm">
        <input
          type="text"
          placeholder="Buscar"
          className="border border-gray-300 p-2 rounded-md w-full outline-none"
          value={searchTerm}
          onChange={( e ) => setSearchTerm( e.target.value )}
        />
      </div>

      {/* Plant Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {currentPlants.map( ( plant ) => (
          <div
            key={plant.id}
            className="bg-white border border-gray-200 p-4 rounded-md shadow-sm"
          >
            <div className="flex">
              <div className="bg-green-200 p-1 rounded-md flex-shrink-0">
                <img src={plant.image} alt="Plant" className="w-24 h-24" />
              </div>
              <div className="ml-4">
                <h2 className="text-md font-semibold">{plant.name}</h2>
                <p className="text-sm text-gray-600">{plant.use}</p>
              </div>
            </div>
          </div>
        ) )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from( { length: totalPages }, ( _, index ) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage( index + 1 )}
            className={`p-2 border border-gray-300 rounded-md ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-white text-black'
              }`}
          >
            {index + 1}
          </button>
        ) )}
      </div>
    </div>
  );
}