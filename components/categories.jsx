import React, { Component }  from 'react';
import { connect } from 'react-redux';

class Categories extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="top-menu-categories">

            </div>
        );
    }
}

function mapStateToProps(state){
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        getCart: (minicartId,itemid,sku) => dispatch(getCart(minicartId,itemid,sku))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);