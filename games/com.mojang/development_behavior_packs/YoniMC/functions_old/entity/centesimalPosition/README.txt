# 实体的坐标相关的函数（entity/centesimalPosition）

**此函数仍在编写**

函数所得出的所有结果均为百分位小数扩大100倍后的结果
目前对于数据没有检验

## 使用到的记分项
pos:x        X轴坐标 -1048576~1048575
pos:y        Y轴坐标 -32768~32767
pos:z        Z轴坐标 -1048576~1048575
pos:rotateX  视角X轴角度 -90~89
pos:rotateY  视角Y轴角度 -180~179

## 可直接调用的单个函数

getCoords
: 获取坐标
: 返回到pos:x, pos:y, pos:z

getRotate
: 获取视角
: 返回到pos:rotateX, pos:rotateY

getPosition
: 获取坐标与视角
: 返回到pos:x, pos:y, pos:z, pos:rotateX, pos:rotateY

tpCoords
: 传送到指定坐标
: 需要pos:x, pos:y, pos:z

tpRotate
: 设定实体的视角
: 需要pos:rotateX, pos:rotateY

tpPosition
: 设定实体的视角&传送到指定的坐标
: 需要pos:x, pos:y, pos:z, pos:rotateX, pos:rotateY

## 用于实现其他功能的函数
> 这些函数需要配合其它函数使用
> 在使用这些函数之前，请先执行`entity/position/init`

getX/getY/getZ
: 获取X/Y/Z轴坐标
: 需要先执行`entity/createPoint`

getRotateX/getRotateY
: 获取视角X/Y轴角度
: 需要先执行下列函数

tpX/tpY/tpZ
: 修改实体的X/Y/Z轴坐标
: 需要先执行`entity/createPoint`
: 对于tpX，需要设置pos:x
: 对于tpY，需要设置pos:y
: 对于tpZ，需要设置pos:z
: 只会修改entity:point的坐标

tpRotateX/tpRotateY
: 修改实体的视角X/Y轴
: 对于tpRotateX，需要设置pos:rotateX
: 对于tpRotateY，需要设置pos:rotateY
: 会直接修改实体的视角
: 在对玩家使用时，建议使用`gamerule showcommandfeedback false`关闭命令输出