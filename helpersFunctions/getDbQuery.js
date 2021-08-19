export default function getDbQuery(searchQuery){
    
    const query= {...searchQuery};
    
    if(query.categories.length > 0 ||  query.tags.length > 0 || query.text){

        let obj= {};
        
        if(query.categories.length > 0){
            obj.category= {$in: query.categories};
        }
        if(query.tags.length > 0){
            obj.tags= {$in: query.tags};
        }
        if(query.text){
            const regEx= new RegExp(query.text, 'i');
            let orObj={$or:[
                {name: regEx},
                {category: regEx},
                {tags: regEx}
            ]};
           if(Object.keys(obj).length > 0){
               orObj.$or.push(obj);
           }

           return orObj;
        }

        return obj;

    }else{
        return {};
    }


}