import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

class Upload extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState } });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Credit Card</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
                
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Upload</Label>
                      <FilePond allowMultiple={true} />
                    </FormGroup>
                  </Col>
                </Row>
              
            
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Upload;
