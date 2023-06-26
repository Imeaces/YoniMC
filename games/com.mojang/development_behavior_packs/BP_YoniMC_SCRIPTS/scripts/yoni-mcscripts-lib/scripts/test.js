function diff(func1, func2){
    console.log("比较结果: " + (func1 === func2));
}
class cls{
}

function a(arg){}

diff((arg)=>a(arg), (arg)=>a(arg));


let b = a;

diff(a, b);

let c = new cls();
let d = c;
d.ss=8;
diff(c, d);