import 'bootstrap';

import {EventAggregator} from 'aurelia-event-aggregator';
import {singleton} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';

@singleton()
@inject(HttpClient, EventAggregator)
export class WebAPI {

    constructor(http, ea) {
        this.timer = null;
        this.ea = ea;
        this.http = http;
        this.http.configure(x => {
            x.withHeader("Content-Type", "application/x-www-form-urlencoded");
        });
        this.socket = null;
    }

    // websocket init stuff.
    initWS() {
        if (this.socket != null && this.socket.readyState == 1) {
            return;
        } else {
            this.socket = new WebSocket("ws://" + window.location.host + "/ws/actions");
            this.socket.onopen = e => {
                console.log('onopen', e)
                this.currentAuction();
            }
            this.socket.onerror = e => {
                console.log('onerror', e)
            }
            this.socket.onclose = e => {
                console.log('onclose', e)
                // pretty ugly ... but firefox is a bitch
                this.initWS();
            }
            this.socket.onmessage = evt => {
                var dto = JSON.parse(evt.data);
                this.ea.publish('events', dto);
            }
        }
    }

    registered() {
        this.http.get('api/register')
            .then(response => JSON.parse(response.response))
            .then(dto => this.publishEvent(dto));
    }

    register(nickname) {
        this.http.post('api/register', jQuery.param({'nickname': nickname}))
            .then(response => JSON.parse(response.response))
            .then(dto => this.publishEvent(dto));
    }

    currentAuction() {
        this.http.get('api/auction')
            .then(response => JSON.parse(response.response))
            .then(dto => this.publishEvent(dto));
    }

    watchAuction(interval) {        
    }

    bid(value) {
        return this.http.post('api/auction', jQuery.param({'value': value}))
            .then(response => JSON.parse(response.response))
            .then(dto => this.publishEvent(dto));
    }

    publishEvent(dto) {
        if (dto != null) {
            this.ea.publish('events', dto);
        }
    }
}