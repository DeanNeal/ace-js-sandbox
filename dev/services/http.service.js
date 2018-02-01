import { Http, ObservableModel, Decorators} from 'ace-js';
const server = 'http://zoom.od.ua/';

@Decorators.Inject({

})

export class HttpService {
	constructor() {

	}

	get(url, params) {
		return this.middleware(Http.get(server + url, params, this.getHeaders()));
	}

	post(url, params) {
		return this.middleware(Http.post(server + url, params, this.getHeaders()));
	}

	put(url, params) {
		return this.middleware(Http.put(server + url, params, this.getHeaders()));
	}

	delete(url, params) {
 		return this.middleware(Http.detete(server + url, this.getHeaders()));
	}

	// 
	middleware(response) {
	    return response
	        // .then(res => JSON.parse(res))
	        // .then(res => this.createEntity(res))
	        .catch(err => {
	            if(Http.onerrorCallback) {
	                Http.onerrorCallback.call(this, err);
	            }
	            if(err.status === 0) {
	                throw new Error('Server error');
	            } else {
	                return Promise.reject(err)
	            }
	        });
	}

	getHeaders() {
	    const headers = new Headers();
	    let token = localStorage.getItem('token');
	    headers.append('Content-Type', `application/json`);
	    headers.append('Accept', `application/json`);
	    if (token) {
	        headers.append('Authorization', `Bearer ${token}`);
	    }
	    return headers;
	}
}