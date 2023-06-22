import React, { useState, useEffect, useMemo } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CardModal from './CardModal';
import Skeleton from './Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { getAllTodo, deleteTodo, setTodoByFilter } from '../actions/TodoAction';
import { AnyAction } from 'redux';
import Notification from './Notification';
import Moment from 'react-moment';
import Search from './Search';
const Cards = () => {
    const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();

    useEffect(() => {
        dispatch(getAllTodo());
    }, [dispatch]);
    const getSelector = useSelector((state: any) => state.todos);
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const [taskId, setTaskId] = useState(0);
    const [modalType, setModalType] = useState(0);
    const [currVal, setCurrVal] = useState({ id: 0, task: '' })

    //delete handle start
    const handleDelete = (e: any, id: number) => {
        e.preventDefault();
        dispatch(deleteTodo(id)).then((resp) => {
            dispatch(getAllTodo());
            setShowNotification(true);
            setNotificationMessage(resp);
        }).catch((e) => {
            setShowNotification(true);
            setNotificationMessage(e.message);
            console.log(e.message);
        })
    }
    //delete handle close

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    //handle for notification passing a func for closing state
    const handleNotificationClose = () => {
        setShowNotification(false);
    };

    const memoizedFunction = useMemo(() => {

        return (x: any) => {
            setShowModal(true);
            setModalType(1); // edit
            setTaskId(x.id);
        };
    }, []);
    const handleEdit = (e: any, x: any) => {
        e.preventDefault();
        const result = memoizedFunction(x);
    }
    //search work
    // const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query: string) => {
        //setSearchQuery(query.trim());

       // const FilterData = getSelector.todos.filter((x: any) => x.task.toLowerCase().includes(query));

        dispatch(setTodoByFilter(query))
        // if (!query)
        //     dispatch(getAllTodo());

    }


    return (
        <>
            {showNotification && <Notification message={notificationMessage} show={showNotification} onClose={handleNotificationClose} />}

            <Card className='text-center cards-bt'>

                <Card.Body>
                    <Card.Header>
                        <div className='searchBoxStyle'>
                            <Search onSearch={handleSearch} />

                        </div>
                    </Card.Header>
                    <Card.Text>
                        {/* showing loading here */}
                        {(getSelector.isLoading == true) ? <Skeleton /> : ''}
                        {/* iterating an object here... */}
                        {

                            getSelector.todos.map((x: any) =>
                                <ListGroup as="ul" key={x.id}>
                                    <ListGroup.Item as="li"><span className='pull-left dateStyle' ><b>Date: </b><Moment format="YYYY-MMM-DD">{x.createdDateTime}</Moment></span>{x.task} <Button variant='light' onClick={(e) => { handleDelete(e, x.id) }} className='pull-right'><FontAwesomeIcon className='text-danger' icon={faTrash} /></Button>

                                        <Button variant='light' className='pull-right' onClick={(e) => { handleEdit(e, x); setCurrVal({ id: x.id, task: x.task }) }}><FontAwesomeIcon className='text-secondary' icon={faEdit} /></Button></ListGroup.Item>
                                </ListGroup>
                            )

                        }
                    </Card.Text>
                    <a href='#' onClick={() => { setShowModal(true); setModalType(0); }} className='btn-design '> <FontAwesomeIcon icon={faPlusCircle} size='lg' /></a>
                </Card.Body>
                {<CardModal isShow={showModal} currVal={currVal} isClose={handleClose} ModalType={modalType} todoEditID={taskId} />}
            </Card>
        </>

    )
}

export default Cards