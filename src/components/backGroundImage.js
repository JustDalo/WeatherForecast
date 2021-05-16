import React from 'react'

export default function backGroundImage(props) {
    return (
        <div>
            <button className="button__new__image" onClick={props.ImageMethod}>
                <div className="spinner"></div>
            </button>
        </div>
    )
}

