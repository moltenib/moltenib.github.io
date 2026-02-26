import { HOLES } from "./variables.js";

let current_note_element_cache = null;
let score_hover_cache = null;
let key_signature_cache = null;

export function get_current_note_element_cache() {
    if (!current_note_element_cache) {
        current_note_element_cache = document.getElementById("current-note");
    }

    return current_note_element_cache;
}

export function get_score_hover_cache() {
    if (score_hover_cache) {
        return score_hover_cache;
    }

    const hole_elements = {};

    for (let i = 0; i < HOLES.length; i++) {
        hole_elements[HOLES[i]] = document.getElementById(HOLES[i]);
    }

    score_hover_cache = {
        score: document.getElementById("score"),
        crotchet_down: document.getElementById("crotchet-stem-down"),
        crotchet_up: document.getElementById("crotchet-stem-up"),
        accidental_sharp: document.getElementById("accidental-sharp"),
        accidental_flat: document.getElementById("accidental-flat"),
        accidental_elements: document.getElementsByClassName("accidental"),
        lines_above: document.getElementsByClassName("line-short-above"),
        lines_below: document.getElementsByClassName("line-short-below"),
        out_of_range: document.getElementById("out-of-range"),
        cached_score_width: null,
        cached_crotchet_x: null,
        hole_elements: hole_elements
    };

    return score_hover_cache;
}

export function get_key_signature_cache() {
    if (key_signature_cache) {
        return key_signature_cache;
    }

    key_signature_cache = {
        sharps: {
            g: [],
            f: []
        },
        flats: {
            g: [],
            f: []
        },
        sharp_elements: document.getElementsByClassName("sharp"),
        flat_elements: document.getElementsByClassName("flat")
    };

    for (let i = 0; i < 7; i++) {
        key_signature_cache.sharps.g.push(
            document.getElementById("sharp-" + i + "-g"));
        key_signature_cache.sharps.f.push(
            document.getElementById("sharp-" + i + "-f"));
        key_signature_cache.flats.g.push(
            document.getElementById("flat-" + i + "-g"));
        key_signature_cache.flats.f.push(
            document.getElementById("flat-" + i + "-f"));
    }

    return key_signature_cache;
}
