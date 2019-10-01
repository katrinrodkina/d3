import {select, csv, scaleLinear, max, scaleBand} from 'd3';

const svg = select('svg');

const height = +svg.attr('height');
const width = parseFloat(svg.attr('width'));

const render = data => {
  const xScale = scaleLinear()
  	.domain([0,max(data, d => d.population)])
  	.range([0, width])
  
   const yScale = scaleBand()
  	.domain(data.map( d => d.country))
  	.range([0, height])
  
  
  console.log(xScale.domain())
  console.log(xScale.range())
  console.log(yScale.domain())
  console.log(yScale.range())


  
  svg.selectAll('rect').data(data)
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
        
        
        
        
        
        
        
        
        
        
        
        
        
        

