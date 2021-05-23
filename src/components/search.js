import React from 'react'
import { useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



export let City;
export function VoiceSearch(props) {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const [color, setColor] = useState('rgba(76, 82, 85, .7)');

   
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }
    const handleListing = (evt) => {
        if (isListening) {
            setIsListening(false);
            SpeechRecognition.stopListening();
            City = transcript;
            props.GetCity();
            resetTranscript();
            setColor('rgba(76, 82, 85, .7)');
        }
        else {
            setIsListening(true);
            setColor('black');
            
            SpeechRecognition.startListening({
                continuous: true,
            });
        }
    };

    const handleClick = () => {
        City = inputText;
        console.log(inputText);
        props.GetCity();
    }

    const updateInputValue = (evt) => {
        setInputText(evt.target.value);
    }

    return (
        <div className="microphone-wrapper">
            <div className="search__form">

                <input className="input__search" type="search" onChange={evt => updateInputValue(evt)} name="city" required placeholder={props.language === 'en' ? 'Search city' : 'Найти город'}></input>
                <button className="button__micro" onClick={handleListing} style={{backgroundColor: color}}></button>
                <button id="button__search" onClick={handleClick}>{props.language === 'en' ? 'SEARCH' : 'ПОИСК'}</button>
                

            </div>
           
        </div>
    );
}

