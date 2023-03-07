import { YoniDimension } from "../dimension.js";
import { Location } from "../Location.js";

export interface VolumeArea {
    dimension: YoniDimension;
    begin: Readonly<Location>;
    x: number;
    y: number;
    z: number;
}
