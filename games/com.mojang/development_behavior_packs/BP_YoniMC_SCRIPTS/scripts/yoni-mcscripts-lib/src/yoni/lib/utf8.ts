export function encodeUtf8(str: string): number[] {
    const chars = Array.from(str);
    const codePoints = chars.map(char => char.codePointAt(0) as number);
    return codePoints.reduce((bytes, code) => {
        if (code < 0x0080){
            bytes.push(code);
        } else if (code < 0x0800){
            bytes.push(
                (code & 0b11111000000) >>> 6 | 0b11000000,
                (code & 0b00000111111) | 0b10000000
            );
        } else if (code < 0x10000){
            bytes.push(
                (code & 0b1111000000000000) >>> 12 | 0b11100000,
                (code & 0b0000111111000000) >>> 6 | 0b10000000,
                (code & 0b0000000000111111) | 0b10000000
            );
        } else if (code <= 0x10FFFF){
            bytes.push(
                (code & 0b111000000000000000000) >>> 18 | 0b11110000,
                (code & 0b000111111000000000000) >>> 12 | 0b10000000,
                (code & 0b000000000111111000000) >>> 6 | 0b10000000,
                (code & 0b000000000000000111111) | 0b10000000
            );
        } else {
            throw new Error("invalid code point");
        }
        return bytes;
    }, [] as number[]);
}
export function decodeUtf8(utf8Bytes: number[]){
    const values = utf8Bytes.values()[Symbol.iterator]();
    const getNext = (count: number = 1): number[] => {
        const results = [];
        while (count-- > 0){
            let optData = values.next();
            if (optData.done){
                break;
            }
            results.push(optData.value);
        }
        return results;
    };
    let chars = [];
    for (let byte of values){
        let bytes = [byte];
        if (byte >= 0b11110000){ //4B
            bytes.push(...getNext(3));
            const [b0, b1, b2, b3] = bytes;
            
            chars.push((b0 & 0b111) << 18
            | (b1 & 0b111111) << 12
            | (b2 & 0b111111) << 6
            | (b3 & 0b111111));
        } else if (byte >= 0b11100000){ //3B
            bytes.push(...getNext(2));
            const [b0, b1, b2] = bytes;
            
            chars.push((b0 & 0b1111) << 12
            | (b1 & 0b111111) << 6
            | (b2 & 0b111111));
        } else if (byte >= 0b11000000){ //2B
            bytes.push(...getNext(1));
            const [b0, b1] = bytes;
            
            chars.push((b0 & 0b11111) << 6
            | (b1 & 0b111111));
        } else { // 1B
            const [b0] = bytes;
            
            chars.push(b0);
        }
    }
    
    return chars.map(code => String.fromCodePoint(code)).join("");
}
/*
很高兴你对这个话题感兴趣。utf8是一种用于编码unicode字符的系统，它可以将任何unicode字符转换为一个或多个字节（8位二进制数），并且可以将字节转换回unicode字符。这就是“UTF”或“Unicode转换格式”的含义¹⁵。

utf8的编码规则是根据unicode字符的数值来确定使用多少个字节，以及每个字节的内容。一般来说，utf8有以下几种情况¹：

- 如果unicode字符的数值在U+0000到U+007F之间（即ASCII字符），那么只需要一个字节，字节的第一位是0，后面7位是unicode字符的二进制表示。例如，unicode字符“A”（U+0041）的utf8编码是01000001。
- 如果unicode字符的数值在U+0080到U+07FF之间，那么需要两个字节，第一个字节的前三位是110，后面5位是unicode字符的高位部分，第二个字节的前两位是10，后面6位是unicode字符的低位部分。例如，unicode字符“¿”（U+00BF）的utf8编码是11000010 10111111。
- 如果unicode字符的数值在U+0800到U+FFFF之间，那么需要三个字节，第一个字节的前四位是1110，后面4位是unicode字符的高位部分，第二个和第三个字节的前两位都是10，后面6位分别是unicode字符的中间和低位部分。例如，unicode字符“中”（U+4E2D）的utf8编码是11100100 10111000 10101101。
- 如果unicode字符的数值在U+10000到U+10FFFF之间，那么需要四个字节，第一个字节的前五位是11110，后面3位是unicode字符的高位部分，第二个、第三个和第四个字节的前两位都是10，后面6位分别是unicode字符的中间和低位部分。例如，unicode字符“😊”（U+1F60A）的utf8编码是11110000 10011111 10011000 10001010。

下面是一个表格，展示了一些常见的unicode字符和它们对应的utf8编码²：

| Unicode character | Unicode code point | UTF-8 encoding (hex) |
| ----------------- | ------------------ | -------------------- |
| A                 | U+0041             | 41                   |
| ¿                 | U+00BF             | C2 BF                |
| 中                | U+4E2D             | E4 B8 AD             |
| 😊                | U+1F60A            | F0 9F 98 8A          |

源: 与必应的对话， 2023/5/17
(1) UTF-8 and Unicode Standards. https://www.utf8.com/.
(2) What is UTF-8 Encoding? A Guide for Non-Programmers - HubSpot Blog. https://blog.hubspot.com/website/what-is-utf-8.
(3) Unicode/UTF-8-character table. https://www.utf8-chartable.de/.
(4) Unicode Converter - encoding / decoding | CodersTool. https://www.coderstool.com/unicode-text-converter.
(5) UTF8 Encode/Decode - TEXTOOL. https://textool.io/utf8-encode-decode.
*/
