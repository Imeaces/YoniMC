public class SumHealthx
{
  public static void main(String[] shx){
    String text;
    java.util.Scanner ci = new java.util.Scanner(System.in);
    System.out.print("输入最大生命值");
    long maxHealth = ci.nextLong();
    long num = 0;
    long numLow = 0;
    long numPower = 1;
    long numLowOp = 0;
    
    while(num < maxHealth){
      numLow++;
      if(numLowOp == 1){
        numPower *= 2;
      }else{
        numLowOp = 1;
      }
      num += numPower;
    }
    text = text + "{\"format_version\":\"1.10.0\",\"animation_controllers\":{";
    for(long countAc = 0; countAc < numLow; countAc++){
      if(countAc != 0){
        text = text + ",";
      }
      text = text + "\"controller.animation.yoni.health.${countAc}\":{\"initial_state\":\"default\",\"states\":{" + "\"default\": {\"transitions\": ["
      text = text + sumDefaultState(numPower);
      text = text + sumOtherStates();
      text = text + "}}";
    }
    text = text + "}}";
    System.out.println(text);
  }
  public static String sumDefaultState(long numPower){
    String dText;
    for(;numLow >= 1;numLow--){
      dText = dText + "{\"raise" + numPower + "\":\"query.scoreboard('health') - query.health <= -" + numPower + "\"},{\"drop" + numPower + "\":\"query.scoreboard('health') - query.health >= " + numPower + "\"}";
      if(numLow != 1){
        dText = dText + ",";
      }
      numPower /= 2;
    }
    return dText + "],\"on_exit\":[\"/scoreboard objectives add health dummy\"]}";
  }
  public static String sumOtherStates(long numPower){
    text=""
    for((;numLow >= 1;numLow--))
    do
      text+=",\"raise${numPower}\": {\"on_entry\": [\"/scoreboard players add @s health ${numPower}\"],\"transitions\": [{\"default\": \"(1.0)\"}]},\"drop${numPower}\": {\"on_entry\": [\"/scoreboard players add @s health -${numPower}\"],\"transitions\": [{\"default\": \"(1.0)\"}]}"
      let numPower/=2
    done
    echo "${text}"
  
  }
}