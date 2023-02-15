// Core
import express, { Express, Request, Response } from 'express';
// Types
import type { Server } from 'http';


express.json();

export interface Cat {
    name: string,
    color: 'black' | 'orange' | 'grey',
}

export interface Dog {
    name: string,
    color: 'beige' | 'black' | 'white',
}

const CATS: Array<Cat> = [{
    name : 'Garfield',
    color: 'orange',
}, {
    name : 'Jasmine',
    color: 'black',
}, {
    name : 'Fluffy',
    color: 'grey',
}];

const DOGS: Array<Dog> = [{
    name : 'Wolf',
    color: 'black',
}, {
    name : 'Laika',
    color: 'white',
}, {
    name : 'Meiko',
    color: 'beige',
}];

class TestServer {
    app: Express;
    port: number;
    server: Server | undefined;

    constructor(port: number){
        this.app = express();
        this.port = port;

        this.app.get('/dogs', (req: Request, res: Response) => {
            res.send({data: DOGS});
            res.status(200);
        });

        this.app.get('/cats', (req: Request, res: Response) => {
            res.send({data: CATS});
            res.status(200);
        });
    }

    listen(callback?: () => void){
        this.server = this.app.listen(this.port, callback);
    }

    cancel(){
        if(this.server) this.server.close();
    }
}

export default TestServer;
