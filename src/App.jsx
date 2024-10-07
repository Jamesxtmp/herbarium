import { Link, Route, Switch } from "wouter";
import PlantsForm from "./Views/PlantsForm";
import ProvidersFrom from "./Views/ProvidersFrom";

export default function App () {
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

      {/* 
      Routes below are matched exclusively -
      the first matched route gets rendered
    */}
      <Switch>
        <Route path="/plantsform" component={PlantsForm} />
        <Route path="/providersform" component={ProvidersFrom} />

        {/* <Route path="/users/:name">
          {( params ) => <>Hello, {params.name}!</>}
        </Route> */}

        {/* Default route in a switch */}
        {/* <Route>404: No such page!</Route> */}
      </Switch>
    </>
  )

}