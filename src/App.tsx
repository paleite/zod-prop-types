import { useState } from "react";
import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { MyComponent } from "./MyComponent";
import { MyComponentWithPropTypes } from "./MyComponentWithPropTypes";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        MyComponent:{" "}
        <MyComponent
          name="John"
          age={42}
          contact={{
            email: "valid@email.com",
            phone: "1",
            postAddress: {
              street: 1 as unknown as string,
              number: 2 as unknown as string,
            },
          }}
        />
        MyComponentWithPropTypes:{" "}
        <MyComponentWithPropTypes
          name="John"
          age={42}
          contact={{
            email: "valid@email.com",
            phone: "1",
            postAddress: {
              street: 1 as unknown as string,
              number: 2 as unknown as string,
            },
          }}
        />
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1);
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
