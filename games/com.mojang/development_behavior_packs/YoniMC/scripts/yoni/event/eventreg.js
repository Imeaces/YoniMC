//import "scripts/yoni/event/TickEventSignal.js";
let importList = [
    "scripts/yoni/event/PlayerDeadEventSignal.js",
    "scripts/yoni/event/PlayerJoinedEventSignal.js"
]

importList.forEach(p=>import(p))
