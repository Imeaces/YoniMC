import SimpleScoreboard from "scripts/yoni/scoreboard/SimpleScoreboard.js";

export default class Utils {
    static getFakePlayerScoreInfo(name){
        let obj = SimpleScoreboard.getObjective("fake_player");
        if (obj == null){
            obj = SimpleScoreboard.addObjective("fake_player", "dummy");
        }
        return obj.getScoreInfo(name, true);
    }
}
