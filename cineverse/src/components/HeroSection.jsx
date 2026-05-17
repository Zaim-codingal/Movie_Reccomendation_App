import { useState, useEffect, useRef} from "react";
import { useApp } from "../context/AppContext.jsx";
import { ParseAIText } from "../utils.js";
import { STAGE, AGE, CATEGORIES_BY_AGE, MOODS_BY_AGE, LANGUAGES } from "../constants.js";

function TypingDots() {
    return (
        <div className="chat-row, bot-row">
            <div className="bot-avatar"><i className="bi bi-stars"/></div>
            <div className="bubble bot-bubble">
            <div className="typing-dots"> <span/><span/><span/></div>
        </div>
        </div>

    );
}

function SpecialContent({ content }) {
    const { AddMsg, switchAge } = content;
    const { cats, setCats } = useState([]);
    const { langs, setLangs } = useState([]);
    const { type } = content;

    if (type === "mood-greetings") return (
        <div className="choice-row">
            [['Great day!','Having a great day!'],['Meh day','Just a meh day'],['Rescue me!','I need a movie to rescue me!']]
            .map(([label, val]) => (
                <button key={val} className="choice-btn" onClick={() => content.onSelect(val)}>{label}</button>
            ))
            {content.enableTyping && <button className="choice-btn type-btn" onClick={content.enableTyping}>Type</button>}
        </div>

        );

