import { SimpleScoreboard, DisplaySlotType } from "./scoreboard/SimpleScoreboard.js";
import { Objective, ScoreInfo } from "./scoreboard/Objective.js";
import { Entry, EntryType, EntryOption } from "./scoreboard/Entry.js";
import { NameConflictError, ScoreRangeError, ObjectiveUnregisteredError } from "./scoreboard/ScoreboardError.js"

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
