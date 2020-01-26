import React, { Component } from "react";
import Swal from "sweetalert2"
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";





class itemModal extends Component {
  state = {
    modalOpen: false,
    name: ""
  };
  toggle = () => this.setState({ modalOpen: !this.state.modalOpen });
  onSubmit = e => {
    const newItem = {
      name: this.state.name,
    
    };
    e.preventDefault();
    if (this.state.name && this.state.name.trim() !== "")
      this.props.addItem(
        //add new item
        newItem,
        //reset the state
        this.setState({ name: "" }),
        // close modal
        this.toggle()
      );
    else Swal.fire({
        title: 'Error!',
        text: 'Enter a Valid Item',
        icon: 'error',
        confirmButtonText: 'OK'
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add item
        </Button>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader>Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item </Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item ..."
                  onChange={this.onChange}
                />
                <Button 
                color="primary"
                style={{marginTop:"2rem"}}
                >Confirm </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { addItem })(itemModal);
