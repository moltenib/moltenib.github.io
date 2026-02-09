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
import { apply_i18n } from "./i18n.js";

apply_i18n();

Object.assign(window, {
    select_style: select_style,
    select_accidental: select_accidental,
    select_as_written: select_as_written,
    select_key: select_key,
    select_clef: select_clef,
    select_size: select_size,
    on_note_above_score_mouseover: on_note_above_score_mouseover,
    on_note_above_middle_mouseover: on_note_above_middle_mouseover,
    on_note_below_middle_mouseover: on_note_below_middle_mouseover,
    on_note_below_score_mouseover: on_note_below_score_mouseover,
    on_score_mouseout: on_score_mouseout,
    on_hole_mouseover: on_hole_mouseover,
    on_hole_mouseout: on_hole_mouseout
});
