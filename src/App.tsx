import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CodeGPT</h1>
      </header>
      <main>
        <ChatWindow />
        <ChatInput />
      </main>
    </div>
  );
};

export default App;
