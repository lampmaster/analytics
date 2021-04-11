import React, {Component} from "react";
import {Task} from "../../components/Task/Task";
import {Chart} from "../../components/Chart/Chart";
import {connect} from "react-redux";

export class TodoList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.match)

        const chart = this.props.match.path === '/archive'
            ? <Chart data={[5,10,1,3]} size={[200,100]}/>
            : null

        return (
            <React.Fragment>
                {chart}
                <Task/>
                <Task/>
                <Task/>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsList: state.newsList,
        loading: state.loading
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         getNewsList: () => dispatch(getNewsList()),
//         setMessage: (msg) => dispatch(setMessage(msg))
//     }
// }

export default connect(mapStateToProps)(TodoList)
