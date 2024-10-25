/* eslint-disable react/prop-types */
import { usePlantsStore } from '../context/plantsStore';
import { useProvidersStore } from '../context/providersStore';
import { useRoute } from 'wouter';

export default function PlantDetail () {
  const [, params] = useRoute( '/plant/:id' );
  const allPlants = usePlantsStore( state => state.plants );
  const allProviders = useProvidersStore( state => state.providers );

  if ( !params ) {
    return null
  }
  const plant = allPlants.find( p => p.id === parseInt( params.id ) );
  const provider = allProviders.find( p => p.id == plant.provider );
  if ( !plant ) {
    return <div>Planta no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-4 shadow-md m-5">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-64 md:h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-2/3 p-4 sm:p-6">
            <h1 className="text-3xl font-bold mb-2">{plant.name}</h1>
            <h2 className="text-xl text-gray-600 mb-4">{plant.another_name}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem title="Parte utilizada" content={plant.use_part} />
              <DetailItem title="Uso" content={plant.use} />
              <DetailItem title="Preparación" content={plant.preparation} />
              <DetailItem title="Frecuencia" content={plant.frecuency} />
              <DetailItem title="Advertencia" content={plant.warning} />
              <DetailItem title="Combinación" content={plant.combination} />
              <DetailItem title="Proveedor" content={provider ? provider.name : 'No especificado'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem ( { title, content } ) {
  return (
    <div className="mb-4">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-gray-700">{content || 'No especificado'}</p>
    </div>
  );
}
