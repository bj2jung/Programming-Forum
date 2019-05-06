import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
  //   Input,
  //   Form,
  //   FormGroup,
  //   CustomInput
} from "reactstrap";
// import AddTagsModal from "./AddTagsModal";
// import { Mutation } from "react-apollo";
// import { gql } from "apollo-boost";

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>
          Filter Posts
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Filter Posts</ModalHeader>
          <ModalBody>{}</ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Apply
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FilterModal;
