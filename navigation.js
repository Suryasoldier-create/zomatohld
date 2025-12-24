import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update_user, remove_user } from '../store/action';

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            homeIconLink: '/',
            updated_user: { isLogin: false }
        }
        this._renderWithLogin = this._renderWithLogin.bind(this);
    }

    async componentDidMount() {
        this.props.update_user();
    }

    static getDerivedStateFromProps(props) {
        if (props.user) {
            return {
                updated_user: props.user,
                homeIconLink: props.user.isRestaurant ? '/order-requests' : '/',
            }
        } else {
            return {
                updated_user: { isLogin: false }
            }
        }
    }

    handleLogOutBtn() {
        this.props.remove_user();
        this.props.history.push('/');
    }

    _renderWithOutLogin() {
        return (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <span className="nav-link active text-uppercase mr-2"><Link to="/restaurants">Restaurants</Link></span>
                </li>
                <li className="nav-item">
                    <span className="nav-link text-uppercase mr-2"><Link to="/login">Login / Register</Link></span>
                </li>
                <li className="nav-item">
                    <Link to="/register-restaurant">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3">Register Restaurant</button>
                    </Link>
                </li>
            </ul>
        )
    }

    _renderWithLogin() {
        const { updated_user } = this.state;
        if (updated_user.isRestaurant) {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2"><Link to="/add-menu-items">Add Foods</Link></span></li>
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2"><Link to="/my-foods">My Foods</Link></span></li>
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2"><Link to="/order-requests">Order Requests</Link></span></li>
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span></li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2"><Link to="/restaurants">Restaurants</Link></span></li>
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2"><Link to="/my-orders">My Orders</Link></span></li>
                    <li className="nav-item"><span className="nav-link active text-uppercase mr-2">{updated_user.userName}</span></li>
                    <li className="nav-item">
                        <button type="button" className="btn btn-warning btn-sm text-uppercase mr-2 mr-1 px-3" onClick={() => this.handleLogOutBtn()}>Log Out</button>
                    </li>
                </ul>
            )
        }
    }

    render() {
        const { updated_user, homeIconLink } = this.state
        return (
            <nav className="navbar navbar-expand-lg navbar-dark pt-3">
                <Link className="navbar-brand" to={homeIconLink}>
                    <img alt="Quick Food Logo" src={require("../assets/images/logo.png")} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {updated_user.isLogin ? this._renderWithLogin() : this._renderWithOutLogin()}
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
    update_user: () => dispatch(update_user()),
    remove_user: () => dispatch(remove_user())
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);