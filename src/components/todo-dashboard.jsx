import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom";


export function ToDoDashBoard()
{
    const [cookies, setCookie, removeCookie] = useCookies('userid');
    const [appointments, setAppointments ] = useState([{Appointment_Id:0, Title:'', Description:'', Date:new Date(), UserId:''}])

    let navigate = useNavigate();

    function handleSignout(){
        removeCookie('userid');
        navigate('/login')
    }

    useEffect(()=>{
        if(cookies['userid']===undefined){
            navigate('/login');
        } else {
            axios.get(`http://127.0.0.1:4000/view-tasks/${cookies['userid']}`)
            .then(response=> {
                setAppointments(response.data)   
            })
        }
    },[]);
    

    return(
        <div className=" bg-light m-3 p-4 border border-2 border-secondary rounded">
            <h3 className="d-flex justify-content-between"><span>{cookies['userid']} - Dashboard - Your Appointments</span> <span onClick={handleSignout} className="btn btn-link text-decoration-none">Sign-out</span> </h3>
            <main className="w-50">
                
                <Link to="/add-task" className="bi bi-calendar-check btn btn-primary my-3">Add Appointments</Link>

                {
                    appointments.map(appointment=> 
                        <div className="alert alert-success alert-dismissible">
                            <button className="btn btn-close" data-bs-dismiss="alert"></button>
                            <h2>{appointment.Title}</h2>
                            <p>{appointment.Description}</p>
                            <p>{moment(appointment.Date).format('dddd, MMMM Do YYYY')}</p>
                            <Link to={`/edit-task/${appointment.Appointment_Id}`} className="btn btn-warning bi bi-pen-fill">Edit</Link>
                            <Link to={`/delete-task/${appointment.Appointment_Id}`} className="btn btn-danger bi bi-trash ms-2">Remove</Link>
                        </div>
                    )
                }
            </main>
        </div>
    )
}