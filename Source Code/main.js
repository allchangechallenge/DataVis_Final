var margin = {top: 50, right: 50, bottom: 50, left: 50},
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;
    
    var First = d3.select("#first").append("g")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


    First.append("image")
    .attr('width', 1000)
    .attr('height', 1000)
    .attr("xlink:href", "神奇寶貝球-removebg-preview.png")
    .attr("transform",
    "translate(" + 200 + "," + margin.top + ")");
    var button = First.append("a").attr("href","#main")
    .append("image")
    .attr('width', 300)
    .attr('height', 300)
    .attr("transform","translate(" + 1200 + "," + 400 + ")")
    .attr("xlink:href","become-removebg-preview.png")
    button.on("click", button.selectAll("a"))


    d3.csv("Poke_merge.csv").then(rawData =>{

        rawData.forEach(function(d) {//轉成數字型態
            d.HealthStat = Number(d.HealthStat);
            d.AttackStat = Number(d.AttackStat);
            d.DefenseStat = Number(d.DefenseStat);
            d.SpecialAttackStat = Number(d.SpecialAttackStat);
            d.SpecialDefenseStat = Number(d.SpecialDefenseStat);
            d.SpeedStat = Number(d.SpeedStat);
            d.PokemonHeight = Number(d.PokemonHeight);
            d.PokemonWeight = Number(d.PokemonWeight);
        });

        let typeData = rawData.map(function(d){
            return {
                PrimaryType: d.PrimaryType,
                PokemonName: d.Name,
                SecondaryType: d.SecondaryType,
                PrimaryAbility: d.PrimaryAbility,
                SecondaryAbility: d.SecondaryAbility,
                HiddenAbility: d.HiddenAbility,
                LegendaryType: d.LegendaryType,
                GamesofOrigin: d.GamesofOrigin,
                Generation: d.Generation,
                PokedexNumber: d.PokedexNumber,
                PokemonHeight: d.PokemonHeight,
                PokemonWeight: d.PokemonWeight,
                PrimaryAbility: d.PrimaryAbility,
                HealthStat: d.HealthStat,
                AttackStat: d.AttackStat,
                DefenseStat: d.DefenseStat,
                SpecialAttackStat: d.SpecialAttackStat,
                SpecialDefenseStat: d.SpecialDefenseStat,
                SpeedStat: d.SpeedStat,
                len: 1//一隻寶可夢
            }
        });

        var type_nested_data = d3.nest()
        .key(function(d) { return d.PrimaryType; })
        .entries(typeData)
        ;       //console.log("ppp",type_nested_data);

        var Type = type_nested_data.map(function(d){
            return {
                PrimaryType: d.key,
                children: d.values,
                len: d.values.length
            }
        })
        var fillColor=["#FFC300","#FF6666"/*red */,"purple","#1e90ff","pink","grey","green","#330466"/*dark*/,"orange","lightgreen","#DEB887","blue","#FFFFCC","#FFCC99","#66CC00","#81D8D0"/*"#00CCCC"flying */,"#FF6600","darkgray"];
        ///第一頁，分類別，大圈:類別 ; 小圈:一隻寶可夢
        var svg = d3.select(/*"svg"*/"#main").append("g")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");       
        
        //第二頁
        var page2SVG = d3.select("#page2").append("g")/*對戰結果分析 */
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
//-----------------------------------------------------------------------------                    
        var page3SVG = d3.select("#page3").append("g")/*各種戰力 */
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
        var llll = d3.select("#page3").append("g")/*五個折線圖 */
                    .attr("width", width + margin.left + margin.right+100000)
                    .attr("height", height + margin.top + margin.bottom+100000)


        var root;        
        let nodes1;
        var bodyweight, bodyHeight, Denfense, Attack, Health;
        var bodyweightqueue=[], bodyHeightqueue=[], Denfensequeue=[], Attackqueue=[], Healthqueue=[];
        //page3一排圈
        var th=page3SVG.selectAll("circle")
            .data(type_nested_data)
            .enter()
            .append("circle")
            .attr("cx", function(d,i){
                
                Health = d.values.map(d=> d.HealthStat);
                Healthqueue.push({"type":d.key,"data":Health,"which":"Health"});
                
                Attack = d.values.map(d=> d.AttackStat);
                Attackqueue.push({"type":d.key,"data":Attack,"which":"Attack"});
                
                Denfense = d.values.map((d)=>d.DefenseStat);
                Denfensequeue.push({"type":d.key,"data":Denfense,"which":"Defense"});
                
                bodyHeight = d.values.map((d)=>d.PokemonHeight);
                bodyHeightqueue.push({"type":d.key,"data":bodyHeight,"which":"bodyHeight"});
                
                bodyweight = d.values.map((d)=>d.PokemonWeight);
                bodyweightqueue.push({"type":d.key,"data":bodyweight,"which":"bodyweight"});
                
                return 140 + i*100
            })
            .attr("cy", 150)
            .attr("r",50)
            .style("fill", function(d,i){
                return fill(d.key)
            } )                            
            .style("stroke", "white")
            .style("stroke-width", 2)
            .attr('transform', 'translate('+ [0,0]+')');;

            //console.log("HHH",Healthqueue);
        var nameArray=[bodyweightqueue, bodyHeightqueue, Denfensequeue, Attackqueue, Healthqueue];
        var titleArray=["Weight (g)","Height (cm)","Defense","Attack","Health"];
        var all = d3.select("#page3").append("g")/* .call(brush)*/;

//page3長相
        var face = d3.select("#page3").append("g")/*五個折線圖 */
        .attr("width", width + margin.left + margin.right+100000)
        .attr("height", height + margin.top + margin.bottom+100000)

        var Pokemontooltip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d){

            face.selectAll("image").remove();
            face.append("image")
            .attr('x', 1570)
            .attr('y', 500)
            .attr('width', 430)
            .attr('height', 430)
            .attr("xlink:href", "pokemon3/pokemon/"+d.data.PokedexNumber+".png")

            return "名字: "+d.data.PokemonName+"<br>";
        });
        all.call(Pokemontooltip);
//長相
    var button4 = page3SVG.append("a").attr("href","#page4")
    .append("image")
    .attr('width', 300)
    .attr('height', 300)
    .attr("transform","translate(" + 1700 + "," + 1000 + ")")
    .attr("xlink:href","become-removebg-preview.png")

        var Page3tooltip = d3.tip()
                    .attr('class', 'd3-tip')
                    .html(function(d,i){
                        var allsmallsvg=[];
                        var generatorList=[],binList=[]
                        ,hhList=[],xList=[],yList=[];

                        var packLayout1 = d3.pack()
                        .size([800, 800])
                
                        var dataObj = {
                            children: d.values
                        }
                
                        root = d3.hierarchy(dataObj)
                        .sum(function(d) { return d.len; })
                        .sort(function(a, b) { return b.value - a.value; });
                        
                        nodes1 = packLayout1(root).descendants();
                        nodes1.splice(0,1)//刪除最下面的圈
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                       
//page3 brush-link
                        var thisType;
                        var brush = d3.brush()
                        .extent([[margin.left+450, 300], [width+650,height+500]])
                        .on("end", brushed)
                        .on("brush", brushed)
                        .on("end", endbrushed);
                        

                        function brushed() {
                            var extent = d3.event.selection;
                            //console.log(extent);
                            
                            thisType
                            .classed('selected', function(d) { 
                                selected = d.x*1.3 >= extent[0][0]-500 && 
                                            d.x*1.3 <= extent[1][0]-500 && 
                                            d.y*1.3 >= extent[0][1]-300 && 
                                            d.y*1.3 <= extent[1][1]-300;
                                
                                return selected;
                            });
                            
                        }

                        let link=[];
                        function endbrushed() {
                            if(d3.event.selection===null){
                                link=[];

                            }
                            else{
                                const [[x0, y0], [x1, y1]] = d3.event.selection;
                                var name=[];
                                
                                    link = nodes1
                                    .filter(d => {
                                    return x0-500 <= d.x*1.3 &&
                                        x1-500 >= d.x*1.3 &&
                                        y0-300 <= d.y*1.3 &&
                                        y1-300 >= d.y*1.3;
                                    }).map(d => d.data)  
                                    
                                    var qq0=link.map(d => d.PokemonWeight)
                                    name.push(qq0)
 
                                    var qq1=link.map(d => d.PokemonHeight)
                                    name.push(qq1)

                                    var qq2=link.map(d => d.DefenseStat)
                                    name.push(qq2)

                                    var qq3=link.map(d => d.AttackStat)
                                    name.push(qq3)

                                    var qq4=link.map(d => d.HealthStat)
                                    name.push(qq4)


                                    for(var i=0;i<name.length;++i){
                                    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                                        xScale1=xList[i]
                                        bin=binList[i]
                                        yScale1=yList[i]
                                    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                                        
                                        gg=hhList[i](name[i]);

                                        allsmallsvg[i].transition().delay(200)
                                        .duration(300).attr("d",generatorList[i](gg));   
                                    }                   
                                

                            }
                        }
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%                 
                        all.selectAll("circle").remove();
                        //all.selectAll("rect").remove();
                        all.call(brush);
                        
                        thisType = all
                            .selectAll("circle")
                            .data(nodes1)
                            .enter()
                            .append("circle")
                            .attr("cx",function(d,i){
                                return d.x*1.3;
                            })
                            .attr("cy",function(d,i){
                                return d.y*1.3;
                            })
                            .attr("r",20)
                            .attr("fill",function(d){return fill(d.data.PrimaryType)})//
                            .attr("opacity",transparent)
                            .style("stroke", "white")
                            .style("stroke-width", 2)
                            .attr('transform', 'translate('+ [500,300]+')');

                            thisType.on('mouseover',Pokemontooltip.show)
                            .on('mouseout',Pokemontooltip.hide)
                        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$                          
                        llll.selectAll("path").remove();
                        llll.selectAll("g").remove();
                        llll.selectAll("text").remove();

                        for(var j = 0; j < nameArray.length; ++j){
                            for (var i = 0; i < nameArray[j].length; i++) {
                                if(d.key===nameArray[j][i].type){
                                    Health=nameArray[j][i].data;
                                }
                                
                            }

                                let minH=d3.min(Health);
                                let maxH=d3.max(Health);
                                var xScale1 = d3.scaleLinear()
                                    .domain([minH,maxH])
                                    .range([margin.left-5,350]);
                            
                                var hh=d3.histogram().value(d=>d)
                                    .thresholds(xScale1.ticks(5))
                                    .domain(xScale1.domain());
                                
                                var newhh=d3.histogram().value(d=> d)
                                    .thresholds(xScale1.ticks(5))
                                    .domain(xScale1.domain());
                            
                            
                                var bin = hh(Health);

                                var MM=0;
                                var yScale1 = d3.scaleLinear()
                                    .domain([0, d3.max(bin,
                                        function(d) {
                                            if(d.length>=MM){
                                                MM=d.length;
                                            }
                                            return d.length;
                                        })])
                                    .range([height,400]);
                            
                            
                                //Axis

                                var xAxis = d3.axisBottom(xScale1);
                                llll.append("g").attr("transform",`translate(${30+j*402},${height+1000})`).style("color", "white").style("font-size","20px").call(xAxis);
                                llll.append( 'text' ).attr( 'x', 255+j*402).attr( 'y',1950 ).attr( 'text-anchor', 'middle' ).text( titleArray[j ] )
                                .style("font-size","30px") .style("fill", "white");            
                                var yAxis = d3.axisLeft(yScale1).ticks(Math.sqrt(MM));
                                llll.append("g").attr("transform",`translate(${30+margin.left-7+j*402},${1000})`).style("color", "white").style("font-size","20px").call(yAxis);
                                llll.append( 'text' ).attr( 'x', -1650).attr( 'y',30 +j*402).attr( 'text-anchor', 'middle' ).attr( 'transform', 'rotate( -90 )' ).style("font-size","30px")
                                .text( 'Number of Pokemon' ) .style("fill", "white");            
                            
                                var lineGenerator = d3.area()
                                                        .curve(d3.curveMonotoneX)
                                                        .x(function(d) {return xScale1(d.x0); })
                                                        .y0(yScale1(0))
                                                        .y1(function(d) {return yScale1(d.length); })

                            
                                var line = llll//全
                                    .append("path")
                                    .attr("d",lineGenerator(bin))
                                    .attr("fill","none")
                                    .attr("stroke","steelblue")
                                    .attr("stroke-width",1)
                                    .attr("r",1).attr("fill","#1e90ff").attr("opacity",0.7)
                                    .style("stroke", "white")
                                    .style("stroke-width", 2)
                                    .attr("transform",`translate(${30+j*402},${1000})`)
                            
                                var line2 = llll//部分
                                    .append("path")                            
                                    .attr("opacity",0.8)
                                    .attr("fill","none")
                                    .attr("stroke","pink")
                                    .attr("stroke-width",1)
                                    .attr("r",1).attr("fill","pink")
                                    .style("stroke", "white")
                                    .style("stroke-width", 2)
                                    .attr("transform",`translate(${30+j*402},${1000})`)
                                    
                                    allsmallsvg.push(line2);
                                    generatorList.push(lineGenerator);
                                    hhList.push(hh);
                                    xList.push(xScale1);
                                    yList.push(yScale1);
                                    binList.push(bin);
                        }                

                    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
                        return "type: "+d.key;
                    });
                    page3SVG.call(Page3tooltip);

                    th.on('mouseover',Page3tooltip.show)
                    .on('mouseout',Page3tooltip.hide)  

//---------------------------------------------------------------------------------------------


        var Qtooltip = d3.tip()
                    .attr('class', 'd3-tip')
                    .html(function(d){
                        return "預設等級: "+d.level/*+"<br>其餘皆"+d.others*/;
                    });
                    page2SVG.call(Qtooltip);

        var tooltip = d3.tip()
            .attr('class', 'd3-tip')
            .html(function(d){
                //console.log("qq",d);
                if(d.data.PokemonName===undefined){
                    return "Type: "+d.data.PrimaryType;
                }
                else{
                    return "PokemonName: "+d.data.PokemonName+"<br>"+"Generation: "+d.data.Generation;
                }
            });
        svg.call(tooltip);


        var packLayout = d3.pack()
        .size([1000, 1000])

        var dataObj = {
            children: Type
        }

        var root = d3.hierarchy(dataObj)
        .sum(function(d) { return d.len; })
        .sort(function(a, b) { return b.value - a.value; });


        let nodes = packLayout(root).descendants();
        nodes.splice(0,1)//刪除最下面的圈
        //console.log(root);

        var focus = root;
        var fillColor=["#FFC300","#FF6666"/*red */,"purple","#1e90ff","pink","grey","green","#330466"/*dark*/,"orange","lightgreen","#DEB887","blue","#FFFFCC","#FFCC99","#66CC00","#81D8D0"/*"#00CCCC"flying */,"#FF6600","darkgray"];
        var plot = svg.selectAll("circle").data(nodes)
        .enter()
        .append("circle")
        .attr("cx",function(d){
            //console.log(d);
            return d.x;
        })
        .attr("cy",function(d){
            return d.y;
        })
        .attr("r",function(d) { return d.r; })
        .attr("fill",function(d){return fill(d.data.PrimaryType)})//
        .attr("opacity",transparent)
        .style("stroke", "#CD5C5C")
        .style("stroke-width", 2)
        .attr('transform', 'translate('+ [650,300]+')');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //戰鬥框group
        const svgFight1 = d3.select(/*"svg"*/"#main").append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        const svgFight2 = d3.select(/*"svg"*/"#main").append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
        const vs = d3.select(/*"svg"*/"#main").append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    //-----------------------------------------------------------------------
        //戰鬥框
        var rect1Range=[1400,200];//左戰鬥框y,x起點
        var rect2Range=[1400,1300];
        vs.append('text')
            .attr('x', rect1Range[1]+985)
            .attr('y', rect1Range[0]+400)
            .style('fill', 'white'/*'steelblue'*/)
            .style('font-size', '60px')
            .style('font-weight', 'bold') 
            .text("V.S")

        var oneone = svgFight1//底1
        .append("rect")
        .attr("y",rect1Range[0]-20)
        .attr("x",rect1Range[1]-20)
        .attr("rx",100)
        .attr("ry",100)
        .attr("height",800)
        .attr("width",1000)
        .attr("fill","LightCoral")
        .attr("opacity",0.5);
        var one = svgFight1//圖框1
        .append("rect")
        .attr("y",rect1Range[0])
        .attr("x",rect1Range[1])
        .attr("rx",100)
        .attr("ry",100)
        .attr("height",500)
        .attr("width",500)
        .attr("fill","LightCoral")
        .attr("opacity",0.5);

        var twotwo = svgFight2//底2
        .append("rect")
        .attr("y",rect2Range[0]-20)
        .attr("x",rect2Range[1]-20)
        .attr("rx",100)
        .attr("ry",100)
        .attr("height",800)
        .attr("width",1000)
        .attr("fill","#FEE23E")
        .attr("opacity",0.5);
        var two = svgFight2//圖框2
        .append("rect")
        .attr("y",rect2Range[0])
        .attr("x",rect2Range[1])
        .attr("rx",100)
        .attr("ry",100)
        .attr("height",500)
        .attr("width",500)
        .attr("fill","#FFD319")
        .attr("opacity",0.5);

        //barchart
        var rect1 = d3.select(/*"svg"*/"#main").append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");
        var rect2 = d3.select(/*"svg"*/"#main").append("g")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

        var bartooltip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d){
            return d.number;
        });

        rect1.call(bartooltip);
        rect2.call(bartooltip);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var mydatacolor1=[],mydatacolor2=[],mydata1=[],mydata2=[],
            countt1=0,countt2=0;
        var first,second;

        var drag = d3.drag()  
            .on('start', function() { 
              //拖拉開始時，要做什麼事 
            })
            .on('drag', function(d) { 
              //拖拉時，要做什麼事
              var current = d3.select(this);
              if(d.parent!==focus){ 
                current
                    .attr('cx', d3.event.x)
                    .attr('cy', d3.event.y);
              }
            })
            .on("end", function (d) {
                if(d.parent!==focus){
                var current = d3.select(this);
                //console.log(d3.event.x) 
                //console.log(d3.event.y) 
                var arr =[d.data.PokemonName,d.data.PrimaryType,d.data.PokemonHeight,d.data.PokemonWeight,d.data.PrimaryAbility]
                var arrText =["Name: ","Type: ","Height: ","Weight: ","PrimaryAbility: "]
                
                var barchartData=
                [
                    {
                        "name":"Health",
                        "number":d.data.HealthStat
                    },
                    {
                        "name":"Attack",
                        "number":d.data.AttackStat
                    },
                    {
                        "name":"Defense",
                        "number":d.data.DefenseStat
                    },
                    {
                        "name":"Speed",
                        "number":d.data.SpeedStat
                    }
                ]

                if(d3.event.x>=-450&&d3.event.x<=50&&d3.event.y>=1100&&d3.event.y<=1600){
                    svgFight1.selectAll('image').remove();
                    svgFight1.selectAll('text').remove();

                    first = [d.data.HealthStat,d.data.AttackStat,d.data.DefenseStat,d.data.SpeedStat,d.data.PokemonName];
                    
                    if(countt1!==0){                     
                        var tmp=mydata1.pop(); 
                        var qqq=mydatacolor1.pop();
                        d3.select(tmp).attr("fill",fill(qqq.data.PrimaryType)).transition();
                    }
                    countt1++;

                    svgFight1.append("image")
                    .attr('x', rect1Range[1])
                    .attr('y', rect1Range[0])
                    .attr('width', 500)
                    .attr('height', 500)
                    .attr("xlink:href", "pokemon3/pokemon/"+d.data.PokedexNumber+".png")
                    
                    for (i = 1; i < arr.length+1; i++) { 
                        svgFight1.append('text')
                            .attr('x', rect1Range[1]+530)
                            .attr('y', rect1Range[0])
                            .style('fill', /*'steelblue'*/'white')
                            .style('font-size', '30px')
                            .style('font-weight', 'bold') 
                            .text(arrText[i-1]+arr[i-1])
                            .attr("dy",  3*i+"em" ) ;  
                    } 
         
                    rect1.selectAll("rect").remove();
                    rect1.selectAll("g").remove();
                    
                    var number = barchartData.map((d)=>d.number);
                    var barScale = d3.scaleBand().domain(barchartData.map((d)=>d.name)).range([margin.left,900])
                    .paddingInner(0.3).paddingOuter(0.2);
                    var yScaleb = d3.scaleLinear().domain([d3.max(number),0]).range([margin.top,250]);
                    
                    var xAxis = d3.axisBottom(barScale);
                    rect1.append("g").attr("transform",`translate(200,${2120})`).style("font-size","30px").call(xAxis);
                    var yAxis = d3.axisLeft(yScaleb);
                    rect1.append("g").attr("transform",`translate(${250},1870)`).style("font-size","20px").call(yAxis);

                    var rects = rect1.selectAll("rect")
                    .data(barchartData)
                    .enter()
                    .append("rect")
                    .attr("y",function(d){
                        console.log("789789",d.number);
                        return yScaleb(d.number)+1870;
                    })
                    .attr("x",function(d){
                        return barScale(d.name)+200;
                    })
                    .on('mouseover',bartooltip.show)
                    .on('mouseout',bartooltip.hide)
                    .attr("width",barScale.bandwidth)
                    .transition().delay(200).duration(300)
                    .attr("height",function(d){
                        return 250-yScaleb(d.number);
                    })
                    .attr("fill","#ffa500");


                    mydata1.push(this)
                    mydatacolor1.push(d)

                    d3.select(this).transition()
                        .attr("fill", "black")
                        .attr("r", function(d) { return 2*d.r; })
                    .transition()
                        .attr("r", function(d) { return d.r; })
                        .attr("fill", "LightCoral");
                }
                else if(d3.event.x>=rect2Range[0]-745&&d3.event.x<=rect2Range[0]-255&&d3.event.y>=1100&&d3.event.y<=1600){
                    svgFight2.selectAll('image').remove();
                    svgFight2.selectAll('text').remove();

                    second = [d.data.HealthStat,d.data.AttackStat,d.data.DefenseStat,d.data.SpeedStat,d.data.PokemonName];                    
                    
                    if(countt2!==0){                                               
                        var tmp=mydata2.pop(); 
                        var qqq=mydatacolor2.pop();                      
                        d3.select(tmp).attr("fill",fill(qqq.data.PrimaryType)).transition();
                    }
                    countt2++;

                    svgFight2.append("image")
                            .attr('x', rect2Range[1])
                            .attr('y', rect2Range[0])
                            .attr('width', 500)
                            .attr('height', 500)
                            .attr("xlink:href", "pokemon3/pokemon/"+d.data.PokedexNumber+".png")  


                    for (i = 1; i < arr.length+1; i++) { 
                        svgFight2.append('text')
                            .attr('x', rect2Range[1]+530)
                            .attr('y', rect2Range[0])
                            .style('fill', /*'steelblue'*/'white')
                            .style('font-size', '30px')
                            .style('font-weight', 'bold') 
                            .text(arrText[i-1]+arr[i-1])
                            .attr("dy",  3*i+"em" ) ;  
                    }
                    
                    rect2.selectAll("rect").remove();
                    rect2.selectAll("g").remove();
                    
                    var number = barchartData.map((d)=>d.number);
                    var barScale = d3.scaleBand().domain(barchartData.map((d)=>d.name)).range([margin.left,900])
                    .paddingInner(0.3).paddingOuter(0.2);
                    var yScaleb = d3.scaleLinear().domain([d3.max(number),0]).range([margin.top,250]);
                    
                    var xAxis = d3.axisBottom(barScale);
                    rect2.append("g").attr("transform",`translate(1300,${2120})`).style("font-size","30px").call(xAxis);
                    var yAxis = d3.axisLeft(yScaleb);
                    rect2.append("g").attr("transform",`translate(${1350},1870)`).style("font-size","20px").call(yAxis);

                    var rects = rect2.selectAll("rect")
                    .data(barchartData)
                    .enter()
                    .append("rect")
                    .attr("y",function(d){
                        return yScaleb(d.number)+1870;
                    })
                    .attr("x",function(d){
                        return barScale(d.name)+1300;
                    })
                    .attr("width",barScale.bandwidth)
                    .on('mouseover',bartooltip.show)
                    .on('mouseout',bartooltip.hide)
                    .transition().delay(200).duration(300)
                    .attr("height",function(d){
                        return 250-yScaleb(d.number);
                    })
                    .attr("fill","#ffa500");

                    mydata2.push(this)
                    mydatacolor2.push(d)
                    
                    d3.select(this).transition()
                        .attr("fill", "black")
                        .attr("r", function(d) { return 2*d.r; })
                    .transition()
                        .attr("r", function(d) { return d.r; })
                        .attr("fill", /*"LightCoral"*/"yellow");
                }
                //回原位
                current.attr("cx",function(d){
                    return d.x;
                })
                .attr("cy",function(d){
                    return d.y;
                });
                if(countt1>0&&countt2>0){//對戰結果
                    //Damage=((((2*level)/5+2)*power*A/D)/50+2)*target*weather*badge*critical*random*STAB*TYPE*BURN*other
                    var init=            
                        [{
                            "level":10,
                            "others":1
                        }];

                    var HP1=(2*first[0])*10/100+10+10
                    console.log("HP1",HP1);
                    var HP2=(2*second[0])*10/100+10+10
                    console.log("HP2",HP2);
                    var Damage1 = ((((2*10)/5+2)*1*first[1]/second[2])/50+2)*1*1*1*1*((Math.random() * (1.0 - 0.85) + 0.85).toFixed(2))*1*1*1*1;
                    console.log("Damage1",Damage1);
                    var Damage2 = ((((2*10)/5+2)*1*second[1]/first[2])/50+2)*1*1*1*1*((Math.random() * (1.0 - 0.85) + 0.85).toFixed(2))*1*1*1*1;
                    console.log("Damage2",Damage2);

                    page2SVG.selectAll("g").remove();
                    page2SVG.selectAll("rect").remove();
                    page2SVG.selectAll("text").remove();

                    var two = page2SVG//圖框2
                    .append("rect")
                    .attr("y",300)
                    .attr("x",100)
                    .attr("rx",100)
                    .attr("ry",100)
                    .attr("height",500)
                    .attr("width",1200)
                    .attr("fill","#F4F6F7")
                    .attr("opacity",0.5);

                    page2SVG.append('text')
                    .attr('x', 1182)
                    .attr('y', 415)
                    .style('fill', 'white')
                    .style('font-size', '50px')
                    .style('font-weight', 'bold') 
                    .text("?");   

                    var Q=page2SVG.append('circle').data(init)
                    .style('fill', 'blue')
                    .attr("cx",1200)
                    .attr("cy",400)
                    .attr("r",50)
                    .attr("fill","purple")//
                    .attr("opacity",0.5)

                    Q.on('mouseover',Qtooltip.show).on('mouseout',Qtooltip.hide)
                    
                    page2SVG.append('text')
                    .attr('x', 200)
                    .attr('y', 400)
                    .style('fill', 'blue')
                    .style('font-size', '50px')
                    .style('font-weight', 'bold') 
                    .text("對戰結果分析");

                    if(HP1/Damage2 < HP2/Damage1){
                        page2SVG.append('text')
                        .attr('x', 530)
                        .attr('y', 580)
                        .style('fill', 'red')
                        .style('font-size', '50px')
                        .style('font-weight', 'bold') 
                        .text(first[4]+" WIN!");
                    }
                    else{
                        page2SVG.append('text')
                        .attr('x', 530)
                        .attr('y', 580)
                        .style('fill', 'red')
                        .style('font-size', '50px')
                        .style('font-weight', 'bold') 
                        .text(second[4]+" WIN!");
                    }

                    var button2 = svg.append("a").attr("href","#page2")
                    .append("image")
                    .attr('width', 500)
                    .attr('height', 500)
                    .attr("transform","translate(" + 2050 + "," + 800 + ")")
                    .attr("xlink:href","become-removebg-preview.png")


                    var buttonBack = page2SVG.append("a").attr("href","#main")
                    .attr('width', 500)
                    .attr('height', 500)
                    .attr("transform","translate(" + 900 + "," + 730 + ")")
                    .append("text").text("回上一頁重新選擇寶可夢!").style("font-size","30px")

                    var button3 = page2SVG.append("a").attr("href","#page3")
                    .append("image")
                    .attr('width', 240)
                    .attr('height', 240)
                    .attr("transform","translate(" + 1259 + "," + 400 + ")")
                    .attr("xlink:href","become-removebg-preview.png")


 
                }

            }
            });
            drag(plot)

        //tooltip、click
        plot.on('mouseover',tooltip.show)
            .on('mouseout',tooltip.hide)


        function transparent(d){
            if(d.height===0){
                return 1;
            }
            else{
                return 0.5;
            }
        }
        function fill(d) {//console.log(d)
            switch(d) {
                case '"Fighting"':
                    return fillColor[0]
                case '"Fire"':
                    return fillColor[1]
                case '"Poison"':
                    return fillColor[2]
                case '"Water"':
                    return fillColor[3]
                case '"Fairy"': 
                    return fillColor[4]
                case '"Steel"':  
                    return fillColor[5]
                case '"Ghost"':
                    return fillColor[6]
                case '"Dark"':
                    return fillColor[7]
                case '"Psychic"':
                    return fillColor[8] 
                case '"Grass"':
                    return fillColor[9]  
                case '"Ground"':
                    return fillColor[10]    
                case '"Ice"':
                    return fillColor[11]
                case '"Normal"':
                    return fillColor[12]      
                case '"Electric"':
                    return fillColor[13]
                case '"Bug"':
                    return fillColor[14]
                case '"Flying"':
                    return fillColor[15]
                case '"Dragon"':
                    return fillColor[16]
                case '"Rock"':
                    return fillColor[17]
            }
        }

    })
    .catch(function(error){
        console.log(error);
    });