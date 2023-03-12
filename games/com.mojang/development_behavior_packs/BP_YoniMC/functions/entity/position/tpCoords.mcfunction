
# 指定一个坐标，将执行者传送到该坐标
# pos:x指定x轴，pos:y指定y轴，pos:z指定z轴
# 只能在执行者所在维度传送
# 限制 pos:x与pos:z的限制范围为-1048576~1048575 pos:y的限制范围为-32768~32767
# 没有任何状态返回，无论参数是否合法，执行者都会传送
# 传送不会居中，会传送到坐标n.0的位置，并且会导致视角被设置为0,0

function entity/createPoint

function entity/position/tpX
function entity/position/tpY
function entity/position/tpZ

tp @s @e[tag=entity:point]

function entity/removePoint
