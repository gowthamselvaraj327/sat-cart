import { Fragment } from "react";
import { useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import './Profile.css';
const Profile = () => {

    const {user} = useSelector(state => state.authState)

    return (
        <Fragment>
        <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src={user.avatar ?? './images/default_avatar.png'} alt='' />
                </figure>
                <Link to="/myprofile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 <Link to="/myorders" className="btn btn-danger btn-block mt-5">
                    My Orders
                </Link>

                <Link to="/myprofile/update/password" className="btn btn-primary btn-block mt-3">
                    Change Password
                </Link>
            </div>
        </div>
        </Fragment>
    )
}

export default Profile;