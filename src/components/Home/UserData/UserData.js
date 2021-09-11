import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useHistory } from 'react-router';
import './UserData.css'
import UserUpdate from '../UserForm/UserUpdate';
import usePasswordToggle from '../Hooks/Hooks';


const UserData = () => {
    const [allUsers, setAllUser] = useState([]);
    const [show, setShow] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [user, setUser] = useState({});
    const history = useHistory();
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [loading, setLoading] = useState(false)
    const updateUser = (user) => {
        setShow(true)
        setUser(user)
    }

    const faArrowLeft = <FontAwesomeIcon icon={faArrowAltCircleLeft} />
    const faArrowRight = <FontAwesomeIcon icon={faArrowAltCircleRight} />

    useEffect(() => {
        const url = 'https://users-authentication.herokuapp.com/auth/all-users'
        axios.get(url)
            .then(data => {
                setAllUser(data.data)
                setLoading(true)
            }
            )
    }, [allUsers])


    const handleDeleteUser = id => {
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this user?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true
        })
            .then(wantDelete => {
                if (wantDelete) {
                    axios.delete(`https://users-authentication.herokuapp.com/user/${id}`)
                        .then(res => {
                            if (res.data) {
                                return swal("Successfully Deleted!", "One User has been successfully deleted.", "success").then(res => history.push('/'));
                            }
                            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
                        })
                        .catch(err => {
                            swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true })
                        })
                }
            });
    }

    const userPerPage = 4
    const pagesVisited = pageNumber * userPerPage
    const displayUsers = allUsers.slice(pagesVisited, pagesVisited + userPerPage).map((user, index) => {
        return (

            <tbody style={{ fontWeight: "500", borderWidth: '15px', borderRadius: '25px' }}>
                <tr>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <div className='d-flex showPassword align-item-center'>
                        <input
                            className="form-control"
                            type={PasswordInputType}
                            value={user.password}
                        />
                        <span className=" mt-2">
                            {ToggleIcon}
                        </span>
                        {/* <input type={passwordShown ? "text" : "password"} className='mr-2 w-100' value={user.password} />
                        <FontAwesomeIcon icon={faEye} size='1x' onClick={togglePasswordVisiblity} /> */}
                    </div>
                    <td className="text-center">
                        <Button className="p-1 mb-0" style={{ borderRadius: "50%", backgroundColor: '#18FF2F', marginRight: '5px' }} onClick={() => updateUser(user)}>
                            <FontAwesomeIcon icon={faEdit} className="mx-1" />
                        </Button>
                        <Button variant="danger" className="p-1 ml-3 mb-0" style={{ borderRadius: "50%" }} onClick={() => handleDeleteUser(user._id)}>
                            <FontAwesomeIcon icon={faTrash} className="mx-1" />
                        </Button>
                    </td>
                </tr>
            </tbody>
        )
    })
    const pageCount = Math.ceil(allUsers.length / userPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <Container>
            <>
                <Table style={{ width: "100%" }} hover responsive>
                    <thead className="shadow p-5" style={{ backgroundColor: '#000000', color: '#FFFFFF', borderRadius: "15px" }} >
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    {loading ?
                        displayUsers
                        :
                        <div className='d-flex justify-content-center'>
                            <div class="spinner-border text-danger mt-2 " role="status">
                            </div>
                        </div>
                    }
                </Table>

                <>
                    <Modal centered show={show} size='lg'>
                        <Modal.Header >
                            <Modal.Title className="text-center mt-2 text-success">Update User</Modal.Title>
                            <Button onClick={() => setShow(false)}>Close</Button>
                        </Modal.Header>
                        <Modal.Body >
                            <UserUpdate user={user} />
                        </Modal.Body>
                    </Modal>
                </>
            </>
            <div className="d-flex justify-content-between mt-5">
                <ReactPaginate
                    previousLabel={faArrowLeft}
                    nextLabel={faArrowRight}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />
                <div>
                    <h6>Showing {displayUsers.length} out of {allUsers.length}</h6>
                </div>
            </div>
        </Container >
    );
};

export default UserData;