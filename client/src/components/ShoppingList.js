import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button  } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {connect} from 'react-redux'
import {getItems , deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'


class ShoppingList extends Component {
  
  componentDidMount=()=>this.props.getItems()
 
  
  render() {
    const { items } = this.props.item;
   
    return (
      <Container>
       
       
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(item => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    style={{
                      margin: "0 1rem 0",
                      fontSize: "1.5rem",
                      padding: "0 0.5rem",
                      textAlign: "center"
                    }}
                    onClick={() => this.props.deleteItem(item._id)}
                  >
                    &times;
                  </Button>
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
ShoppingList.propTypes = {
  getItems : PropTypes.func.isRequired,
  item:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  item:state.item
})

export default connect(mapStateToProps,{getItems , deleteItem })(ShoppingList);
