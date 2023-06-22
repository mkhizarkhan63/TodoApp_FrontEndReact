import React, { useMemo, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { addTodo, getAllTodo } from '../actions/TodoAction'
import Notification from './Notification';
import { getTodoById, updateTodo } from '../actions/TodoAction';
interface type {
    isShow: boolean,
    isClose: any,
    todoEditID: number,
    ModalType: number //1 for edit and 0 for add
    currVal: any
}

const CardModal = (props: type) => {

    //  const msg = useSelector((state: any) => state.todos.Response.msg);

    //firing a function
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    //storing text field value
    const [taskInput, settaskInput] = useState('');

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const handleForm = async (e: any) => {

        e.preventDefault();
        if (props.ModalType == 1) {
            //using for edit
            let id = props.currVal.id;
            let task = taskInput;
            dispatch(updateTodo({ id: id, task: task, completed: false, createdDate: '' })).then((res) => {

                dispatch(getAllTodo());
                setNotificationMessage(res);
                setShowNotification(true);
            }).catch((e) => {
                setNotificationMessage(e.message);
                setShowNotification(false);
                console.log(e.message)
            });
            props.isClose();
        }


        else {
            //for using normarlly add
            let taskValue = taskInput;
            if (taskValue == "") {
                setNotificationMessage("Input Field Required");
                setShowNotification(true);
            } else {
                dispatch(addTodo({ id: 0, task: taskValue, completed: false, createdDate: '' })).then((resp) => {

                    setNotificationMessage(resp);
                    setShowNotification(true);
                    settaskInput('');
                    dispatch(getAllTodo());


                }).catch((e) => {
                    setNotificationMessage(e.message);
                    setShowNotification(false);
                    console.log(e.message)
                })
                props.isClose();
            }
        }


    }

    const handleModal = () => {
        props.isClose();
        settaskInput('');
    }

    ///using usesate hook to storing the value
    //check is this edit modal or add modal
    // if (props.ModalType == 1) {
    //     if (props.isShow) { //only calling when modal isshow to true
    //         //dispatch(getTodoById(props.todoEditID)).then((res) => {
    //             //setting the value
    //             setgetById({ id: res?.data?.id, task: res?.data?.task })
    //        // }).catch((e) => { console.log(e) });
    //     }
    // }


    const handleNotificationClose = () => {
        setShowNotification(false);
    };


    return (
        <>
            {showNotification && <Notification message={notificationMessage} show={showNotification} onClose={handleNotificationClose} />}

            <Modal show={props.isShow} onHide={() => handleModal()} >
                <Modal.Header closeButton>
                    <Modal.Title>{(props.ModalType == 1) ? "Edit Todo" : "Add Todo"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup size="sm" className="mb-3">

                        <Form.Control
                            onChange={(e) => settaskInput(e.target.value)}
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            // placeholder={(props.ModalType == 0) ? "Add New Task" }
                            defaultValue={(props.ModalType == 1) ? props.currVal.task : ''}
                            required
                        />
                    </InputGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.isClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => handleForm(e)} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >

        </>
    )
}

export default CardModal