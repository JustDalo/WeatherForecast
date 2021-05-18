import React from 'react'
import { useRef, useState } from "react"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export let City;
export function VoiceSearch(props) {
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    const [inputText, setInputText] = useState('');
    const microphoneRef = useRef(null);
    const city = document.getElementsByClassName('input__search');
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
            microphoneRef.current.classList.remove("listening");
            SpeechRecognition.stopListening();
            city.textContent = `${transcript}`;
            City = transcript;
           {props.GetCity()};
            console.log(city.textContent);
            console.log(transcript);


        }
        else {
            setIsListening(true);
            microphoneRef.current.classList.add("listening");
            SpeechRecognition.startListening({
                continuous: true,
            });
        }
    };
    const stopHandle = () => {
        setIsListening(false);
        microphoneRef.current.classList.remove("listening");
        SpeechRecognition.stopListening();
    };
    const handleReset = () => {
        stopHandle();
        resetTranscript();
    };

    const handleClick = () => {
        City = inputText;
        console.log(inputText);
        {props.GetCity()};
    }

    const updateInputValue = (evt) => {
        setInputText(evt.target.value);
    }

    return (
        <div className="microphone-wrapper">
            <div className="search__form">

                <input className="input__search" type="search" onChange={evt => updateInputValue(evt)} name="city" required placeholder="Search city" value={transcript}></input>
                <button className="button__micro"ref={microphoneRef} onClick={handleListing}></button>
                <button id="button__search" onClick={handleClick}>SEARCH</button>
                

            </div>
            {transcript && (
                <div className="microphone-result-container">
                    <div className="microphone-result-text">{transcript}</div>

                    <button className="microphone-reset btn" onClick={handleReset}>
                        Reset
            </button>
                </div>
            )}
        </div>
    );
}

