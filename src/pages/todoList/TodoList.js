import React, {Component} from "react";
import {Task} from "../../components/Task/Task";
import {Chart} from "../../components/Chart/Chart";

export class TodoList extends Component {

    render() {

        return (
            <React.Fragment>
                <Chart data={[5,10,1,3]} size={[200,100]}/>
                <Task/>
                <Task/>
                <Task/>
            </React.Fragment>
        )
    }
}
