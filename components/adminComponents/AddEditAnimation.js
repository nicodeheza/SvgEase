import { useEffect, useState } from "react";
import Close from "../icons/Close";
import DropIcon from "../icons/DropIcon";
import Lottie from "lottie-web";
import priceInPesos from "../../helpersFunctions/priceInPesos";
import pesosToDolar from "../../helpersFunctions/pesosToDolar";
import styles from './addEditAnimation.module.css';


export default function AddEditAnimation({setFloatWin, open, usaToArs, categories, edit, setEdit, products, refreshData }){

    const [formData, setFormData]= useState({
        name:'',
        category:'',
        tags:[],
        price: '',
        file: null,    
    });

    const [priceDisplay, setPriceDisplay]= useState('');
    const [tag, setTag]=useState('');
    const[fileLoaded, setFileLoaded]= useState(false);
    const [message, setMessage]= useState('');
    const [currency, setCurrency]= useState('usa');
    const [autocomplete, setAutocomplete]= useState([]);
    const [newFile, setNewFile]= useState(false);
    

    //reset message
    useEffect(()=>{
        if(message){
            setTimeout(()=>{
                setMessage('')
            },5000);

        }
    },[message]);

    //Autocomplete
    useEffect(()=>{
        if(formData.category){
            const tagsObj= categories.find(ele=> ele.name === formData.category);
            if(tagsObj){
                setAutocomplete(tagsObj.tags);
            }
        }

    },[formData.category, categories]);

    //add edit data 
    useEffect(()=>{
        if(Object.keys(edit).length > 0){

            setNewFile(false);
            setFileLoaded(true);
            setFormData({...formData,
                name: edit.name,
                category: edit.category,
                tags: edit.tags,
                price: edit.price.toString()
            });
            setCurrency('usa');
            setPriceDisplay(edit.price.toString());
            setFloatWin('addEdit');

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[edit]);

    //load edit preview
    useEffect(()=>{
         if(edit._id && fileLoaded && !newFile){
            Lottie.destroy('prevAnimation');
             editPreviewFile(edit.file);
         }
    },[fileLoaded, edit, newFile])

    //clean on close
    useEffect(()=>{
        if(!open){
            setEdit({});
            setTag('');
            removeFile();
            setFormData({
                name:'',
                category:'',
                tags:[],
                price: '',
                file: null,    
            }); 
            setPriceDisplay('');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);


    // useEffect(()=>{
    //     console.log(products);
    // },[products]);



    function changeCurrency(newCurrency){
        if(priceDisplay){

        const stringPrice= priceDisplay;
        const numberPrice= parseFloat(stringPrice);
        
        if(currency === 'ars' && newCurrency ==='usa'){
            const price= pesosToDolar(numberPrice, usaToArs);
            const RoundPrice= Math.round(price * 100) / 100;
            setPriceDisplay(RoundPrice.toString());
            setFormData({...formData, price: RoundPrice.toString()});

        }else if(currency === 'usa' && newCurrency ==='ars'){
            const price= priceInPesos(numberPrice, usaToArs);
            const RoundPrice= Math.round(price * 100) / 100;
            setPriceDisplay(RoundPrice.toString());
            setFormData({...formData, price: stringPrice});
        }
      }

        setCurrency(newCurrency);
    }

    function onPriceChange(price){
        if(currency === 'ars'){
            setPriceDisplay(price);
            const numberPrice= parseFloat(price);
            const newValue= pesosToDolar(numberPrice, usaToArs);
            const RoundPrice= Math.round(newValue * 100) / 100;
            setFormData({...formData, price: RoundPrice.toString()});
        }else if(currency === 'usa'){
            setPriceDisplay(price);
            setFormData({...formData, price});
        }
    }

    function addTag(e){
        e.preventDefault();
        if(tag){
            let tagsArr=[...formData.tags];
            tagsArr.push(tag);
            setFormData({...formData, tags: tagsArr});
            setTag('');
        }
    }

    function removeTag(i){
        let tagsArr= [...formData.tags];
        tagsArr.splice(i,1);
        setFormData({...formData, tags: tagsArr});
    }

      function submitAdd(e){
        e.preventDefault();

        setMessage('Cargando...');

        if(formData.name && formData.category && formData.price && formData.file){
          
           // console.log(formData);

            fetch('/api/product', {
                method: 'POST',
                headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(res=> res.json())
            .then(data=>{
                if(data){
                    setMessage(data.message);
                    refreshData();
                }
            })
            .catch(err=> console.log(err));

            setTag('');
            removeFile();
            setFormData({
                name:'',
                category:'',
                tags:[],
                price: '',
                file: null,    
            });

            
        }else{
            setMessage('Nombre, categoría obligatoria y precio son requeridos');
        }
    }

    function submitEdit(e){
        e.preventDefault();

        if(formData.name && formData.category && formData.price ){
        const send= {...formData, id: edit._id}
        console.log(send);
        
        fetch('/api/product', {
            method: 'PUT',
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(send)
        }).then(res=> res.json())
        .then(data=>{
            if(data){
                setMessage(data.message);
                refreshData();
            }
        })
        .catch(err=> console.log(err));

        setEdit({});
        removeFile();

        setFormData({
            name:'',
            category:'',
            tags:[],
            price: '',
            file: null,    
        });
        setPriceDisplay('');

        //setRefresh(true);
    }else{
        setMessage('Nombre, categoría obligatoria y precio son requeridos');
    }

    }

    function addFile(file){
        
        setNewFile('true');
        let reader= new FileReader();
        reader.readAsText(file);
        reader.onload= playAnimation;
        setFileLoaded(true);

        function playAnimation(e){
            const animation= JSON.parse(e.target.result);

            Lottie.loadAnimation({
                container: document.getElementById('animation-preview'),
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animation,
                name:'prevAnimation'
            });

            setFormData({...formData, file: animation });
        }
    }
    function editPreviewFile(file){
      
        Lottie.loadAnimation({
            container: document.getElementById('animation-preview'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: file,
            name:'prevAnimation'
        });

    }


    function removeFile(){
        Lottie.destroy('prevAnimation');
        setFormData({...formData, file: null});
        setFileLoaded(false);
    }


    return(
        <aside className={open ? styles.mainContainer : styles.mainContainerClose}>
            <div className={styles.header}>
                <h3>Agregar Animación</h3>
                <button onClick={()=>setFloatWin('none')}>
                    <Close classN={styles.closeIcon} />
                </button>
            </div>
            <form>
                {
                    fileLoaded ? 
                    (<div className={styles.animationPreview} onClick={()=>removeFile()}>
                        <div id='animation-preview' className={styles.animation}/>
                    </div>) :
                    (
                        <input type='file' placeholder='Subir Archivo' className={styles.file} 
                        accept="application/JSON" onChange={(e)=>addFile(e.target.files[0])}/>
                    )
                }
                <input type='text' placeholder='Nombre' maxLength='20' className={styles.input}
                value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} />
                <select value={formData.category} className={styles.input}
                onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                    <option value=''>Categoría Obligatoria</option>
                    <option value='parallax'>Parallax</option>
                    <option value='ilustraciones'>Ilustraciones</option>
                    <option value='carga'>Carga</option>
                    <option value='botones'>Botones</option>
                    <option value='tarjetas'>Tarjetas</option>
                </select>
                <div className={styles.opCategories}>
                <input type='text' placeholder='Categoría Optativa' maxLength='25' className={styles.input}
                value={tag} onChange={(e)=>setTag(e.target.value)} list='categoryList'/>
                <datalist id='categoryList'>
              {
                  autocomplete ? autocomplete.map((tag, i)=>(
                      <option value={tag} key={i} />
                  )) : (null)
              }
                </datalist>
                <button onClick={(e)=> addTag(e)} className={styles.addTagBtn}>Agregar</button>
                </div>
                <div className={styles.categoryBox}>
                    <h4>Categorías Optativas Seleccionadas:</h4>
                    <ul>
                        {
                            formData.tags.map((tag , i)=>(
                                <li key={i}>
                                    {tag} <span onClick={()=>removeTag(i)}><DropIcon classN={styles.dropIcon}/></span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                <input type='number' placeholder='Precio' value={priceDisplay} className={styles.input + ' '+ styles.currencyInput}
                onChange={(e)=> onPriceChange(e.target.value)} />
                <select className={styles.currency} value={currency} onChange={(e)=>changeCurrency(e.target.value)}>
                    <option value='usa'>USA$</option>
                    <option value='ars'>ARS$</option>
                </select>
                </div>
                {
                    Object.keys(edit).length > 0 ? (
                        <div className={styles.editDropContainer}>
                            <button type='submit' className={styles.editBtn}
                            onClick={(e)=>submitEdit(e)}
                            >Editar</button>
                            <button className={styles.dropBtn}><DropIcon classN={styles.dropBtnIcon}/></button>
                        </div>
                    ): 
                    (
                        <button type='submit' onClick={(e)=>submitAdd(e)} className={styles.submitBtn}>Agregar</button>
                    )
                }
                
            </form>
            <p className={styles.message}>{message}</p>
        </aside>
    )
}