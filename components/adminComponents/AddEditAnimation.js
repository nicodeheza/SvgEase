import { useState } from "react";
import Close from "../icons/Close";
import DropIcon from "../icons/DropIcon";
import styles from './addEditAnimation.module.css';

export default function AddEditAnimation(){

    const [formData, setFormData]= useState({
        name:'',
        category:'',
        tags:[],
        price: null    
    });

    const [tag, setTag]=useState('');

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

    function submitFom(e){
        e.preventDefault();
        console.log(formData);
    }

    return(
        <aside className={styles.mainContainer}>
            <div className={styles.header}>
                <h3>Agregar Animación</h3>
                <button>
                    <Close classN={styles.closeIcon} />
                </button>
            </div>
            <form>
                <input type='file' placeholder='Subir Archivo' className={styles.file} />
                <input type='text' placeholder='Nombre' maxLength='25' className={styles.input}
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
                <div>
                <input type='text' placeholder='Categorías Optativas' maxLength='25' className={styles.input}
                value={tag} onChange={(e)=>setTag(e.target.value)} />
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
                <input type='number' placeholder='Precio' value={formData.price} className={styles.input + ' '+ styles.currencyInput}
                onChange={(e)=>setFormData({...formData, price: e.target.value})} />
                <select className={styles.currency}>
                    <option value='usa'>USA$</option>
                    <option value='ars'>ARS$</option>
                </select>
                </div>
                <button type='submit' onClick={(e)=>submitFom(e)} className={styles.submitBtn}>Agregar</button>
            </form>
        </aside>
    )
}