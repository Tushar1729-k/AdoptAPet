import React, {Component} from 'react'
import * as d3 from 'd3'

class BarChart extends Component {
  constructor(props){
    super(props)
    this.createBarChart = this.createBarChart.bind(this)
  }
  componentDidMount() {
    this.createBarChart()
  }
  componentDidUpdate() {
    this.createBarChart()
  }
  createBarChart() {
    const margin = { top: 100, right: 20, bottom: 150, left: 110}
    const height = 600 - margin.top - margin.bottom
    const width = 1200 - margin.left - margin.right
    const padding = -110

    const svg = d3
      .select(this.refs.barChart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .style('color', 'white')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    const x = d3
      .scaleBand()
      .range([0, width])
      .domain(this.props.data.map(d => d[this.props.xAttr]))
      .padding(0.2)
      svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', 'white')

    const maxValue = Math.max(...this.props.data.map(d => d[this.props.yAttr]))
    
    const y = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxValue / 10) * 10])
      .range([height, 0])
      svg.append('g').call(d3.axisLeft(y))
      .selectAll('text')
      .style('fill', 'white')

    svg
      .selectAll('mybar')
      .data(this.props.data)
      .enter()
      .append('rect')
      .attr('x', d => x(d[this.props.xAttr]))
      .attr('y', d => y(d[this.props.yAttr]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d[this.props.yAttr]))
      .attr("fill", 'orange')

    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (padding / 1.5) + ","
                                    + (height / 2) + ")rotate(-90)")
    .text(this.props.yLabel)
    .attr('fill', 'white')

    svg.append("text")

  }

}