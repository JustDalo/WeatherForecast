import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div>
                <form className="search__form" onSubmit={this.props.GetCity}>
                    <input className="input__search" type="search" name="city" required placeholder="Search city"></input>
                    <button id="button__search">SEARCH</button>
                </form>
            </div>
        )
    }
}
