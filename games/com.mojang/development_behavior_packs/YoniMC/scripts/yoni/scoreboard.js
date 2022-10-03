import { SimpleScoreboard, DisplaySlotType } from "scripts/yoni/scoreboard/SimpleScoreboard.js";
import { Objective, ScoreInfo } from "scripts/yoni/scoreboard/Objective.js";
import { Entry, EntryType, EntryOption } from "scripts/yoni/scoreboard/Entry.js";
import { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError } from "scripts/yoni/scoreboard/ScoreboardError.js"

export default SimpleScoreboard;
export {
    SimpleScoreboard,
    DisplaySlotType,
    Objective,
    ScoreInfo,
    Entry,
    EntryType,
    EntryOption,
}
export { SimpleScoreboard as Scoreboard };
export { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError };
