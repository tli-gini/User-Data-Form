import React from "react";
import "./App.css";
import UserDataForm from "./components/UserDataForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <UserDataForm />
      </header>
    </div>
  );
};

export default App;
