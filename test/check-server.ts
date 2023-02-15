// Core
import TestServer, { Cat, Dog } from './server';


const testServer = new TestServer(46000);

testServer.listen(() => console.log('Server listening'));

(async () => {
    const responseDogs = await fetch('http://localhost:46000/dogs');

    const objectDogs : { data: Array<Dog> } = await responseDogs.json();

    console.log(objectDogs.data);
    console.assert(objectDogs.data.length === 3);

    const responseCats = await fetch('http://localhost:46000/cats');

    const objectCats : { data: Array<Cat> } = await responseCats.json();

    console.log(objectCats.data);
    console.assert(objectCats.data.length === 3);

    testServer.cancel();
})();
