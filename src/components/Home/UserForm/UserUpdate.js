import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const UserUpdate = (props) => {
    const { register, handleSubmit, reset } = useForm();
    const [updateData, setUpdateData] = useState({})

    const onSubmit = data => {
        const updateData = {
            id : props.user._id,
            firstName: data.firstName,
            lastName: data.lastName,
            userName: data.userName,
            email: data.email
        }
        const url = `https://users-authentication.herokuapp.com/user/${props.user._id}`
        axios.patch(url, updateData)
            .then(res => {
                if (res.data) {
                    reset();
                    return swal(`Successfully Updated User`)
                    .then(result => setUpdateData(res.data))
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }
    return (
        <div>
            <div className="container">
                <h2 className='text-center'><FontAwesomeIcon icon={faUser} size='1x' /> Update Management</h2>

                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3"  >
                        <input className='form-control' defaultValue={updateData.firstName || props.user.firstName} type="text" {...register("firstName", { required: true })} placeholder="First Name" />
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' defaultValue={updateData.lastName || props.user.lastName} type="text" {...register("lastName", { required: true })} placeholder="Last Name" />
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' defaultValue={updateData.userName || props.user.userName} type="text" {...register("userName", { required: true })} placeholder="Username" />
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' defaultValue={updateData.email || props.user.email} type="email" {...register("email", { required: true })} placeholder="Email" />
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' style={{ backgroundColor: '#0075FF', color: '#FFFFFF' }} type="submit" value='Update User' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;