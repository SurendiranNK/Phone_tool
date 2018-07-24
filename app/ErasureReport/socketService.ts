import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
	private socket;

	constructor() {
		this.socket = io('http://localhost:3000');
	}

	on(eventName : any, callback : any){
		if(this.socket){
			this.socket.on(eventName, function(data: any){
				callback(data);
			});
		}
	}

	emit(eventName : any, data : any){
		if(this.socket){
			this.socket.emit(eventName, data);
		}
	};

	removeListener(eventName : any){
		if(this.socket){
			this.socket.removeListener(eventName);
		}
	};

}