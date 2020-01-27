import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

class RegisterModal extends Component {
  state = {
    modalOpen: false,
    name: "",
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuth: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error , isAuth } = this.props;
    if (error !== prevProps.error) {
      //Chek for register error
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else this.setState({ msg: null });
    }
    //if Auth close modal
    if(this.state.modalOpen === true ){
     if(isAuth){
         this.toggle()
     }


    }
  }

  toggle = () => {
    //Clear Errors
    this.props.clearErrors();
    this.setState({ modalOpen: !this.state.modalOpen });
  };
  onSubmit = e => {
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    e.preventDefault();
    //Attempt to Register
    this.props.register(newUser);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggle}>
          <ModalHeader>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name </Label>
                <Input
                  className="mb-3"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name "
                  onChange={this.onChange}
                />
                <Label for="email">Email address </Label>
                <Input
                  className="mb-3"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email "
                  onChange={this.onChange}
                />
                <Label for="password">Password </Label>
                <Input
                  className="mb-3"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="**********"
                  onChange={this.onChange}
                />
                <Button color="primary" style={{ marginTop: "2rem" }}>
                  Register{" "}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
