import { useState } from "react";
import { Button } from "@chakra-ui/react";

import Providers from "./Providers";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Providers>
      <h1>Vite + React</h1>
      <div>
        <Button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Providers>
  );
}

export default App;
