const importList = [
    "./player/eventreg.js",
    "./entity/eventreg.js",
    "./world/eventreg.js"
];
for (let path of importList){
    import(path);
}
