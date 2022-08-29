# molang获取玩家视角

根据测试，使用`query.target_x_rotation`可以准确获取rx  

而获取ry则有点困难，需要使用特殊方法  
从模型方块中准确获取：`query.head_y_rotation('head')`  