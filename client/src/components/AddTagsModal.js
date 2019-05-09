import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup
} from "reactstrap";

import listOfTags from "../assets/listOfTags";

class AddTagsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      tags: []
    };

    this.toggle = this.toggle.bind(this);
    this.updateTags = this.updateTags.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleCheckboxCheck(e) {
    let arr = this.state.tags;
    if (e.target.checked) {
      arr.push(e.target.value);
      this.setState({
        tags: arr
      });
    } else if (!e.target.checked) {
      this.setState({
        tags: arr.filter(tag => {
          return tag !== e.target.value;
        })
      });
    }
  }

  createTagCheckBox = tagName => (
    <FormGroup check key={tagName}>
      <Input
        type="checkbox"
        onChange={e => this.handleCheckboxCheck(e)}
        value={tagName}
      />
      {tagName}
    </FormGroup>
  );

  createTagCheckBoxes = () => {
    return listOfTags.map(tagName => this.createTagCheckBox(tagName));
  };

  updateTags() {
    this.toggle();
    this.props.retrieveTagsArray(this.state.tags);
  }

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>
          Add Languages/Skills
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Add Languagues/Skills</ModalHeader>

          <ModalBody>{this.createTagCheckBoxes()}</ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.updateTags}>
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddTagsModal;
