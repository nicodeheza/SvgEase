export default function getDbQuery(searchQuery){

    if(searchQuery.categories.length > 0 ||  searchQuery.tags.length > 0 || searchQuery.text){

        let obj= {};
        if(searchQuery.categories.length > 0){
            obj.category= {$in: searchQuery.categories};
        }
        if(searchQuery.tags.length > 0){
            obj.tags= {$in: searchQuery.tags};
        }
        if(searchQuery.text){
            const regEx= new RegExp(searchQuery.text, 'i');
            obj.name= regEx,
            obj.category?.$in.push(regEx);
            obj.tags?.$in.push(regEx);
        }

        return obj;

    }else{
        return {};
    }


}