import * as gt from "mojang-gametest";
import * as mc from "mojang-minecraft";
mc.world.events.tick.subscribe((tick) => {
  let playerIterator = mc.world.getPlayers();
  for (let player of playerIterator){
    //player's x, y, z, dim
    let px, py, pz, pdimension;
    try {
      //获取标签
      let tags = player.getTags();
      for(let i=0;i<tags.length;i++){
        let tempTag = tags[i];
        let tempstr = "";
        for(let j=0;j<tempTag.length;j++){
          if(tempTag[j]!=" "){
            tempstr+=tempTag[j];
          }else{
            break;
          }
        }
        if(tempstr=="playerLocation"){
          let x="",y="",z="",dimension="";
          for(let j=13,k=0;;j++){
            if(tempTag[j]==" "){
              k++;
            }else{
              if(k==0)
                x+=tempTag[j];
              else if(k==1)
                y+=tempTag[j];
              else if(k==2)
                z+=tempTag[j];
              else if(k==3)
                dimension+=tempTag[j];
            }
          }
          px=x;
          py=y;
          pdimension=dimension;
        }
      }
    }
    catch{
      let dimension = player.dimension.id;
      let location = player.location;
      player.addTag("playerLocation "+location.x.toString()+" "+location.y.toString()+" "+location.z.toString()+" "+dimension);
      px=location.x.toString();
      py=location.y.toString()
      pz=location.z.toString()
      pdimension=dimension.id;
    }
    //如果目前location与标签上的不同,则更新标签
    if( player.location.x != px && player.location.y != py && player.location.z != pz && player.dimension.id != pdimension ){
    let location = player.location;
    let dimension = player.dimension.id;
    player.runCommand("say "+player.name+" playerLocation "+location.x.toString()+" "+location.y.toString()+" "+location.z.toString()+" "+dimension)
    player.addTag("playerLocation "+location.x.toString()+" "+location.y.toString()+" "+location.z.toString()+" "+dimension);
    player.removeTag("playerLocation "+px+" "+py+" "+pz+" "+pdimension);
    }
  }
});