import { get_translations } from "./translations/index.js";

export function get_hole_tooltip(hole_id) {
    return (get_translations().hole_tooltips || {})[hole_id] || "";
}
