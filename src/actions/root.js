/**
 * Created by Evgenii
 */
import * as Actions from "./types";

export function controlProgress(isShowing) {
  return {
    type: Actions.PROGRESS,
    progress: isShowing
  }
}