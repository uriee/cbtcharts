/**
 * This constant a list of ordered colors that is usered in the cockpiture graphs.
 */
export const COLORS = ['#8884d8', '#00C49F', '#FFBB28', '#FF8042', '#0088FE','#91bfdb','#2c8d59','#448ec3', '#F0C49F', '#0FBB28', '#0F8042', '#F088FE','#F1bfdb','#Fc8d59','#F48ec3'];
/**
 * This constant is the path to the API server.
 */
export const server =  'http://192.9.200.10:4002/' //'http://192.9.200.17:4000/'
/**
 * This function extract the Legend data from the total graph data
 * @name  getLegendData
 * @param {json} data: the data total graph data. 
 * @returns {json} the graphs legend data.
 */
export const getLegendData = function(data){
	const groups = data.map(function(item){return item.GROUPS}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	return groups.map(function(item,i){return {label: item, color: COLORS[i%COLORS.length]}});
};

/**
 * This function extract data from the total graph data and shape it in the form that can be used in a stacked bar graphs {name, stack}
 * @name  getbardata
 * @param {json} data:  the data total graph data. 
 * @returns {Object} {bardata: the graph data table ,groups: the graphs groups}
 */
export const getbardata  = function(data) {
    const x = data.map(function(item){return item.X}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });      
    const table = x
                  .map(function(q1,i){return Object.assign({X:q1},data
                      .filter(function(q2){return q2.X===q1})
                      .reduce(function(w,q){w[q.GROUPS]=q.Y; return w},{})
                      )}
                    ) ;
    const y = data.map(function(item){return item.GROUPS}).filter(function(item, i, ar){ return ar.indexOf(item) === i; }) ;       
    const groups = y.map(function(item,i){ return {name: item, stack: 'a'}});
    return {bardata:table, groups:groups};
};

/**
 * This function extract data from the total graph data and shape it in the form that can be used in a line graphs
 * @name  getlinedata
 * @param {json} data:  the data total graph data. 
 * @returns {Object} {linedata: the graph data ,groups: the graphs serias}
 */
export const getlinedata  = function(data) {
    const x = data.map(function(item){return item.X}).filter(function(item, i, ar){ return ar.indexOf(item) === i; });      
    const table = x
                  .map(function(q1,i){return Object.assign({X:q1},data
                      .filter(function(q2){return q2.X === q1})
                      .reduce(function(w,q){w[q.GROUPS]=parseInt(q.Y,10); return w},{})
                      )}
                    ) ;
    const y = data.map(function(item){return item.GROUPS}).filter(function(item, i, ar){ return ar.indexOf(item) === i; }) ;       
    const groups = y.map(function(item,i){ return {name: item}}).reverse();
    return {linedata:table, groups:groups}
};

/**
 * This function extract the series data from the total graphs data.
 * @name  getcolumnes
 * @param {json} data:  the data total graph data. 
 * @returns {array} the series data 
 */
export const getcolumnes  = function(data) {
	var ret = []
	for (var x in data[0]) {
		ret.push({header:x, accessor: x,headerStyle:'font-size:30;'})
	}
	return ret;        
};

/**
 * This function extract data from the total graph data and shape it in the form that can be used in a pie chart
 * @name  getpiedata
 * @param {json} data:  the data total graph data. 
 * @returns {Object} {piex: the data for the pie that is groupd by the X columne,piegroups: the data for the pie that is groupd by the GROUPS columne}
 */
export const getpiedata = function(data){
    const x = data.map(item => item.X).filter((item, i, ar) => ar.indexOf(item) === i)  
    const groups = data.map(item => item.GROUPS).filter((item, i, ar) => ar.indexOf(item) === i) ;   
    /*      
    const piex = x
                  .map(function(q1,i){return Object.assign({name:q1},data
                      .filter(function(q2){return q2.X===q1})
                      .reduce(function(w,q){return {value: w['value'] + q.Y}},{value:0})
                      )}
                    ) ;
    const piegroupsold = groups
                  .map(function(q1,i){return Object.assign({name:q1},data
                      .filter(function(q2){return q2.GROUPS===q1})
                      .reduce(function(w,q){return {value: parseInt(w['value']) + q.Y}},{value:0})
                      )}
                    ) ;  
    */
  
    const piegroups = groups
                  .map(g => Object.assign({'name': g},
                    {value: data.filter(d => d.GROUPS === g)
                      .reduce((acc,x)=>parseInt(x.Y,10)+acc,0)
                    })
                  )
    const piex = x
                  .map(g => Object.assign({'name': g},
                    {value: data.filter(d => d.X === g)
                      .reduce((acc,x)=>parseInt(x.Y,10)+acc,0)
                    })
                  )                  

   return {piex,piegroups};
}; 