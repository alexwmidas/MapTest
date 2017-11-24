import supercluster from 'supercluster';

function convertGeoJSON(data) {
    return data.map((value, index) => {
        const lat = value.lat;
        const lon = value.lon;
        return {
            type: 'Feature',
            properties: {
                ...value,
                index: index,
                lat_y: lat,
                long_x: lon,
            },
            geometry: {
                type: 'Point',
                coordinates: [lon, lat],
            },
        };
    });
}

export function getClusters(data, zoom) {
    const points = convertGeoJSON(data);
    const clusterHandler = supercluster({log: false, radius: 40});
    clusterHandler.load(points);
    return clusterHandler.getClusters([-180, -85, 180, 85], zoom);
}

export function getBackgroundColor(count) {
    if (count > 1000) {
        return 'red';
    } else if (count > 200) {
        return 'yellow';
    } else if (count > 50) {
        return 'pink';
    } else {
        return 'green';
    }
}
