//任意进制转10进 parseInt(值,进)
//10进转任意进 toString(进)

//字符串转换unicode字符串
function encodeUnicode(str) {
  let u = "";
  for (let i = 0; i < str.length; i++){
    let code = str.charCodeAt(i).toString(16);
    while (code.length < 4){
      code = "0" + code;
    }
    u += "\\u";
    u += code;
  }
  return u;
}

//代码来源 https://juejin.cn/post/7023214891959844871
//传入字符串，返回一个数组
function string2Byte(data) {

    let parsedData = [];

    for (let i = 0, l = data.length; i < l; i++) {
        let byteArray = [];
        // charCodeAt() 方法可返回指定位置的字符的 Unicode 编码，返回值是 0 - 65535 
        // 之间的整数，表示给定索引处的 UTF-16 代码单元。
        let code = data.charCodeAt(i);

    // 十六进制转十进制：0x10000 ==> 65535  0x800 ==> 2048  0x80 ==> 128
    if (code > 0x10000) { // 4个字节
        // 0xf0 ==> 11110000 
        // 0x80 ==> 10000000

        byteArray[0] = 0xf0 | ((code & 0x1c0000) >>> 18); // 第 1 个字节
        byteArray[1] = 0x80 | ((code & 0x3f000) >>> 12); // 第 2 个字节
        byteArray[2] = 0x80 | ((code & 0xfc0) >>> 6); // 第 3 个字节
        byteArray[3] = 0x80 | (code & 0x3f); // 第 4 个字节

    } else if (code > 0x800) { // 3个字节
        // 0xe0 ==> 11100000
        // 0x80 ==> 10000000

        byteArray[0] = 0xe0 | ((code & 0xf000) >>> 12);
        byteArray[1] = 0x80 | ((code & 0xfc0) >>> 6);
        byteArray[2] = 0x80 | (code & 0x3f);

    } else if (code > 0x80) { // 2个字节
        // 0xc0 ==> 11000000
        // 0x80 ==> 10000000

        byteArray[0] = 0xc0 | ((code & 0x7c0) >>> 6);
        byteArray[1] = 0x80 | (code & 0x3f);

    } else { // 1个字节

        byteArray[0] = code;
    }

        parsedData.push(byteArray);
    }

    parsedData = Array.prototype.concat.apply([], parsedData);
    return parsedData;
}
/*
//byteLength代码来源 http://c.biancheng.net/view/5547.html
//经过修改
String.prototype.byteLength = function() {  //获取字符串的字节数，扩展string类型方法
    let byteLength = 0;
    if (this.length){  //如果存在字符串，则执行计划
        for(let i = 0; i < this.length; i ++) {  //遍历字符串，枚举每个字符
            if(this.charCodeAt(i) > 255) {  //字符编码大于255，说明是双字节字符
                byteLength += 2;  //则累加2个
            }else {
                byteLength ++;  //否则递加一次
            }
        }
    }
    return byteLength;
}
*/
export { string2Byte, encodeUnicode };
