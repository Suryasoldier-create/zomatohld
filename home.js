import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component {
    constructor() {
        super()
        this.state = { homeSearchBarText: "" }
        this.handleSearchBar = this.handleSearchBar.bind(this);
    }

    handleSearchBar() {
        if (this.state.homeSearchBarText) {
            this.props.history.push('/restaurants', this.state.homeSearchBarText)
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid home-cont1">
                    <Navbar2 history={this.props.history} />
                    <div className="container home-cont1-text text-center py-5">
                        <h1 className="text-uppercase text-white mb-4"><strong>Savour Haldwani's local delights<br /> At your fingertips</strong></h1>
                        <div className="row justify-content-center">
                            <div className="col-md-6 mb-2">
                                <input type="text" className="form-control" placeholder="Restaurant Name" onChange={(e) => this.setState({ homeSearchBarText: e.target.value })} />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-warning btn-block" onClick={this.handleSearchBar}><b>Search</b></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ... Rest of static info ... */}
                <Footer />
            </div>
        );
    }
}

export default Home;