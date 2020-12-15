import endpoints from './endpoints'; 

const SERVER = 'https://powerful-scrubland-01586.herokuapp.com'; // <-- Editable: replace with main server URL path

export default function send(url, data = {}, extra_url = null) {
    const endpoint = endpoints[url];
    
    if (endpoint) {
        // endpoint exists
        let path = SERVER + endpoint.endpoint;
        if (extra_url !== null) {
            path = path + extra_url;
        }
    

        const options = {
            method: endpoint.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

        if (endpoint.method !== 'GET') {
            options.body = JSON.stringify(data);
        }

        return fetch(path, options);

    } else {
        return Promise.resolve();
    }
}