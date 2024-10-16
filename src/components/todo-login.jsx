import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";


export function ToDoLogin()
{
    const [cookies, setCookie, removeCookie] = useCookies('userid');
    
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            UserId:'',
            Password:''
        },
        onSubmit: (user)=> {
            axios.get('http://127.0.0.1:4000/get-users')
            .then(response=> {
                var client = response.data.find(record => record.UserId===user.UserId);
                if(client)
                    {
                        if(user.Password===client.Password)
                            {
                                setCookie('userid', user.UserId)
                                navigate('/dashboard');
                            } else {
                                navigate('/invalid');
                            }
                    } else {
                        navigate('/invalid');
                    }
            })
        }
    })

    return(
        <div>
            <form style={{margin: "70px 0px 0px 570px"}} onSubmit={formik.handleSubmit} className="bg-light p-4 border border-2 border-secondary rounded w-25">
                <h3 className="text-center  bi bi-person-fill">User Login</h3>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" className="form-control" required/></dd>
                    <dt>Password</dt>
                    <dd><input type="password" onChange={formik.handleChange} name="Password" className="form-control" required/></dd>
                </dl>
                <button type="submit" className="btn btn-warning w-100">Login</button>
                
                <Link to="/register">New User Register</Link>
            </form>
        </div>
    )
}