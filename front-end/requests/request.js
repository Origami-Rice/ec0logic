import endpoints from './endpoints'; 

const SERVER = 'localhost:5000';

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

        if (!['GET'].includes(endpoint.method)) {
            options.body = JSON.stringify(data);
        }

        return fetch(path, options);

    } else {
        return Promise.resolve();
    }
}