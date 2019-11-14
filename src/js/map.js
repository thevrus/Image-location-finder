import mapboxgl from 'mapbox-gl';

export default class {
    constructor() {
        this.renderMap();
    }

    state = []
    TOKEN =
        "pk.eyJ1IjoiZGltYXRrYWNoZW5rbyIsImEiOiJjanpjeXc1bGswMnloM2NscTQ3azg2OWY2In0.fp9hwpLq0hCnR-hf_clerg";


    renderMap() {
        mapboxgl.accessToken = this.TOKEN;
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/light-v10',
            center: [11.862, 43.454],
            zoom: 7
        });
    }

    addMarker(cordinates) {
        const el = document.createElement('div');
        el.className = 'marker';

        const marker = new mapboxgl.Marker(el)
            .setLngLat(cordinates)
            .addTo(this.map);

        this.state.push({
            marker: marker,
            cordinates: cordinates
        })
    }

    removeMarker(cordinates) {
        this.state.forEach((item, index) => {
            if (item.cordinates[0] === cordinates[0] && item.cordinates[1] === cordinates[1]) {
                this.state.splice(index, 1);
                item.marker.remove();
            }
        });
    }
}