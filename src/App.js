import Index from  './components/index.js';
import AuthContextProvider from './contexts/AuthContext';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Index/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
