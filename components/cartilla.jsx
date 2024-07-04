import react from   'react';
import { useState,useEffect } from 'react';
import { questions} from '../data/questions.json'
import './cartilla.css'
export function Cartilla(){

    const withResult = questions
    const [data, setData] = useState([])
    const [questRandom, setQuestRandom] = useState([])
    const [options, setOptions] = useState([])
    const [trueAnswer, setTrueAnswer] = useState(false)
    const [correctAnsw, setCorrectAnsw] = useState(false)
    useEffect( ()=>{
        setData(withResult)
    },[])

    const questAletoria = (data)=>{
        const numAletorio = Math.floor(Math.random() * 5) ;
        
        if(numAletorio === data[numAletorio].id){
            setQuestRandom(data[numAletorio])
        }

    }
    
    useEffect( ()=>{
        // console.log('<<<?',questRandom)
        const options = questRandom.options
        if (options) {
            setOptions(options);
        }
    },[questRandom])

    const evaluarRes = (optionClick,index)=>{

        if(optionClick.id === questRandom.answer){
 
            setCorrectAnsw(!correctAnsw)
            // optionCorrrect(optionClick)

        }else{
            setCorrectAnsw(false)
        }
    }

    const optionCorrrect=(option)=>{

       console.log('>>>>', option);
       if(option.id === questRandom.answer){
        return (
            <p className={correctAnsw ? 'correcta' : ''}>{option.text}</p>
        )
        }else{
        
        <p className=''>{option.text}</p>
       }
    }

    useEffect(()=>{
        console.log('%cCorrectAns >','color:white;background:rgba(0, 153, 255, 0.63);border-radius:10px 10px;padding:1px:font-size:15px;',correctAnsw);
;
    },[correctAnsw])

    return (
        <div>
            <h1>Una Cartilla</h1>
            
            <div className='cartilla'>
                <button onClick={()=>{questAletoria(data)}}>
                    ClickmeAletorio
                </button>
                <div className='textPrugunta'>
                   <h2> {questRandom.id+1}
                    {questRandom.question}</h2>
                </div>
                <ul>
                {options.length > 0 ? (
                        options.map((option, index) => (
                            <li 
                                onClick={()=>{evaluarRes(option,index) }}
                                key={index}
                                className={correctAnsw ? 'correcta textOption': 'textOption'}
                                >
                                <p>{option.id} {option.text}</p> 
                               
                            </li>
                        ))
                    ) : (
                        <p>Cargando...</p>
                    )}
                </ul>
                
            </div>
        </div>
    )
}