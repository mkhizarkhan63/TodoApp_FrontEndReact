import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

type notifyType = {
    message: String,
    show: boolean;
    onClose: () => void;

}



function Notification(props: notifyType) {
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        props.onClose();
    };
    return (
        <Row >
            <Col xs={6}>
                <Toast style={{
                    "position": "fixed",
                    "top": "0",
                    "right": "calc(53px)"
                }} onClose={() => handleClose()} show={props.show} delay={2000} autohide>
                    <Toast.Header style={{ "float": "right" }}>


                    </Toast.Header>
                    <Toast.Body>{props.message}</Toast.Body>
                </Toast>
            </Col>
            {/* <Col xs={6}>
                <Button onClick={() => setShow(true)}>Show Toast</Button>
            </Col> */}
        </Row>
    );
}

export default Notification;