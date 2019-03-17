import React, { Component } from 'react';
import { CustomInput, Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';

class QuestionRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      question: props.question
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <tr key={this.state.question.id.toString()}>
        <td className="text-left">
          <Card>
            <CardHeader>
              <strong>
                Tiêu chí {this.state.question.id + 1}: {this.state.question.name}
              </strong>
              <Button color="link" onClick={this.toggle} className="float-right" id={'toggleCollapse' + this.state.question.id}>
                Xem tiêu chí đánh giá
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <CardBody>
                - <strong>Mức Đạt:</strong> {this.state.question.pass} <br />- <strong>Mức Khá:</strong> {this.state.question.good} <br />-{' '}
                <strong>Mức Tốt:</strong> {this.state.question.veryGood}
              </CardBody>
            </Collapse>
          </Card>
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.question.id + 'CD'}
            name={this.state.question.id}
            value={1}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.question.id + 'D'}
            name={this.state.question.id}
            value={2}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.question.id + 'K'}
            name={this.state.question.id}
            value={3}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.question.id + 'T'}
            name={this.state.question.id}
            value={4}
            onChange={this.props.onChange}
          />
        </td>
      </tr>
    );
  }
}

export default QuestionRow;
