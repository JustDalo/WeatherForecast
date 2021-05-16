import React, { Component } from 'react'

export default class Degrees extends Component {

    render() {
        return (
            <div className="degrees__buttons">
                <button className="button__F" onClick={e => {localStorage.setItem('degress', 'imperial')}}>°F</button>
                <button className="button__C" onClick={e => {localStorage.setItem('degress', 'metric')}}>°C</button>
            </div>
        )
    }
}
