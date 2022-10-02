import { SimpleScoreboard, DisplaySlotType } from "yoni/scoreboard/SimpleScoreboard.js";
import { Objective, ScoreInfo } from "yoni/scoreboard/Objective.js";
import { Entry, EntryType, EntryOption } from "yoni/scoreboard/Entry.js";
import { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError } from "yoni/scoreboard/ScoreboardError.js"

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
