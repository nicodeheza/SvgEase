import { useState } from "react"
import SearchIcon from "./icons/SearchIcon";
import DropIcon from './icons/DropIcon';
import OpenListIcon from './icons/OpenListIcon';
import CloseListIcon from './icons/CloseListIcon'; 
import styles from './search.module.css';
import Close from "./icons/Close";

const tags={
    parallax:['parallax', 'categoria2','cartegoria3','categoria4', 'cartegoria5', 'categoria6'],
    ilustraciones:['ilustraciones', 'categoria2','cartegoria3','categoria4', 'cartegoria5', 'categoria6'],
    carga:['carga', 'categoria2','cartegoria3','categoria4', 'cartegoria5', 'categoria6'],
    botones:['botones', 'categoria2','cartegoria3','categoria4', 'cartegoria5', 'categoria6'],
    trajetas:['trajetas', 'categoria2','cartegoria3','categoria4', 'cartegoria5', 'categoria6']
}

export default function Search({setFloatWin, open}){
    const[query, setQuery]= useState({
        text:'',
        tags:[]
    });
    const [openTabs, setOpenTabs]=useState(getOpenTabsInitialState());

    
    function getOpenTabsInitialState(){
        let obj= {}
        for(let ele in tags){
            obj[ele]= false;
        }
        return obj
    }
    

    function searchByText(){
        console.log(query.text);
    }

    function addTag(item, mTag){
        if(query.tags.find(ele=> ele === mTag) === undefined
        && query.tags.find(ele=> ele === item) === undefined){
            if(item === mTag){
                setQuery({...query , tags:[...query.tags, mTag] });
            }else{
                setQuery({...query , tags:[...query.tags, mTag, item] });
            }
        }else
        if(query.tags.find(ele=> ele === item) === undefined
        && query.tags.find(ele=> ele === mTag) !== undefined){
            setQuery({...query , tags:[...query.tags, item] });
        }else if(query.tags.find(ele=> ele === mTag) === undefined
        && query.tags.find(ele=> ele === item) !== undefined){
            setQuery({...query , tags:[...query.tags, mTag] });
        }
    }

    function deleteTag(i){
        const updateArr= [...query.tags]
        updateArr.splice(i,1);
        setQuery({...query, tags: updateArr});
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
                 Object.keys(tags).map((ele ,i )=>(
                     <div key={i}>
                      <div className={styles.titleContainer}>
                      <h4 className={styles.tagTitle}>{ele}</h4>
                      <button onClick={()=>setOpenTabs(prev=>{return {...prev, [ele]: !prev[ele]}})}
                      className={styles.openCloseBtn}>
                          {openTabs[ele] ? (<OpenListIcon classN={styles.openCloseIcon} />) : 
                          (<CloseListIcon classN={styles.openCloseIcon}/>)}
                      </button>
                      </div>
                      <ul className={openTabs[ele] ? styles.tagContainerOpen : styles.tagContainerClose}>
                          {
                              tags[ele].map((items, i)=>(
                                <li key={i} onClick={()=> addTag(items, ele)}
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