import {scaleLinear, scaleBand} from "d3-scale";
import { max } from 'd3-array';
import { select } from 'd3-selection';
import 'd3-transition';

import React, {Component} from "react";

export class Chart extends Component {
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
        this.data = this.formatDataSet(this.props.data)

        this.height = this.props.size[0]
        this.width = this.props.size[1]
    }
    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }

    formatDataSet(data) {
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        return data.map((day, i) => {
            return {
                id: i,
                day: days[i],
                value: day
            }
        })
    }

    createBarChart() {
        const node = this.node
        const dataMax = max(this.props.data)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[0]])

        const height = this.height
        const width = this.width
        const x = scaleBand().rangeRound([0, width]).padding(0,1)
        const y = scaleLinear().range([height, 0])


        x.domain(this.data.map(item => item.day))
        y.domain([0, dataMax])
        //
        // const chart = chartContainer.append('chart')


        //
        // chart
        //     .selectAll('rect')
        //     .data(this.data)
        //     .enter()
        //     .append('rect')
        //     .attr('width', 25)
        //     .attr('height', 25)
        //     .attr('fill', '#fe9922')
        //     .attr('x', data => x(data.day))
        //     .attr('y', data => y(data.id))





        select(node)
            .selectAll('rect')
            .data(this.data)
            .enter()
            .append('rect')

        select(node)
            .selectAll('rect')
            .data(this.data)
            .exit()
            .remove()




        select(node)
            .selectAll('rect')
            .data(this.data)
            .style('fill', '#fe9922')
            .style('margin-left', 50)
            .style('border-radius', 50)
            .style('transform', 'scale(1, -1)')
            .attr('x', (d,i) => i * 125)
            .attr('y', -height)
            .attr('width', 30)
            .transition()
            .duration(1000)
            .attr('height', d => yScale(d.value))

        select(node)
            .selectAll('.label')
            .data(this.data)
            .enter()
            .append('text')
            .style('color', '#999999')
            .text(data => data.day)
            .attr('x', (d,i) => i * 125 + 30 / 2)
            .attr('y', this.props.size[0] + 30)
            .attr('text-anchor', 'middle')
            .classed('label', true)

    }


    render() {

        console.log(this.data)
        return <svg ref={node => this.node = node}
                    width={this.props.size[1]} height={this.props.size[0] + 30}/>
    }
}
