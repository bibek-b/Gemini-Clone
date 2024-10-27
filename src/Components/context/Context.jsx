import { createContext, useState } from "react";
import run from "../../config/gemini";

export const context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    //typing effect
    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75*index);
    }
    //

    const newChat = () => {
        setInput('');
        setLoading(false);
        setShowResult(false);
        setIsClicked(false);
    }
 // sends the suggested text as questions
    const sendShownText = async (suggestedValue) => {
        setRecentPrompt(suggestedValue);
        setIsClicked(true);
       await onSent(suggestedValue);
//
    }
    const onSent = async (prompt) => {

        setResultData('');
        setLoading(true);
        setShowResult(true);z
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
           //loads the previous prompts if it is already there 
            setPrevPrompts(prev => {
                if(!prev.includes(prompt)){
                    return [...prev,prompt]
                }
                return prev;
            });
        } else {
            setPrevPrompts(prev => [...prev,input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        
        //Bolds the text whenever it finds ** in the text
        const responseArray = response.split('**');
        let newResponse = '';

        for(let i = 0;i < responseArray.length; i++){
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i];
            } else{
                newResponse += '<b>'+responseArray[i]+'</b>';
            }
        }
        //
        //breaks the line whenever it finds single * in the text
        let newResponse2 = newResponse.split('*').join('<br>');
        //
        //comes words by typing effect
        let newResponseArray = newResponse2.split(' ');
        for(let i = 0; i < newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+' ');
        }
        //
        setLoading(false);
        setInput('');
    }


    const contextValue = {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        prevPrompts,
        setRecentPrompt,
        newChat,
        setShowResult,
        sendShownText,
        isClicked
    }

    return (
        <context.Provider value={contextValue}>
        {props.children}
        </context.Provider>
    )
}
export default ContextProvider;