import React from "react";
import './Header.css';
import Search from "../search/Search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { Dropdown, Image} from 'react-bootstrap';
import { logout } from "../../../actions/userActions";
const Header = () => {

    const navigate = useNavigate();
    const {isAuthenticated, user} = useSelector(state => state.authState)
    const {items:cartItems} = useSelector(state => state.cartState)
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logout)
    }


    return (
        <div>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            {/* <img width="150px" src="./images/logo.png" alt="Logo"/> */}
                            <h3>E-Cart</h3>
                        </Link>
                    </div>
                </div>

                <Search/>

                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    {isAuthenticated ? (
                        <Dropdown className="d-inline">
                            <Dropdown.Toggle variant="default text-white pr-5" id="dropdown-basic">
                                <figure className="avatar avatar-nav">
                                    <Image width="50px" src={user.avatar??'/images/default_avatar.png'} />
                                </figure>
                                <span>{user.name}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {user.role === 'admin' ? 
                                    <Dropdown.Item onClick={() => {navigate('/admin/dashboard')}} className="text-dark">Dashboard</Dropdown.Item>
                                    : null
                                }
                                <Dropdown.Item onClick={() => {navigate('/myprofile')}} className="text-dark">Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => {navigate('/myorders')}} className="text-dark">My Orders</Dropdown.Item>
                                <Dropdown.Item onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) 
                    :
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                    }
                    <Link to="/cart" id="cart" className="ml-3">Cart</Link>
                    <span className="ml-1" id="cart_count">{cartItems.length}</span>
                </div>
            </nav>
        </div>
    )
}

export default Header;