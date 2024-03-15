import { useState } from "react";
import { GeneralProvider } from "./common/context/general/GeneralContext";
import { GeneralLayout } from "./components/layout/GeneralLayout";
import { LateralMenu } from "./pages/LateralMenu";
import { Configurations } from "./pages/Configurations";
import { Home } from "./pages/Home";
import { ScreenProvider } from "./common/context/screen/ScreenContext";

function App() {
  const [opc, setOpc] = useState(0);
  return (
    <GeneralProvider>
      <ScreenProvider>
        <GeneralLayout>
          <LateralMenu setOpc={setOpc} />
          {opc === 0 ? <Home /> : <Configurations />}
        </GeneralLayout>
      </ScreenProvider>
    </GeneralProvider>
  );
}

export default App;
