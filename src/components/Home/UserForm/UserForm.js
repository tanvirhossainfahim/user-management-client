import React from 'react';
import { useForm } from "react-hook-form";
import './UserForm.css'
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserForm = (props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const url = 'https://users-authentication.herokuapp.com/auth/register'
        axios.post(url, data)
            .then(res => {
                if (res) {
                    // toast.dismiss(loading);
                    reset();
                    return swal(`Successfully Create User `, 'Please check user list').then(res => console.log('donne'));
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", { dangerMode: true });
            })
    }

    return (
            <div className="container user-data">
                {props.user ?
                    <h2 className='text-center'><FontAwesomeIcon icon={faUser} size='1x' /> Update Management</h2>
                    :
                    <h2 className='text-center mt-5'><FontAwesomeIcon icon={faUser} size='1x' /> User Management</h2>
                }
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3"  >
                        <input className='form-control' type="text" {...register("firstName", { required: true })} placeholder="First Name" />
                        {errors.firstName && <span>This field is required</span>}
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' type="text" {...register("lastName", { required: true })} placeholder="Last Name" />
                        {errors.lastName && <span>This field is required</span>}
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' type="text" {...register("userName", { required: true })} placeholder="Username" />
                        {errors.userName && <span>This field is required</span>}
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' type="email" {...register("email", { required: true })} placeholder="Email" />
                        {errors.email && <span>This field is required</span>}
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' type="password" {...register("password", { required: true })} placeholder="Password" />
                        {errors.password && <span>This field is required</span>}
                    </div>
                    <div className="mb-3"  >
                        <input className='form-control' style={{ backgroundColor: '#0075FF', color: '#FFFFFF' }} type="submit" value='Create User' />
                    </div>
                </form>
            </div>
    );
};

export default UserForm;