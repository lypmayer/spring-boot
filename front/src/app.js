import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import {Container, Row, Col} from 'reactstrap';

export default props => (
    <div className="content">
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Routes />
                </Col>
            </Row>
        </Container>
    </div>
);    