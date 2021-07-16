import style from '../btns/textBtn.module.css'

export default function LoginIcon({classN}){

    return(

<svg version="1.1"
	 xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
     xmlnsa="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
     viewBox="0 0 13.9 23"  className={classN ? classN : style.icon}>
         <g>
	<path  d="M6.9,10.3L6.9,10.3c-3.8,0-6.9,3.1-6.9,6.9L0,23h6.9h6.9v-5.8C13.9,13.4,10.8,10.3,6.9,10.3z"/>
	<circle cx="6.9" cy="4.5" r="4.5"/>
        </g>
</svg>

    )
}


