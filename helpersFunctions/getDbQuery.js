export default function getDbQuery(searchQuery){

    if(searchQuery.categories.length > 0 ||  searchQuery.tags.length > 0 || searchQuery.text){

        let obj= {$or:[]};
        if(searchQuery.categories.length === 1){
            obj.category= searchQuery.categories[0];
        }else{
            searchQuery.categories.forEach(ele=>{
                obj.$or.push({category: ele});
            });
        }
        if(searchQuery.tags.length === 1){
            obj.tags= searchQuery.tags[0];
        }else{
            searchQuery.tags.forEach(ele=>{
                obj.$or.push({tags: ele});
            });
        }
        if(searchQuery.text){
            const regEx= new RegExp(searchQuery.text, 'i');
            obj.$or.push({name: regEx});
            obj.$or.push({tags: regEx});
            obj.$or.push({category: regEx});
        }

        if(obj.$or.length === 1){
            return obj.$or[0];
        }else{
            if(obj.$or.length === 0){
                delete obj.$or;
            }
            return obj;
        }

    }else{

        return {};
    }


}