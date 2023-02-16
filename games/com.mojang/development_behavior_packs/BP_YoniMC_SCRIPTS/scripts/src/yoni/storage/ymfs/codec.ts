export function B4toInt(b4arr: b4arrType): number {
    const b0 = b4arr[0];
    const b1 = b4arr[1];
    const b2 = b4arr[2];
    const b3 = b4arr[3];
    return (b0 << 24 | b1 << 16 | b2 << 8 | b3);
}

export function B4toUint(b4arr: b4arrType): number {
    const b0 = b4arr[0];
    const b1 = b4arr[1];
    const b2 = b4arr[2];
    const b3 = b4arr[3];
    return (b0 << 24 | b1 << 16 | b2 << 8 | b3) >>> 0;
}

export function UintToB4(uint: number): b4arrType {
    const b0 = uint >>> 24;
    const b1 = ( uint % 16777216 ) >>> 16;
    const b2 = ( uint % 65536 ) >>> 8;
    const b3 = ( uint % 256 ) >>> 0;
    return [b0, b1, b2, b3];
}

export function IntToB4(int: number): b4arrType {
    const uint = int >>> 0;
    const b0 = uint >>> 24;
    const b1 = ( uint % 16777216 ) >>> 16;
    const b2 = ( uint % 65536 ) >>> 8;
    const b3 = ( uint % 256 ) >>> 0;
    return [b0, b1, b2, b3];
}

type b4arrType = [number, number, number, number];
