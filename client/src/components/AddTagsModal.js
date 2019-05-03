import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  // Form,
  FormGroup
} from "reactstrap";

class AddTagsModal extends React.Component {
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

  updateTagList() {
    let tagList = [1, 2, 3];

    this.setState({
      tagList: tagList
    });
  }

  render() {
    return (
      <div>
        {/* <Form inline onSubmit={e => e.preventDefault()}> */}
        <Button color="secondary" onClick={this.toggle}>
          Add Languages/Skills
        </Button>
        {/* </Form> */}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Add Languagues/Skills</ModalHeader>
          {/* <Form
            onSubmit={e => {
              e.preventDefault();
              this.updateTagList();
            }}
          > */}
          <ModalBody>
            <FormGroup check>
              <Input type="checkbox" /> JavaScript
            </FormGroup>
            <FormGroup check>
              <Input type="checkbox" /> HTML
            </FormGroup>
            <FormGroup check>
              <Input type="checkbox" /> CSS
            </FormGroup>
            <FormGroup check>
              <Input type="checkbox" /> React
            </FormGroup>
            <FormGroup check>
              <Input type="checkbox" /> etcetcetc
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.toggle}>
              Add
            </Button>
          </ModalFooter>
          {/* </Form> */}
        </Modal>
      </div>
    );
  }
}

export default AddTagsModal;
