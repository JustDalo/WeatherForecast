import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoianVzdGRhbG8iLCJhIjoiY2tvcXV5bGRiMHo0bDJ5bnVvZGZ2OG9tbiJ9.Ipu3ac3wlDlWxP_N72IWjg';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 54.2142,
            lat: 54,
            zoom: 8
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const { lng, lat, zoom } = this.state;

        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            const { lng, lat } = map.getCenter();

            this.setState({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        const { lng, lat, zoom } = this.state;

        return (
            <div>
                <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                    <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                </div>
                <div ref = {this.mapContainer} className="absolute top right left bottom" />
            </div>
        );
    }
}


