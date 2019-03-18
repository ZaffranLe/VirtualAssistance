import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, FormGroup, Label, Row, FormText, Input, Button } from 'reactstrap';
import { FilePond } from 'react-filepond';
// tslint:disable-next-line:no-submodule-imports
import 'filepond/dist/filepond.min.css';
import type from '../../notification/TheLoaiVanBanData';

function TypeOption(props) {
  const typeOption = props.type;
  return (
    <option key={typeOption.id.toString()} value={typeOption.name}>
      {typeOption.name}
    </option>
  );
}

class UploadDocument extends React.Component<any, any> {
  componentDidMount() {}
  constructor(props) {
    super(props);

    this.state = {
      share: false
    };
  }

  handleShare = () => {
    if (this.state.share) {
      this.setState({ share: false });
    } else {
      this.setState({ share: true });
    }
  };

  render() {
    const typeList = type;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>Upload Tài Liệu</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col lg={3}>
                    <FormGroup>
                      <Label>Upload</Label>
                      <FilePond allowMultiple />
                    </FormGroup>
                  </Col>
                  <Col lg={9}>
                    <Row>
                      <Col lg={12}>
                        <FormGroup>
                          <Label>Tên tài liệu</Label>
                          <Input type="text" placeholder="Nhập tên tài liệu" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <FormGroup>
                          <Label>Loại tài liệu</Label>
                          <Input type="select" name="select" id="select">
                            <option value="">Lựa chọn</option>
                            {typeList.map((typeDetail, index) => <TypeOption key={index} type={typeDetail} />)}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <FormGroup>
                          <Label>Tag</Label>
                          <Input type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={2}>
                        <FormGroup check className="checkbox">
                          <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" onChange={this.handleShare} />
                          <Label check className="form-check-label" htmlFor="checkbox1">
                            Công khai
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col lg={10}>
                        <FormGroup>
                          <FormText>Thành viên chia sẻ</FormText>
                          <Input disabled={this.state.share} placeholder="Thành viên chia sẻ..." />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <Button className="float-right" color="primary">
                          <i className="fa fa-save" /> Lưu tài liệu
                        </Button>
                      </Col>
                    </Row>
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

export default UploadDocument;
