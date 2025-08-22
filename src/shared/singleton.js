class Singleton {
    constructor(classRef){
        if(!Singleton.instances){
            Singleton.instances = new Map();
        }

        if (Singleton.instances.has(classRef)){
            return Singleton.instances.get(classRef);
        }

        Singleton.instances.set(classRef, this);
    }
}

export default Singleton;