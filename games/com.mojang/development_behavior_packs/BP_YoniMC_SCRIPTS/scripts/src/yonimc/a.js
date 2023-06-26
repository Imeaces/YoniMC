/*
const toDeg = (g) => g / Math.PI * 180;
const toDec = (g) => g / 180 * Math.PI;

function func_1(p0, p1 = 0.4, p2 = -1.10001190185547){
    
    p0 = toDec(p0);
    //console.log("p0: "+p0);
    
    let h = (0 - p2) / 2 + p2;
    //console.log("h: "+h);
    let k = 0;
    //console.log("k: "+k);
    
    let b = p1;
    //console.log("b: "+b);
    let a = NaN;
    //console.log("a: "+a);
    
    let f1_x = p2;
    //console.log("f1_x: "+f1_x);
    let f1_y = 0;
    //console.log("f1_y: "+f1_y);
    
    let f2_x = 0;
    //console.log("f2_x: "+f2_x);
    let f2_y = 0;
    //console.log("f2_y: "+f2_y);
    
    let c = Math.abs((0 - p2) / 2);
    //console.log("c: "+c);
    
    a = Math.sqrt(c**2 - b**2);
    //console.log("a: "+a);
    
    //let _3 = Math.sqrt(1 - b**2 / a**2);
    let _3 = c / a;
    //console.log("_3: "+_3);
    
    let l_1 = a * (1 - _3 ** 2) / (1 - _3 * Math.cos(p0));
    //console.log("l_1: "+l_1);
    
    let l_2 = 2 * a - l_1;
    //console.log("l_2: "+l_2);
    
    let l_bH = l_1 * Math.sin(p0);
    //console.log("l_bH: "+l_bH);
    
    let l_cC_1 = l_1 * Math.cos(p0);
    //console.log("l_cC_1: "+l_cC_1);
    
    let l_cC_2 = 2 * c - l_cC_1;
    //console.log("l_cC_2: "+l_cC_2);
    
    let rt = Math.atan(l_bH / l_cC_2);
    //console.log("rt: "+rt);
    
    return toDeg(rt);
}
/*
for (let i = 0; i<180; i++){
    let rt = func_1(i, 0.550, -1.10001);
    console.log(`${i}: ${rt}`);
}*/
/*
function func_2(p0, p1 = 3, p2 = -1.52001190185547){
    
    p0 = toDec(p0);
    
    let b = (0 - p2) / 2 + p2;
    
    let d = p1;
    
    let h = Math.sqrt( d ** 2 - b ** 2 );
    
    let dp0 = Math.atan(b / h);
    
    let rt = func_1(dp0, d, 0 - h * 2);

}
*/
/*
let center = [ -1.10001, 0 ];
for (let i = 0; i <= 180; i++){
    
}

function func_4(p0, p1 = 3){
}*/

const toDeg = (g) => g / Math.PI * 180;
const toDec = (g) => g / 180 * Math.PI;

export function func_5(d, l = 3, u = 1.1){
    d = toDec(d);
    
    let k1 = Math.tan(d);
    
    //y1 = k1 * x + u;
    
    let o_x = Math.cos(d) * l;
    
    let o_y = Math.sin(d) * l + u;
    
    return Number(toDeg(Math.atan(o_y / o_x)).toFixed(2));
}
/*
for (let i = -89; i< 90; i++){
    let rt = func_5(-i, 3, 1.1001);
    
    console.log(`${i}: ${-rt}`);
}*/