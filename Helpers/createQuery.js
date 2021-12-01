
function createQuery(object,id){
    let query='';
    let values=[];
    //create query string and insert variables for sanitization 
    for(let key in object){
        query = query.concat(` ${key}=$${values.length+1},`)
        values.push(object[key])
    }
    //remove extra comma
    query = query.substring(0,query.length-1)

    query = query.concat(` WHERE id= $${values.length+1};`)
    values.push(id)
    
    console.log({query,values})
    return {query,values}
}

module.exports = createQuery