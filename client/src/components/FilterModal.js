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
import queryString from "query-string";

import listOfTags from "../assets/listOfTags";

import { createBrowserHistory } from "history";
const history = createBrowserHistory({ forceRefresh: true });

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      isProject: null,
      tags: []
    };
    this.toggle = this.toggle.bind(this);
  }

  handleTagCheckboxCheck(e) {
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

  handleIsProjectCheckboxCheck(e) {}

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      tags: [],
      isProject: null
    }));
  }

  createTagCheckBox = tagName => (
    <FormGroup check key={tagName}>
      <Input
        type="checkbox"
        onChange={e => this.handleTagCheckboxCheck(e)}
        value={tagName}
      />
      {tagName}
    </FormGroup>
  );

  createTagCheckBoxes = () => {
    return listOfTags.map(tagName => this.createTagCheckBox(tagName));
  };

  handleApplyFilter = () => {
    const filterQueryString = queryString.stringify(
      { filter: this.state.tags },
      { arrayFormat: "comma" }
    );
    this.toggle();
    history.push(`/?${filterQueryString}`);
  };

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
          <ModalBody>
            <FormGroup check key="Project">
              <Input
                type="checkbox"
                onChange={e => this.handleIsProjectCheckboxCheck(e)}
                value="Project"
                defaultChecked={true}
              />
              Project
            </FormGroup>
            <FormGroup check key="Individual">
              <Input
                type="checkbox"
                onChange={e => this.handleIsProjectCheckboxCheck(e)}
                value="Individual"
                defaultChecked={true}
              />
              Individual
            </FormGroup>
          </ModalBody>
          <ModalBody>{this.createTagCheckBoxes()}</ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              color="primary"
              onClick={this.handleApplyFilter}
            >
              Apply
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FilterModal;
