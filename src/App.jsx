import { useState } from "react";
import { GeneralProvider } from "./common/context/general/GeneralContext";
import { GeneralLayout } from "./components/layout/GeneralLayout";
import { LateralMenu } from "./pages/LateralMenu";
import { Configurations } from "./pages/Configurations";
import { Home } from "./pages/Home";

function App() {
  const [opc, setOpc] = useState(0);
  return (
    <GeneralProvider>
      <GeneralLayout>
        <LateralMenu setOpc={setOpc} />
        {opc === 0 ? <Home /> : <Configurations />}
      </GeneralLayout>
    </GeneralProvider>
  );
}

export default App;
