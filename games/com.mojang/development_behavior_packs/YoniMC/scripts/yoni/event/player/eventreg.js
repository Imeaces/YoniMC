const importList = [
    "./playerDead.js",
    "./playerJoined.js"
];
for (let path of importList){
    import(path);
}
