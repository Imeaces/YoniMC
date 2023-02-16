export function getNumber(n){
    n = Number(n);
    if (!isFinite(n))
        throw new RangeError("number out of range");
    return n;
}
