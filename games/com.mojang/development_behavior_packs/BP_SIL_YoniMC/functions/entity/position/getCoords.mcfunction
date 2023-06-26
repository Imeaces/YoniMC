
# 获取执行者所在位置的坐标，结果向下取整（事实上不是，但表现的结果是）
# 结果将会赋值到执行者的记分项
# pos:x为x轴，pos:y为y轴，pos:z为z轴
# 无法获取执行者所在维度
# 限制 pos:x与pos:z的限制范围为-1048576~1048575 pos:y的限制范围为-32768~32767
# 没有任何状态返回，无论执行者坐标是否在限制范围内
# 在限制范围外执行可能会有以下返回结果： 返回的结果等于最大值或最小值

# 在执行entity/position之前，需要执行以下两条函数
## 创建判定点
function entity/createPoint

# 分别获取x,y,z轴的坐标
function entity/position/getX
function entity/position/getY
function entity/position/getZ

# 移除判定点
function entity/removePoint
