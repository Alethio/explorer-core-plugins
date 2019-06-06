import { IAbiConstructor } from "./IAbiConstructor";
import { IAbiEvent } from "./IAbiEvent";
import { IAbiFunction } from "./IAbiFunction";
import { IAbiFallback } from "./IAbiFallback";

export type IAbiMember = IAbiConstructor | IAbiEvent | IAbiFunction | IAbiFallback;
