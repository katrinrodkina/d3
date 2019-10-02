(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const height = +svg.attr('height');
  const width = parseFloat(svg.attr('width'));

  const render = data => {
    
    const margin = {top:60, bottom:70, left:130, right:100};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
          
    const xScale = d3.scaleLinear()
    	.domain([0,d3.max(data, d => d.population)])
    	.range([0, innerWidth]);
    
    
     const yScale = d3.scaleBand()
    	.domain(data.map( d => d.country))
    	.range([0, innerHeight])
  		.padding(0.2);
    
    const g = svg.append('g')
    	.attr('transform', `translate(${margin.left}, ${margin.top})`);
          
    console.log(xScale.domain());
    console.log(xScale.range());
    console.log(yScale.domain());
    console.log(yScale.range());

    g.append('g').call(d3.axisLeft(yScale))
      .selectAll('.domain, .tick line')
      .remove()
    
    g.append('g').call(d3.axisBottom(xScale))
      .attr('transform', `translate(${0}, ${innerHeight})`)
      .append('text').attr('y', 40).attr('x', innerWidth/2).attr('fill', 'black').text('Population')
      .select('.domain')
      .remove()
      
      
      
    g.append('text')
      .attr('y', -10)
      .text('Top 10 Most Populous Countires')


    g.selectAll('rect').data(data)  //joining data to rectungles
    	.enter().append('rect')
    	.attr('y', d => yScale(d.country))
    	.attr('width', d => xScale(d.population))
    	.attr('height', yScale.bandwidth());
  };

  d3.csv('data.csv').then(data => {
    data.forEach(d => {
      d.population = +d.population*1000;
    });
    render(data);
  });

}(d3));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7c2VsZWN0LCBjc3YsIHNjYWxlTGluZWFyLCBtYXgsIHNjYWxlQmFuZCwgYXhpc0xlZnQsIGF4aXNCb3R0b219IGZyb20gJ2QzJztcblxuY29uc3Qgc3ZnID0gc2VsZWN0KCdzdmcnKTtcblxuY29uc3QgaGVpZ2h0ID0gK3N2Zy5hdHRyKCdoZWlnaHQnKTtcbmNvbnN0IHdpZHRoID0gcGFyc2VGbG9hdChzdmcuYXR0cignd2lkdGgnKSk7XG5cbmNvbnN0IHJlbmRlciA9IGRhdGEgPT4ge1xuICBcbiAgY29uc3QgbWFyZ2luID0ge3RvcDoyMCwgYm90dG9tOjIwLCBsZWZ0OjEwMCwgcmlnaHQ6MjB9XG4gIGNvbnN0IGlubmVyV2lkdGggPSB3aWR0aCAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0XG4gIGNvbnN0IGlubmVySGVpZ2h0ID0gaGVpZ2h0IC0gbWFyZ2luLnRvcCAtIG1hcmdpbi5ib3R0b21cbiAgICAgICAgXG4gIGNvbnN0IHhTY2FsZSA9IHNjYWxlTGluZWFyKClcbiAgXHQuZG9tYWluKFswLG1heChkYXRhLCBkID0+IGQucG9wdWxhdGlvbildKVxuICBcdC5yYW5nZShbMCwgaW5uZXJXaWR0aF0pXG4gIFxuICBcbiAgIGNvbnN0IHlTY2FsZSA9IHNjYWxlQmFuZCgpXG4gIFx0LmRvbWFpbihkYXRhLm1hcCggZCA9PiBkLmNvdW50cnkpKVxuICBcdC5yYW5nZShbMCwgaW5uZXJIZWlnaHRdKVxuXHRcdC5wYWRkaW5nKDAuMSlcbiAgXG4gIGNvbnN0IGcgPSBzdmcuYXBwZW5kKCdnJylcbiAgXHQuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke21hcmdpbi5sZWZ0fSwgJHttYXJnaW4udG9wfSlgKVxuICAgICAgICBcbiAgY29uc29sZS5sb2coeFNjYWxlLmRvbWFpbigpKVxuICBjb25zb2xlLmxvZyh4U2NhbGUucmFuZ2UoKSlcbiAgY29uc29sZS5sb2coeVNjYWxlLmRvbWFpbigpKVxuICBjb25zb2xlLmxvZyh5U2NhbGUucmFuZ2UoKSlcblxuXHRnLmFwcGVuZCgnZycpLmNhbGwoYXhpc0xlZnQoeVNjYWxlKSlcbiAgZy5hcHBlbmQoJ2cnKS5jYWxsKGF4aXNCb3R0b20oeFNjYWxlKSlcbiAgXHQuYXR0cigndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgkezB9LCAke2lubmVySGVpZ2h0fSlgKVxuICAgIFxuICBnLnNlbGVjdEFsbCgncmVjdCcpLmRhdGEoZGF0YSlcbiAgXHQuZW50ZXIoKS5hcHBlbmQoJ3JlY3QnKVxuICBcdC5hdHRyKCd5JywgZCA9PiB5U2NhbGUoZC5jb3VudHJ5KSlcbiAgXHQuYXR0cignd2lkdGgnLCBkID0+IHhTY2FsZShkLnBvcHVsYXRpb24pKVxuICBcdC5hdHRyKCdoZWlnaHQnLCB5U2NhbGUuYmFuZHdpZHRoKCkpXG59XG5cbmNzdignZGF0YS5jc3YnKS50aGVuKGRhdGEgPT4ge1xuICBkYXRhLmZvckVhY2goZCA9PiB7XG4gICAgZC5wb3B1bGF0aW9uID0gK2QucG9wdWxhdGlvbioxMDAwXG4gIH0pXG4gIHJlbmRlcihkYXRhKVxufSlcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuXG4iXSwibmFtZXMiOlsic2VsZWN0Iiwic2NhbGVMaW5lYXIiLCJtYXgiLCJzY2FsZUJhbmQiLCJheGlzTGVmdCIsImF4aXNCb3R0b20iLCJjc3YiXSwibWFwcGluZ3MiOiI7OztFQUVBLE1BQU0sR0FBRyxHQUFHQSxTQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0VBRTFCLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztFQUNuQyxNQUFNLEtBQUssR0FBRyxV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