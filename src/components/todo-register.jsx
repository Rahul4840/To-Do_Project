import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export function ToDoRegister()
{
    const [msg, setMsg] = useState('');
    const [validClass, setValidClass] = useState('');

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId: "",
            UserName: "",
            Password: "",
            Email: "",
            Mobile: ""
        },
        onSubmit: (user) => {
            axios.post("http://127.0.0.1:4000/register-user", user)
            .then(()=> {
                alert('User Registred');
                navigate('/login');
            })
        }
    });

    function VerifyUserId(e){
        axios.get('http://127.0.0.1:4000/get-users')
        .then(response=> {
            for(var user of response.data)
                {
                    if(user.UserId===e.target.value){
                        setMsg('User Id Already Taken !');
                        setValidClass('text-danger');
                        break;
                    } else {
                        setMsg('User Id Available.');
                        setValidClass('text-success');
                        break;
                    }
                }
        })
    }
    
    return(
        <div>
            <form style={{margin: "70px 0px 0px 570px"}} onSubmit={formik.handleSubmit} className="bg-light p-4 border border-2 border-secondary rounded w-25">
                <h3 className="bi bi-person-fill text-center">Register User</h3>
                    <dl>
                        <dt>User Id</dt>
                        <dd><input type="text" onKeyUp={VerifyUserId} onChange={formik.handleChange}  name="UserId" className="form-control" required /></dd>
                        <dd className={validClass}> {msg} </dd>
                        <dt>User Name</dt>
                        <dd><input type="text" onChange={formik.handleChange} name="UserName" className="form-control" required/></dd>
                        <dt>Password</dt>
                        <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control" required/></dd>
                        <dt>Email</dt>
                        <dd><input type="email" onChange={formik.handleChange} name="Email" className="form-control" required /></dd>
                        <dt>Mobile</dt>
                        <dd><input type="text" onChange={formik.handleChange} name="Mobile" className="form-control" required/></dd>
                    </dl>
                <button type="submit" className="btn btn-warning w-100">Register</button>
                <div>
                    <Link to="/login">Existing User Login</Link>
                </div>
            </form>
        </div>
    );
}