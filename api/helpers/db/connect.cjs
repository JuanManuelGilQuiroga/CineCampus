const { MongoClient } = require("mongodb");

module.exports = class Connect {
    user;
    port;
    #pass;
    #host;
    #cluster;
    #dbName;
    static instance
    conexion
    db
    constructor(){
        this.user = process.env.VITE_MONGO_USER;
        this.port = process.env.VITE_MONGO_PORT;
        this.setPass = process.env.VITE_MONGO_PWD;
        this.setHost = process.env.VITE_MONGO_HOST;
        this.setCluster = process.env.VITE_MONGO_CLUSTER;
        this.setDbName = process.env.VITE_MONGO_DB;
        this.#open();
        this.db = this.conexion.db(this.getDbName);
    }

    set setPass(pass) {
        this.#pass = pass
    }

    set setHost(host) {
        this.#host = host
    }

    set setCluster(cluster) {
        this.#cluster = cluster
    }

    set setDbName(dbName) {
        this.#dbName = dbName
    }

    get getPass() {
        return this.#pass;
    }

    get getHost() {
        return this.#host;
    }

    get getCluster() {
        return this.#cluster;
    }

    get getDbName() {
        return this.#dbName;
    }

    async reconnect() {
        await this.#open();
    }

    async #open() {
        this.conexion = new MongoClient(`${this.getHost}${this.user}:${this.getPass}@${this.getCluster}:${this.port}/${this.getDbName}`);
        await this.conexion.connect();
    }

    async close() {
        await this.conexion.close();
    }
}