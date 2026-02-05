import {
    select_style,
    select_accidental,
    select_as_written,
    select_key,
    select_clef,
    select_size
} from "./select.js";
import {
    on_note_above_score_mouseover,
    on_note_above_middle_mouseover,
    on_note_below_middle_mouseover,
    on_note_below_score_mouseover,
    on_score_mouseout
} from "./score-hover.js";
import {
    on_hole_mouseover,
    on_hole_mouseout
} from "./recorder-hover.js";

window.select_style = select_style;
window.select_accidental = select_accidental;
window.select_as_written = select_as_written;
window.select_key = select_key;
window.select_clef = select_clef;
window.select_size = select_size;

window.on_note_above_score_mouseover = on_note_above_score_mouseover;
window.on_note_above_middle_mouseover = on_note_above_middle_mouseover;
window.on_note_below_middle_mouseover = on_note_below_middle_mouseover;
window.on_note_below_score_mouseover = on_note_below_score_mouseover;
window.on_score_mouseout = on_score_mouseout;

window.on_hole_mouseover = on_hole_mouseover;
window.on_hole_mouseout = on_hole_mouseout;
