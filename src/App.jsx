/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Route, Switch, useLocation } from "wouter";
import PlantsForm from "./Views/PlantsForm";
import ProvidersFrom from "./Views/ProvidersFrom";
import { useEffect } from "react";
import supabseControls from "./hooks/supabseControls";
import { useProvidersStore } from "./context/providersStore";
import { usePlantsStore } from "./context/plantsStore";
import Home from "./Views/Home";
import { Settings } from "@mui/icons-material";

function NotFound () {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1>404: Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/" className="text-blue-500 underline">
        Volver al inicio
      </Link>
    </div>
  );
}

export default function App () {
  const [location, setLocation] = useLocation();

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
  const goToForm = () => {
    setLocation( "/plantsform" );
  };
  const goToHome = () => {
    setLocation( "/" );
  };


  return (
    <>
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-green-700 cursor-pointer"
            onClick={goToHome}
          >
            Herbarium
          </h1>
          {location === "/plantsform" | location === "/providersform"
            ?
            <>
              <Link
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shrink-0 w-min"
                href="/plantsform"
              >
                Plantas
              </Link>
              <Link
                className="bg-violet-500 hover:bg-violet-600 text-white py-2 px-4 rounded-md shrink-0 w-min"
                href="/providersform"
              >
                Informantes
              </Link>
            </>
            : null
          }
        </div>
        {location === "/" &&
          <button className="text-gray-500 hover:text-gray-700"
            onClick={goToForm}
          >
            <Settings></Settings>
          </button>
        }
      </div>

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