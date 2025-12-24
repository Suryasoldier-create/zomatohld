import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import { my_order } from '../store/action';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyOrders extends Component {
    constructor() {
        super()
        this.state = {
            tab1: "col-12 col-lg-4 col-md-4 text-center order-req-tab-active",
            tab2: "col-12 col-lg-4 col-md-4 text-center",
            tab3: "col-12 col-lg-4 col-md-4 text-center",
            tab1Content: true,
            tab2Content: false,
            tab3Content: false,
            userDetails: null
        }
    }

    async componentDidMount() {
        this.props.my_order();
    }

    static getDerivedStateFromProps(props) {
        return { userDetails: props.user };
    }

    handleTabs(tab) {
        this.setState({
            tab1: `col-12 col-lg-4 col-md-4 text-center ${tab === 'tab1' ? 'order-req-tab-active' : ''}`,
            tab2: `col-12 col-lg-4 col-md-4 text-center ${tab === 'tab2' ? 'order-req-tab-active' : ''}`,
            tab3: `col-12 col-lg-4 col-md-4 text-center ${tab === 'tab3' ? 'order-req-tab-active' : ''}`,
            tab1Content: tab === "tab1",
            tab2Content: tab === "tab2",
            tab3Content: tab === "tab3",
        })
    }

    renderOrderList(statusFilter) {
        const { myOrder } = this.props;
        if (!myOrder) return null;

        return Object.keys(myOrder).map((val) => {
            const order = myOrder[val];
            if (order.status === statusFilter) {
                return (
                    <div className="container border-bottom pb-2 mb-4" key={order.id}>
                        <div className="row mb-3">
                            <div className="col-6"><h5>{order.userName}</h5></div>
                            <div className="col-6 text-right">
                                <span className={`text-uppercase ${statusFilter === 'DELIVERED' ? 'text-success' : 'text-danger'}`}>{order.status}</span>
                            </div>
                        </div>
                        {Object.keys(order.itemsList).map((val2) => (
                            <div className="row mb-3" key={val2}>
                                <div className="col-2"><img style={{ width: "70px" }} src={order.itemsList[val2].itemImageUrl} alt="food" /></div>
                                <div className="col-7">
                                    <h6>{order.itemsList[val2].itemTitle}</h6>
                                    <p><small>{order.itemsList[val2].itemIngredients}</small></p>
                                </div>
                                <div className="col-3 text-right"><span><b>RS.{order.itemsList[val2].itemPrice}</b></span></div>
                            </div>
                        ))}
                        <div className="text-right"><p><b>Total:</b> RS.{order.totalPrice}</p></div>
                    </div>
                );
            }
            return null;
        });
    }

    render() {
        const { tab1, tab2, tab3, tab1Content, tab2Content, tab3Content, userDetails } = this.state;
        return (
            <div>
                <div className="container-fluid res-details-cont1">
                    <Navbar2 history={this.props.history} />
                    <div className="container py-4 text-white">
                        {userDetails && <h1>{userDetails.userName}</h1>}
                    </div>
                </div>
                <div className="container py-5">
                    <div className="row cursor-pointer">
                        <div className={tab1} onClick={() => this.handleTabs("tab1")}><p>Pending</p></div>
                        <div className={tab2} onClick={() => this.handleTabs("tab2")}><p>In Progress</p></div>
                        <div className={tab3} onClick={() => this.handleTabs("tab3")}><p>Delivered</p></div>
                    </div>
                    <div className="bg-white p-4">
                        {tab1Content && this.renderOrderList("PENDING")}
                        {tab2Content && this.renderOrderList("IN PROGRESS")}
                        {tab3Content && this.renderOrderList("DELIVERED")}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => ({ user: state.user, myOrder: state.myOrder });
const mapDispatchToProps = dispatch => ({ my_order: () => dispatch(my_order()) });

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);