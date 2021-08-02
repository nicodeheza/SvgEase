import { useEffect, useState } from "react"
import SearchIcon from "./icons/SearchIcon";
import DropIcon from './icons/DropIcon';
import OpenListIcon from './icons/OpenListIcon';
import CloseListIcon from './icons/CloseListIcon'; 
import styles from './search.module.css';
import Close from "./icons/Close";
import {useRouter} from 'next/router'


export default function Search({setFloatWin, open, categories, searchQuery}){
    const[query, setQuery]= useState(searchQuery);
    const [openTabs, setOpenTabs]=useState(getOpenTabsInitialState());
    const [windowDef, setWindowDef]= useState(false);
    
    
    const router= useRouter();
    
    let urlSearchParams;
    if(windowDef){
        urlSearchParams = new URLSearchParams(window.location.search);
    }
    
    useEffect(()=>{
        setWindowDef(true)
    },[]);

    useEffect(()=>{
        let update= false;
        if(windowDef){
        if(query.categories.length > 0){
            urlSearchParams.set('categories', query.categories);
            update= true;
        }else{
            urlSearchParams.delete('categories');
            update= true;
        }

        if(query.tags.length > 0){
            urlSearchParams.set('tags', query.tags);
            update= true;
        }else{
            urlSearchParams.delete('tags');
            update= true;
        }

        if(update){
            const newParam= urlSearchParams.toString();
            if(newParam){
                router.replace(`/admin?${newParam}`);
            }else{
                router.replace('/admin');
            }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[query]);

    
    function getOpenTabsInitialState(){
        let obj= {}
        categories.forEach(ele=>{
            obj[ele.category]=false;
        });
        return obj
    }
    

    function searchByText(){
        if(windowDef){
        if(query.text){
            urlSearchParams.set('text', query.text);
        }else{
            urlSearchParams.delete('text');
        }

        const newParam= urlSearchParams.toString();
        if(newParam){
            router.replace(`/admin?${newParam}`);
        }else{
            router.replace('/admin');
        }
      }
    }

    function addTag(item, category){
        if(query.tags.find(tag=> tag === item) === undefined && 
        query.categories.find(cat=> cat === category) === undefined){
            setQuery({...query, tags: [...query.tags, item], categories: [...query.categories, category]});
        }else if(query.tags.find(tag=> tag === item) === undefined && 
        query.categories.find(cat=> cat === category)){
            setQuery({...query, tags: [...query.tags, item]});
        }
    }
    function addCategory(item){
        if(query.categories.find(category=> category === item) === undefined){
            setQuery({...query, categories:[...query.categories, item]});
        }
    }

    function deleteTag(i){
        const updateArr= [...query.tags]
        updateArr.splice(i,1);
        setQuery({...query, tags: updateArr});
    }

    function deleteCategory(i){
        const updateArr= [...query.categories]
        updateArr.splice(i,1);
        setQuery({...query, categories: updateArr});
    }

    return(
      <aside className={open?  styles.mainContainer : styles.mainContainerClose}>
          <div className={styles.closeContainer} onClick={()=>setFloatWin('none')}>
            <Close classN={styles.closeIcon}/>
          </div>
          <input type='Text' placeholder='Buscar...' value={query.text} className={styles.searchInput}
          onChange={(e)=> setQuery({...query, text: e.target.value})}/>
          <button onClick={()=>searchByText()} className={styles.searchBtn}>
              <SearchIcon classN={styles.searchIcon}/>
          </button>
          <div> 
              <h3 className={styles.title}>Filtros:</h3>
              <div className={styles.filterContainer}>
              {
                  
                  query.categories.map((ele, i)=>(
                      <div key={i} className={styles.filter}>
                      <p className={styles.filterTag}>{ele}</p>
                      <button onClick={()=>deleteCategory(i)} className={styles.dropBtn}>
                          <DropIcon classN={styles.dropIcon}/>
                      </button>
                      </div>
                  ))
              }
                  
              {
                  
                  query.tags.map((ele, i)=>(
                      <div key={i} className={styles.filter}>
                      <p className={styles.filterTag}>{ele}</p>
                      <button onClick={()=>deleteTag(i)} className={styles.dropBtn}>
                          <DropIcon classN={styles.dropIcon}/>
                      </button>
                      </div>
                  ))
              }
              </div>
          </div>

          <div>
             <h3 className={styles.title}>Categorías:</h3> 
             {
                 categories.map((ele ,i )=>(
                     <div key={i}>
                      <div className={styles.titleContainer}>
                      <h4 className={styles.tagTitle}>{ele.category}</h4>
                      <button onClick={()=>setOpenTabs(prev=>{return {...prev, [ele.category]: !prev[ele.category]}})}
                      className={styles.openCloseBtn}>
                          {openTabs[ele.category] ? (<OpenListIcon classN={styles.openCloseIcon} />) : 
                          (<CloseListIcon classN={styles.openCloseIcon}/>)}
                      </button>
                      </div>
                      <ul className={openTabs[ele.category] ? styles.tagContainerOpen : styles.tagContainerClose}>
                          <li className={styles.tags} onClick={()=>addCategory(ele.category)} >{ele.category}</li>
                          {
                              ele.tags.map((items, i)=>(
                                <li key={i} onClick={()=> addTag(items, ele.category)}
                                className={styles.tags}>
                                    {items}
                                </li>
                              ))
                          }
                      </ul>
                      </div>
                 ))
             }
          </div>

      </aside>  
    )
}