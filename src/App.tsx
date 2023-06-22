import React from 'react';
import Cards from './components/Cards';
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
      <div className="container" >
        <div className='text-center' >
          <h1 >Todo-App</h1>
          <Cards />
        </div>
      </div>
    </Provider>
  );
}

export default App;
