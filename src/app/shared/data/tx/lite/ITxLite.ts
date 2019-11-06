import {ITxLiteBase} from "app/shared/data/tx/lite/ITxLiteBase";
import {ITxLiteFull} from "app/shared/data/tx/lite/ITxLiteFull";

/**
 * Lightweight transaction data in context of a selected block.
 * Full data from consolidated block api.
 */

export type ITxLite = ITxLiteBase | ITxLiteFull;
