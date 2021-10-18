import { World, Commands } from 'Minecraft';


// 函数参数必须是字符串，因为二代身份证号码是十八位，而在javascript中，十八位的数值会超出计算范围，造成不精确的结果，导致最后两位和计算的值不一致，从而该函数出现错误。
// 详情查看javascript的数值范围
function checkIDCard(idcode){
    // 加权因子
    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    // 校验码
    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];

    var code = idcode + "";
    var last = idcode[17];//最后一个

    var seventeen = code.substring(0,17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for(var i = 0; i < len; i++){
        num = num + arr[i] * weight_factor[i];
    }

    // 获取余数
    var resisue = num%11;
    var last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    var format = idcard_patter.test(idcode);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format ? true : false;
};



const i = 0;

//获取指定玩家的tag列表，去除颜色代码等
  
  var playerTagArr = function (Name){
    var delColor = function(obj){return obj.slice(2,-2);};
    return playerTagArr = Commands.run(`tag "${Name}" list`).statusMessage.split("：")[1].split(",").map(delColor);
    };
  
const cmd = function(cmd){ 

Commands.run(`${cmd}`);

};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


 World.events.beforeChat.subscribe((event) => {
   try{
  
  const {message} = event;
  const playerName = event.sender.name;
  
    if(message.startsWith("\\验证")){
    
if(checkIDCard(message.replaceAll(" ","").replaceAll("\\验证",""))){

    event.canceled = true;
    return event;
cmd("tag @a[name=${playerName}] add babyboy");
let temp = JSON.stringify({"rawtext":[{"text":"§l§4§o验证成功！"}]});
cmd('tellraw @a[name=${name}] ${temp}');

};

    event.canceled = true;
    return event;

    };
       }catch(good){
  Commands.run(`me 此程序依赖此${good}运行`);
   };

});




World.events.tick.subscribe(() => {

if(i > 30){

let temp = JSON.stringify({"rawtext":[{"text":"§l§4§o根据国家相关未成年网游防沉迷法，请输入身份证以完成防沉迷验证"}]});
cmd('tellraw @a[tag=!babyboy,name=${name}] ${temp}');

temp = JSON.stringify({"rawtext":[{"text":"§l§4验证格式如下，需要空格"}]});
cmd('tellraw @a[tag=!babyboy,name=${name}] ${temp}');

temp = JSON.stringify({"rawtext":[{"text":"§l§b\验证 330902195604290258"}]});
cmd('tellraw @a[tag=!babyboy,name=${name}] ${temp}');
};

i++;

cmd('execute @a ~ ~ ~ tp @s[tag=!babyboy] ~ ~ ~');

});




//        抄作业 https://github.com/pelligit/idcard/tree/master
