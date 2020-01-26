import React from 'react';
import AppNav from "./components/AppNavbar"
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/itemModal'
import {Container} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

function App() {
  return (
    <div className="App">
     <AppNav/>
     <Container>
    <ItemModal/>
     <ShoppingList/>
     </Container>
    </div>
  );
}

export default App;
