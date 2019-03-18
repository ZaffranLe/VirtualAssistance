import React, { Component } from 'react';
import { CustomInput, Card, CardHeader, CardBody, Button, Collapse } from 'reactstrap';

class QuestionRow extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      criteriaEvaluate: props.criteriaEvaluate
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <tr key={this.state.criteriaEvaluate.id.toString()}>
        <td className="text-left">
          <Card>
            <CardHeader>
              <strong>
                Tiêu chí {this.state.criteriaEvaluate.id}: {this.state.criteriaEvaluate.content}
              </strong>
              <Button color="link" onClick={this.toggle} className="float-right" id={'toggleCollapse' + this.state.criteriaEvaluate.id}>
                Xem tiêu chí đánh giá
              </Button>
            </CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <CardBody>
                - <strong>Mức Đạt:</strong> {this.state.criteriaEvaluate.pass} <br />- <strong>Mức Khá:</strong>{' '}
                {this.state.criteriaEvaluate.good} <br />- <strong>Mức Tốt:</strong> {this.state.criteriaEvaluate.excellent}
              </CardBody>
            </Collapse>
          </Card>
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'CD'}
            name={this.state.criteriaEvaluate.id}
            value={1}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'D'}
            name={this.state.criteriaEvaluate.id}
            value={2}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'K'}
            name={this.state.criteriaEvaluate.id}
            value={3}
            onChange={this.props.onChange}
          />
        </td>
        <td className="align-middle">
          <CustomInput
            type="radio"
            id={this.state.criteriaEvaluate.id + 'T'}
            name={this.state.criteriaEvaluate.id}
            value={4}
            onChange={this.props.onChange}
          />
        </td>
      </tr>
    );
  }
}

export default QuestionRow;
