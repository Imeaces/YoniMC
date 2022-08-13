export default class Utils {
    static isBetweenRange(score){ //由于数字被限制在int范围内，所以这函数其实没啥用，但是既然写了就懒得改了
        return !(score > 2147483647 || score < -2147483648);
    }
}
