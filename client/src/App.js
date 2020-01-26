import React , { useEffect} from 'react';
import {connect} from 'react-redux'
import AppNav from "./components/AppNavbar"
import ShoppingList from './components/ShoppingList'
import ItemModal from './components/itemModal'
import {Container} from 'reactstrap'
import { loadUser } from './actions/authActions'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  //it s equivalant to  componetdidMount 
  useEffect(()=>{
    store.dispatch(loadUser())
  } )
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

export default connect(null , {loadUser})(App) ;
