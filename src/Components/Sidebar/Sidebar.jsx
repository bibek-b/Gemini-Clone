import React, { useContext, useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';
import { context } from '../context/Context';

const Sidebar = () => {

    const [extended, setExtended] = useState(false);
    const {onSent, prevPrompts,setRecentPrompt,newChat} = useContext(context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    }
 
  return (
    <div className='side-bar'>
        <div className='top'>
            <img onClick={() => setExtended(prevValue => !prevValue)} className='menu' src={assets.menu_icon} />
            <div onClick={() => newChat()} className='new-chat'>
                <img src={assets.plus_icon} />
                {extended && <p>New Chat</p>}
            </div>
            {extended && <div className='recent'>
                <p className='recent-title'>Recent</p>
               {prevPrompts.map((item,index) => {
                return  (
                    <div onClick={() => loadPrompt(item)} className='recent-entry'>
                    <img src={assets.message_icon} />
                    <p>{item.slice(0,18)} ...</p>
                </div>
                )
               })}
            </div>}
        </div>

        <div className='bottom'>
            <div className='bottom-item recent-entry'>
                <img src={assets.question_icon} />
                {extended && <p>Help</p>}
            </div>
            <div className='bottom-item recent-entry'>
                <img src={assets.history_icon} />
                {extended && <p>Activity</p>}
            </div>
            <div className='bottom-item recent-entry'>
                <img src={assets.setting_icon} />
                {extended && <p>Settings</p>}
            </div>
        </div>
    </div>

  )
}

export default Sidebar