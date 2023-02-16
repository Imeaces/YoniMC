class StorageAdapter {
    mode = "incremental";
    constructor(){
    }
    async exportDatabase(dbname, getCopy, callback){
        StorageAdapter.#save(dbname, getCopy())
            .then(callback)
            .catch(callback);
    }
    loadDatabase(dbname, callback){
    }
    static async #save(name, copyOfLokiDb){
        
    }
}
