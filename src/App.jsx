/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Route, Switch } from "wouter";
import PlantsForm from "./Views/PlantsForm";
import ProvidersFrom from "./Views/ProvidersFrom";
import { useEffect } from "react";
import supabseControls from "./hooks/supabseControls";
import { useProvidersStore } from "./context/providersStore";
import { usePlantsStore } from "./context/plantsStore";

function Home () {
  return (
    <div>
      <h1>Bienvenido a la Aplicación</h1>
    </div>
  );
}

function NotFound () {
  return (
    <div>
      <h1>404: Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}

export default function App () {

  const { getAllProviders, getAllPlants } = supabseControls()
  const setInStoreProviders = useProvidersStore( ( state ) => state.setProviders )
  const setInStorePlants = usePlantsStore( ( state ) => state.setPlants )

  const handleStoreProviders = async () => {
    const allProviders = await getAllProviders();
    setInStoreProviders( allProviders );
  };
  const handleStorePlants = async () => {
    const allPlants = await getAllPlants();
    setInStorePlants( allPlants )
  };

  useEffect( () => {
    handleStorePlants()
    handleStoreProviders()
  }, [] )


  return (
    <>
      <Link
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
        href="/plantsform"
      >
        Plantas
      </Link>
      <Link
        className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded-md"
        href="/providersform"
      >
        Informantes
      </Link>

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/plantsform" component={PlantsForm} />
        <Route path="/providersform" component={ProvidersFrom} />

        <Route component={NotFound} />
        {/* <Route path="/users/:name">
          {( params ) => <>Hello, {params.name}!</>}
        </Route> */}
      </Switch>
    </>
  )

}