const importList = [
    "./player/eventreg.js",
    "./entity/eventreg.js"
];
for (let path of importList){
    import(path);
}
