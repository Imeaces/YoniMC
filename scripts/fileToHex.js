const [ progname, fileToRead, resultToWrite ] = scriptArgs;

fileExists = os.open(resultToWrite, os.O_EXCL, 0o666);

if (fileExists >= 0){
    os.close(fileExists);
    throw new Error("file existence: "+resultToWrite);
}

rFile = std.open(fileToRead, "r");
wFile = std.open(resultToWrite, "w");

let btArr = [];

for (;;) {
    let bt = rFile.getByte();
    if (rFile.eof()) break;
    
    btArr.push(bt);
}

let cb = 0;
for (let bt of btArr){
    bt = bt.toString(16);
    if (cb++<4) console.log(bt);
    bt = "00".slice(bt.length) + bt;
    if (cb++<4) console.log(bt);
    for (let char of bt){
        wFile.putByte(char.charCodeAt(0));
    }
}

wFile.flush();
wFile.close();
