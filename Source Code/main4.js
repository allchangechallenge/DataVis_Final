var s_margin = { left : 115, top : 10, bottom : 20 } ;
var scatter_w = 2280, scatter_h = 500 ;

var body_h = [ 0, 5 ] ;
var body_w = [ 0, 380 ] ;
var dot_color = [ '#db4f42','#db8442','#dbce42','#43947e','#51bde8', '#853d82' ] ;

var gen1, gen2, gen3, gen4, gen5, gen6 ;
var g_id = [ '#g1', '#g2', '#g3', '#g4', '#g5', '#g6' ] ;
var g_id_den = [ '#g1_d', '#g2_d', '#g3_d', '#g4_d', '#g5_d', '#g6_d' ] ;

d3.csv( "Poke_merge_p4.csv" ).then( rawData => {

    rawData.forEach( d =>  {
        d.Generation = Number( d.Generation ) ;
        d.PokemonHeight = Number( d.PokemonHeight ) ;
        d.PokemonWeight = Number( d.PokemonWeight ) ;
    } );

    gen1 = rawData.filter( data => data.Generation == 1 && data[ 'Pokemon Height' ] <= 5 && data[ 'Pokemon Weight' ] > 0.3 && data[ 'Pokemon Weight' ] <= 380 ) ;
    gen2 = rawData.filter( data => data.Generation == 2 && data[ 'Pokemon Height' ] <= 5 && data[ 'Pokemon Weight' ] > 0.3 && data[ 'Pokemon Weight' ] <= 380 ) ;
    gen3 = rawData.filter( data => data.Generation == 3 && data[ 'Pokemon Height' ] <= 5 && data[ 'Pokemon Weight' ] > 0.3 && data[ 'Pokemon Weight' ] <= 380 ) ;
    gen4 = rawData.filter( data => data.Generation == 4 && data[ 'Pokemon Height' ] <= 5 && data[ 'Pokemon Weight' ] > 0.3 && data[ 'Pokemon Weight' ] <= 380 ) ;
    gen5 = rawData.filter( data => data.Generation == 5 && data[ 'Pokemon Height' ] <= 5 && data[ 'Pokemon Weight' ] > 0.3 && data[ 'Pokemon Weight' ] <= 380 ) ;
    gen6 = rawData.filter( data => data.Generation == 6 && data[ 'Pokemon Height' ] <= 5 && data[ 'Pokemon Weight' ] > 0.3 && data[ 'Pokemon Weight' ] <= 380 ) ;

    let gen_data = [ gen1, gen2, gen3, gen4, gen5, gen6 ] ;  

    for ( var i = 0 ; i < 6 ; i ++ ) {
        d3.select( '#top_svg' ).append( 'g' ).attr( 'id', g_id[ i ] ).selectAll( 'dot' ).data( gen_data[ i ] ).enter().append( 'circle' )   
        .attr( 'cx', function( d ) { return Number( d[ 'Pokemon Weight' ] * 6 ) + s_margin.left } )
        .attr( 'cy', function( d ) { return Number( d[ 'Pokemon Height' ] * ( -100 )) + scatter_h } )
        .attr( 'r', 3 )
        .style("fill", dot_color[ i ] ) ;
    }    
})

// top
var x = d3.scaleLinear().domain( [ body_w[ 0 ], body_w[ 1 ] ] ).range( [ 0, scatter_w ] ) ;
var svg = d3.select( "#top_svg" ).append( "g" ).call( d3.axisBottom( x ).ticks( 50 ) )
            .attr( 'transform', 'translate( ' + s_margin.left + ', ' + ( scatter_h ) + ' )')
            .style( 'font-size', '150%' ).style( { 'fill' : 'white', 'stroke-width' : '4px' } ) ;   // 50, 485
d3.select( '#top_svg' ).append( 'text' ).attr( 'x', 50 + scatter_w / 2 ).attr( 'y', scatter_h + 80 ).attr( 'anchor', 'middle' ).text( 'Weight (g)' ).style( 'font-size', '200%' ).style( 'fill', 'white' ) ;

var y = d3.scaleLinear().domain( [ body_h[ 0 ], body_h[ 1 ] ] ).range( [ scatter_h, 0 ] ) ;
var svg = d3.select( "#top_svg" ).append( "g" ).call( d3.axisLeft( y ).ticks( 10 ) )
            .attr( 'transform', 'translate( ' + s_margin.left + ', ' + s_margin.top + ' )')
            .style( 'font-size', '150%' ).style( { 'fill' : 'white', 'stroke-width' : '4px' } ) ;
d3.select( '#top_svg' ).append( 'text' ).attr( 'x', -220  ).attr( 'y', 50 ).attr( 'text-anchor', 'middle' ).attr( 'transform', 'rotate( -90 )' ).text( 'Height (cm)' ).style( 'font-size', '200%' ).style( 'fill', 'white' ) ;  







// set the dimensions and margins of the graph
var margin4 = { top : 30, right : 30, bottom : 100, left : 115 },
    width4 = 2280, height4 = 500;

// append the svg object to the body of the page
var svg = d3.select("#density").append("svg").attr("float","left" )
            .attr( 'id', 'den_svg' ) 
            .attr("width", width4 + margin4.left + margin4.right)
            .attr("height", height4 + margin4.top + margin4.bottom)
            .append("g")
            .attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

// get the data
d3.csv( "Poke_merge.csv" ).then( data => {
    console.log( data ) ;
    console.log( data.filter( function(d){return d.Generation === "1"} ).map(function(d){  return d.Total; }) ) ;
  // add the x Axis
var x = d3.scaleLinear().domain([ 160, 780 ]).range([0, width4]);
svg.append("g")
    .attr("transform", "translate(0," + height4 + ")")
    .call(d3.axisBottom(x).ticks( 31 )).style( 'font-size', '150%' );
d3.select( '#den_svg' ).append( 'text' ).attr( 'x', 50 + scatter_w / 2 ).attr( 'y', 620 ).attr( 'anchor', 'middle' ).text( '戰力值' ).style( 'font-size', '200%' ).style( 'fill', 'white' ) ;

  // add the y Axis
var y = d3.scaleLinear().range([height4, 0]).domain([0, 0.01]);
svg.append("g").call(d3.axisLeft(y)).style( 'font-size', '150%' );
d3.select( '#den_svg' ).append( 'text' ).attr( 'x', -250  ).attr( 'y', 25 ).attr( 'text-anchor', 'middle' ).attr( 'transform', 'rotate( -90 )' ).text( 'Density' ).style( 'font-size', '200%' ).style( 'fill', 'white' ) ;  

  // Compute kernel density estimation
var temp1 = [ 160, 0 ] ;
var temp2 = [ 740, 0 ] ;
var temp3 = [ 760, 0 ] ;
var temp4 = [ 780, 0 ] ;
var kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(27))
var density1 =  kde( data.filter( function( d ) {return d.Generation === "1" } ).map( function( d ) {  return d.Total ; } ) )
var density2 =  kde( data.filter( function( d ) {return d.Generation === "2" } ).map( function( d ) {  return d.Total ; } ) )
var density3 =  kde( data.filter( function( d ) {return d.Generation === "3" } ).map( function( d ) {  return d.Total ; } ) )
var density4 =  kde( data.filter( function( d ) {return d.Generation === "4" } ).map( function( d ) {  return d.Total ; } ) )
var density5 =  kde( data.filter( function( d ) {return d.Generation === "5" } ).map( function( d ) {  return d.Total ; } ) )
var density6 =  kde( data.filter( function( d ) {return d.Generation === "6" } ).map( function( d ) {  return d.Total ; } ) )

var den_list = [ density1, density2, density3, density4, density5, density6 ] ;
for ( var i = 0 ; i < 6 ; i ++ ) {
    den_list[ i ].push( temp1 ) ;
    den_list[ i ].push( temp2 ) ;
    den_list[ i ].push( temp3 ) ;
    den_list[ i ].push( temp4 ) ;
}
    

// console.log( density2 ) ;

  // Plot the area
svg.append("path").attr( 'id', g_id_den[ 0 ] ).attr("class", "mypath").datum(density1)
    .attr("fill", dot_color[ 0 ]).attr("opacity", ".6").attr("stroke", "#000")
    .attr("stroke-width", 1).attr("stroke-linejoin", "round")
    .attr("d", d3.line().curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); }) );

svg.append("path").attr( 'id', g_id_den[ 1 ] ).attr("class", "mypath").datum(density2)
    .attr("fill", dot_color[ 1 ]).attr("opacity", ".6").attr("stroke", "#000")
    .attr("stroke-width", 1).attr("stroke-linejoin", "round")
    .attr("d", d3.line().curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); }) );

svg.append("path").attr( 'id', g_id_den[ 2 ] ).attr("class", "mypath").datum(density3)
    .attr("fill", dot_color[ 2 ]).attr("opacity", ".6").attr("stroke", "#000")
    .attr("stroke-width", 1).attr("stroke-linejoin", "round")
    .attr("d", d3.line().curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); }) );

svg.append("path").attr( 'id', g_id_den[ 3 ] ).attr("class", "mypath").datum(density4)
    .attr("fill", dot_color[ 3 ]).attr("opacity", ".6").attr("stroke", "#000")
    .attr("stroke-width", 1).attr("stroke-linejoin", "round")
    .attr("d", d3.line().curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); }) );

svg.append("path").attr( 'id', g_id_den[ 4 ] ).attr("class", "mypath").datum(density5)
    .attr("fill", dot_color[ 4 ]).attr("opacity", ".6").attr("stroke", "#000")
    .attr("stroke-width", 1).attr("stroke-linejoin", "round")
    .attr("d", d3.line().curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); }) );

svg.append("path").attr( 'id', g_id_den[ 5 ] ).attr("class", "mypath").datum(density6)
    .attr("fill", dot_color[ 5 ]).attr("opacity", ".6").attr("stroke", "#000")
    .attr("stroke-width", 1).attr("stroke-linejoin", "round")
    .attr("d", d3.line().curve(d3.curveBasis)
                        .x(function(d) { return x(d[0]); })
                        .y(function(d) { return y(d[1]); }) );

var button4 = d3.select("#density")
                        .append("svg").attr("transform","translate(" + 1350 + "," + (-300) + ")")
                        .attr("width","200px")
                        .attr("heigth","200px")
                        .append("a").attr("href","#title")
                        .attr("float","left")                        
                        .append("image")
                        .attr('width', 200)
                        .attr('height', 200)
                        .attr("xlink:href","next.png")
                    
});

// Function to compute density
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
} 


// click behavior
var s ;
var mean_h = [ 1.2, 1.14, 1.23, 1.12, 1.02, 1.04 ] ;
var sd_h = [ 0.96, 1.05, 1.48, 0.83, 0.63, 0.87 ] ;

var mean_w = [ 46.5, 47.6, 67.1, 71.8, 52.2, 50.9 ] ;
var sd_w = [ 59.5, 63.4, 114.6, 111.3, 71.2, 83.7 ] ;

var mean_t = [ 408.9, 403.4, 400.6, 442.2, 419.5, 424.8 ] ;

var id_list = [ "gen1_li", "gen2_li", "gen3_li", "gen4_li", "gen5_li", "gen6_li", "all_li" ] ;
function click_list( event ) {
    if ( event.target.id == id_list[ 6 ] ) {
        for ( var j = 0 ; j < 6 ; j ++ ) {
            document.getElementById( g_id[ j ] ).style.visibility = 'visible' ;
            document.getElementById( g_id_den[ j ] ).style.visibility = 'visible' ;
        } 
    }
    for ( var i = 0 ; i < 6 ; i ++ ) {
        if ( event.target.id == id_list[ i ] ) {
            s = i ;
            event.target.style.color = dot_color[ i ] ;
            for ( var j = 0 ; j < 6 ; j ++ ) {
                document.getElementById( g_id[ j ] ).style.visibility = 'hidden' ;
                document.getElementById( g_id_den[ j ] ).style.visibility = 'hidden' ;
            }
            document.getElementById( g_id[ i ] ).style.visibility = 'visible' ;
            document.getElementById( g_id_den[ i ] ).style.visibility = 'visible' ;
        }
    }
    d3.select( '#tag' ).remove() ;
    d3.select( '#tag2' ).remove() ;
    d3.select( '#tag3' ).remove() ;
    if ( event.target.id != id_list[ 6 ] ) {
      d3.select( '#top_svg' ).append( 'text' ).attr( 'id', 'tag' ).attr( 'x', '1600' ).attr( 'y', '30' )
        .text( '[ Height ] Mean : ' + mean_h[ s ] + '(cm) / SD : ' + sd_h[ s ] ).style( 'fill', 'white' ).style( 'font-size', '200%') ;
      d3.select( '#top_svg' ).append( 'text' ).attr( 'id', 'tag2' ).attr( 'x', '1600' ).attr( 'y', '70' )
        .text( '[ Weight ] Mean : ' + mean_w[ s ] + '(g) / SD : ' + sd_w[ s ] ).style( 'fill', 'white' ).style( 'font-size', '200%') ; 
      d3.select( '#den_svg' ).append( 'text' ).attr( 'id', 'tag3' ).attr( 'x', '1600' ).attr( 'y', '30' )
        .text( 'Mean : ' + mean_t[ s ] ).style( 'fill', 'white' ).style( 'font-size', '200%') ; 
    }

}

// Generation list 
for ( var i = 0 ; i < 7 ; i ++ ) {
    let gen_list = document.getElementById( id_list[ i ] ) ;
    gen_list.addEventListener( 'mouseover', function( event ) {
                                            event.target.style.cursor = 'pointer' ;
                                        }, false ) ;
    gen_list.addEventListener( 'click', function( event ) { 
                                            for ( var j = 0 ; j < 7 ; j ++ ) {
                                                document.getElementById( id_list[ j ] ).style.color = '';
                                            }
                                            click_list( event ) ;  
                                            }, false ) ;
                                            
}