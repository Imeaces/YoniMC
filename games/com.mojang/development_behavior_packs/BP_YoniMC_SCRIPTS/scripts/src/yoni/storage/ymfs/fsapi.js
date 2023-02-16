/**
 * @enum {O_X}
 */
const O_X = {
    O_RDONLY: Symbol(), //只读
    O_WRONLY: Symbol(), //只写
    O_RDWR: Symbol(), //读写
    O_APPEND: Symbol(), //追加（读写情况不知）
    O_CREAT: Symbol(), //创建
    O_EXCL: Symbol(), //存在时报错
    O_TRUNC: Symbol(), //打开，并截断长度为0（重写）
    O_TEXT: Symbol(), //windows specific
}
const S_X = {
    SEEK_SET: Symbol(0), //从文件开头
    SEEK_CUR: Symbol(1), //从当前指针位置
    SEEK_END: Symbol(2), //从文件末尾
}
/**
 * @typedef {number} filehandler - 大于等于0的数字
 */
/**
 * 操作文件系统的各类方法
 */
class fs {
    /**
     * @param {string} filename
     * @param {O_X} flags
     * @param {number} mode
     * @returns {filehandler|number}
     */
    open(filename, flags, mode = 0o666){}
    /**
     * @param {filehandler} fd
     */
    close(fd){}
    /**
     * @param {filehandler} fd
     * @param {number} offset
     * @param {S_X} whence
     * @returns {number} current location
     */
    seek(fd, offset, whence){}
    /**
     * @param {filehandler} fd
     * @param {number} offset
     * @param {S_X} whence
     * @returns {number} read bytes or < 0 if error
     */
    read(){}
    write(){}
    isatty(){
        return false;
    }
    ttyGetWinSize(){
        return null;
    }
    ttySetRaw(){
        return 255;
    }
    remove(){}
    
}
