import React, {useEffect ,useState} from 'react';
import { Container, Image } from 'react-bootstrap';
import './View.css';
import { axiosInstance } from '../../../AxiosSetup';
import { useLocation } from 'react-router-dom';
import {  selectActiveUser } from '../../../features/userSlice';
import { useSelector  } from 'react-redux';
import { Link } from 'react-router-dom'; 
import Avatar from './AvatarImage.jpg';

const View = () => {
    const checkActiveUser = useSelector(selectActiveUser);
    const [sList, setsList] = useState([]);
    const [info, setinfo] = useState({});
    const [doctorId, setdoctorId] = useState("");
    const location = useLocation();
    const getInfo = async () => {
        console.log("doctorId", new URLSearchParams(location.search).get('doctor'))
        axiosInstance.get(`/doctor/view?doctor=${new URLSearchParams(location.search).get('doctor')}`).then((data) => {
            if(data.data.specializations[0]){
                const array = data.data.specializations[0].split(',')
                setsList(array)
            }
            setinfo(data.data)
            // console.log(info)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        setdoctorId(new URLSearchParams(location.search).get('doctor'))
        console.log(new URLSearchParams(location.search).get('doctor'))
        getInfo()
    }, []);
    return (
        <>{info ? (
            <Container style={{ marginTop: "50px" }}>
                <Container className="profile__subcontainer">
                    {info.image ? (<Image className="profile__image" src={info.image} roundedCircle />): <Image className="profile__image" src={Avatar} roundedCircle />}
                    
                    <div className="profile__info">
                        <p className="profile__name">{info.firstname} {info.lastname}</p>
                        <p>{info.description}</p>
                        {checkActiveUser.userType==="patient" && (<button className="home__btn" style={{ marginRight: "5px" }}><Link to={checkActiveUser ? `/bookappoinment?doctor=${doctorId}` : '/login?show=true'} style={{ textDecoration: "None", color: "white" }}>Book An Appointment</Link></button>)}
                    </div>
                </Container>
                <div className="profile__sub__info">
                    <div>
                        <h6 className="profile__specializations">Specializations</h6>
                        <ul>
                        {sList ? sList.map((s) => (
                            <li><p style={{fontFamily: "500"}}>{s}</p></li>
                        )) : (<p>Nothing to display</p>) }
                        </ul>
                    </div>
                    <div style={{marginLeft:"30px"}}>
                        <h6 className="profile__specializations">Address</h6>
                        <p>{info.address}</p>
                    </div>
                </div>

            </Container>): (<p>Loading</p>)}
        </>
    )
}

export default View;