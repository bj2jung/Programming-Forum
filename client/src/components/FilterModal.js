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
const history = createBrowserHistory();
// const history = createBrowserHistory({ forceRefresh: true });

class FilterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      unmountOnClose: true,
      isProject: 0,
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

  handleIsProjectCheckboxCheck(e) {
    const isProjectCheckBoxes = document.querySelectorAll(".isProjectCheckBox");
    const tempValue =
      (isProjectCheckBoxes[0].checked ? 1 : 0) +
      (isProjectCheckBoxes[1].checked ? 2 : 0);

    this.setState({
      isProject: tempValue
    });
  }

  isProjectCheckboxDefaultChecked(option) {
    if (
      option === "Project" &&
      Number(this.props.currentIsProjectFilter) === 1
    ) {
      return true;
    } else if (
      option === "Individual" &&
      Number(this.props.currentIsProjectFilter) === 2
    ) {
      return true;
    } else if (
      Number(this.props.currentIsProjectFilter) === 0 ||
      Number(this.props.currentIsProjectFilter) === 3
    ) {
      return true;
    } else {
      return false;
    }
  }

  createIsProjectCheckBox = option => (
    <FormGroup check key={option}>
      <Input
        type="checkbox"
        onChange={e => this.handleIsProjectCheckboxCheck(e)}
        value={option}
        className="isProjectCheckBox"
        defaultChecked={this.isProjectCheckboxDefaultChecked(option)}
      />
      {option}
    </FormGroup>
  );

  createIsProjectCheckBoxes = () => {
    return ["Project", "Individual"].map(option =>
      this.createIsProjectCheckBox(option)
    );
  };

  clearFilter = () => {
    history.push(`/`);
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      tags: []
    }));
    if (!this.state.modal) {
      this.setState({
        isProject: 0,
        tags: this.props.currentTagFilter
      });
    }
  }

  createTagCheckBox = tagName => (
    <FormGroup check key={tagName}>
      <Input
        type="checkbox"
        onChange={e => this.handleTagCheckboxCheck(e)}
        value={tagName}
        defaultChecked={this.props.currentTagFilter.includes(tagName)}
      />
      {tagName}
    </FormGroup>
  );

  createTagCheckBoxes = () => {
    return listOfTags.map(tagName => this.createTagCheckBox(tagName));
  };

  handleApplyFilter = () => {
    const filterQueryString = queryString.stringify(
      { tags: this.state.tags, isProject: this.state.isProject },
      { arrayFormat: "comma" }
    );

    this.toggle();
    history.push(`/home/${filterQueryString}`);

    ////
    const historyStateObjFilter = {
      tags: this.state.tags,
      isProject: this.state.isProject
    };
    window.history.pushState(historyStateObjFilter, "");
    ////
  };

  render() {
    return (
      <div>
        <Button color="secondary" onClick={this.toggle}>
          Filter Posts
        </Button>
        <Button color="secondary" onClick={this.clearFilter}>
          Clear Filter
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          unmountOnClose={this.state.unmountOnClose}
        >
          <ModalHeader toggle={this.toggle}>Filter Posts</ModalHeader>
          <ModalBody>{this.createIsProjectCheckBoxes()}</ModalBody>
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
