import {select, csv, scaleLinear, max, scaleBand, axisLeft, axisBottom, format, scalePoint} from 'd3';

const svg = select('svg');

const height = +svg.attr('height');
const width = parseFloat(svg.attr('width'));

const render = data => {
  
  const margin = {top:20, bottom:20, left:130, right:100}
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
        
  const xScale = scaleLinear()
  	.domain([0,max(data, d => d.population)])
  	.range([0, innerWidth])
  
  
   const yScale = scaleBand()
  	.domain(data.map( d => d.country))
  	.range([0, innerHeight])
		.padding(0.2)
  
  const g = svg.append('g')
  	.attr('transform', `translate(${margin.left}, ${margin.top})`)
        
  console.log(xScale.domain())
  console.log(xScale.range())
  console.log(yScale.domain())
  console.log(yScale.range())


  g.append('g')
  .call(d3.axisLeft(yScale))
  .selectAll('.domain', '.tick line')
  .remove();
  
  g.append('g').call(axisBottom(xScale).tickFormat(format('s')))
  	.attr('transform', `translate(${0}, ${innerHeight})`)
    
  g.selectAll('rect').data(data)   //joining data to rectungles
  	.enter().append('rect')
  	.attr('y', d => yScale(d.country))
  	.attr('width', d => xScale(d.population))
  	.attr('height', yScale.bandwidth())
}

csv('data.csv').then(data => {
  data.forEach(d => {
    d.population = +d.population*1000
  })
  render(data)
})
        
        
        
        
        
        
        
        
        
        
        
        
        
        

