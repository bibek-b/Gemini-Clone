import React, {useContext, useRef, useState} from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../context/Context';

const Main = () => {

    const {onSent,input,setInput,recentPrompt,loading,showResult,resultData,sendShownText,isClicked} = useContext(context);

    
   
  return (
    <div className='main'>
    <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} />
    </div>
    <div className='main-container'>
        {!showResult ? <>
            <div className='greet'>
            <p><span>Hello, Dev.</span></p>
            <p>How Can I Help You Today?</p>
        </div>

       {isClicked?<></>:  <div className='cards'>
           <div onClick={() => sendShownText('Suggest Beautiful Places To See On An Upcoming Road Trip')} className='card'>
           <p>Suggest Beautiful Places To See On An Upcoming Road Trip</p>
           <img src={assets.compass_icon} />
           </div>
           <div className='card'  onClick={() => sendShownText('Briefly Summarize About This Concept : Redux ToolKit')} >
           <p>Briefly Summarize About This Concept : Redux ToolKit</p>
           <img src={assets.bulb_icon} />
           </div>
           <div className='card'  onClick={() => sendShownText('Brainstorm Team Bonding Activities For Our Work Retreat')} >
           <p>Brainstorm Team Bonding Activities For Our Work Retreat</p>
           <img src={assets.message_icon} />
           </div>
           <div className='card'  onClick={() => sendShownText('Improve The Readability Of The Following Code')} >
           <p>Improve The Readability Of The Following Code</p>
           <img src={assets.code_icon} />
           </div>
        </div>}
        </> : <><div className='result'>
            <div className='result-title'>
            <img src={assets.user_icon} />
            <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
            <img src={assets.gemini_icon} />
            {loading?<div className='loader'>
                <hr />
                <hr />
                <hr />
            </div>: <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
            </div>
        </div>
        </>
        }

        <div className='main-bottom'>
            <div className='search-box'>
                <input onChange={e => setInput(e.target.value)} value={input} type='text' placeholder='Enter Prompt Here' />
                <div>
                    <img src={assets.gallery_icon} />
                    <img src={assets.mic_icon} />
                    {input && <img onClick={() => onSent()} src={assets.send_icon} />}
                </div>
            </div>
            <p className='bottom-info'>
            Gemini May Display Inaccurate Info, Including About People, So Double-Check Its Response
            </p>
        </div> 
    </div>
    </div>
  )
}

export default Main