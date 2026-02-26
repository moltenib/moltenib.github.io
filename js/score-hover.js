import { ctx, HOLES } from "./variables.js";
import { KEYS } from "./keys.js";
import {
    get_current_note_element_cache,
    get_score_hover_cache
} from "./cache.js";
import { get_current_locale, get_translations } from "./translations/index.js";
import {
    add_octaves,
    line_up,
    lines_up,
    line_down,
    is_note_less
} from "./note-operations.js";
import { get_note, draw_on_recorder } from "./score.js";

let current_note_text = "";
let current_note_visible = "";
let current_note_id = null;
const NOTE_NAMES_BY_LOCALE = {
    en: {
        c: "C",
        d: "D",
        e: "E",
        f: "F",
        g: "G",
        a: "A",
        b: "B"
    },
    es: {
        c: "Do",
        d: "Re",
        e: "Mi",
        f: "Fa",
        g: "Sol",
        a: "La",
        b: "Si"
    },
    it: {
        c: "Do",
        d: "Re",
        e: "Mi",
        f: "Fa",
        g: "Sol",
        a: "La",
        b: "Si"
    },
    de: {
        c: "C",
        d: "D",
        e: "E",
        f: "F",
        g: "G",
        a: "A",
        b: "H"
    }
};

function get_localized_note_name(note_letter, accidental) {
    const locale = get_current_locale();
    const lower_letter = note_letter.toLowerCase();
    const names = NOTE_NAMES_BY_LOCALE[locale] || NOTE_NAMES_BY_LOCALE.en;
    let name = names[lower_letter] || note_letter.toUpperCase();
    let accidental_symbol = accidental;

    /* In German notation, Bb is written as "B" */
    if (locale == "de" && lower_letter == "b" && accidental == "♭") {
        name = "B";
        accidental_symbol = "";
    }

    return [name, accidental_symbol];
}

function get_display_accidental(note) {
    if (ctx.accidental == 1) {
        return "♯";
    }

    if (ctx.accidental == -1) {
        return "♭";
    }

    if (ctx.accidental == 0 && ctx.key < 7 && KEYS[ctx.key].indexOf(note[0]) != -1) {
        return "♯";
    }

    if (ctx.accidental == 0 && ctx.key > 7 && KEYS[ctx.key].indexOf(line_down(note)[0]) != -1) {
        return "♭";
    }

    return "";
}

function get_localized_octave(octave_text) {
    const octave_number = parseInt(octave_text, 10);

    if (isNaN(octave_number)) {
        return octave_text;
    }

    const translations = get_translations();
    const offset = Number(translations.note_octave_offset || 0);

    return String(octave_number + offset);
}

function get_crotchet_x(cache) {
    const score_width = cache.score.offsetWidth;

    if (
        cache.cached_crotchet_x == null
        || cache.cached_score_width !== score_width
    ) {
        cache.cached_score_width = score_width;
        cache.cached_crotchet_x = Math.floor(
            (score_width - cache.crotchet_down.offsetWidth) / 2
        );
    }

    return cache.cached_crotchet_x;
}

export function get_current_note_text_for(note_id) {
    if (!note_id) {
        return "-";
    }

    let displayed_note = note_id;

    if (ctx.clef == "f") {
        displayed_note = lines_up(add_octaves(displayed_note, -2), 2);
    }

    if (ctx.size == 1 && ctx.as_written == 0) {
        displayed_note = add_octaves(displayed_note, 1);
    }

    if (ctx.size == 4 && ctx.as_written == 0) {
        displayed_note = add_octaves(displayed_note, -1);
    }

    const letter = displayed_note[0];
    const octave = get_localized_octave(displayed_note.slice(1));
    const accidental = get_display_accidental(displayed_note);
    const localized = get_localized_note_name(letter, accidental);

    return localized[0] + localized[1] + octave;
}

function display_current_note_by_id(note_id) {
    const current_note = get_current_note_element_cache();

    if (!current_note) {
        return;
    }

    if (!note_id) {
        current_note_id = null;
        if (current_note_text != "-") {
            current_note.textContent = "-";
            current_note_text = "-";
        }
        if (current_note_visible != "hidden") {
            current_note.style.visibility = "hidden";
            current_note_visible = "hidden";
        }
        return;
    }

    current_note_id = note_id;
    const next_text = get_current_note_text_for(note_id);

    if (current_note_text != next_text) {
        current_note.textContent = next_text;
        current_note_text = next_text;
    }
    if (current_note_visible != "visible") {
        current_note.style.visibility = "visible";
        current_note_visible = "visible";
    }
}

function display_crotchet_transition(crotchet, transform) {
    const is_hidden = window.getComputedStyle(crotchet).opacity != "1";

    if (is_hidden) {
        /* If hidden, place instantly so it appears in place instead of sliding in */
        crotchet.classList.add("no-transition");
        crotchet.style.transform = transform;
        crotchet.style.opacity = "1";

        /* Force style flush before restoring transitions */
        void crotchet.offsetWidth;
        crotchet.classList.remove("no-transition");
        return;
    }

    crotchet.style.transform = transform;
    crotchet.style.opacity = "1";
}

function display_accidental(crotchet, line, crotchet_x) {
    let element = null;
    const cache = get_score_hover_cache();
    const accidental_sharp = cache.accidental_sharp;
    const accidental_flat = cache.accidental_flat;

    if (
            /* If the accidental is sharp */
            ctx.accidental == 1
            && (
                ctx.key < 7
                && (
                    (
                        ctx.clef == "g"
                        /* The current key does not make this a sharp */
                        && KEYS[ctx.key].indexOf(line.id[0]) == -1
                    ) || (
                        ctx.clef == "f"
                        && KEYS[ctx.key].indexOf(
                            lines_up(line.id, 3)[0]) == -1
                    )
                ) || ctx.key >= 7
            )
    ) {
        /* Hide the flat accidental */
        accidental_flat.style.display = "none";

        /* Choose the sharp as the one to display */
        element = accidental_sharp;

    } else if (
            /* Flat is selected */
            ctx.accidental == -1
            && (
                ctx.key > 7
                && (
                    (
                        ctx.clef == "g"
                        /* The current key does not make this a flat */
                        && KEYS[ctx.key].indexOf(
                            line_down(line.id)[0]) == -1
                    ) || (
                        ctx.clef == "f"
                        && KEYS[ctx.key].indexOf(
                            line_up(line.id)[0]) == -1
                    )
                ) || ctx.key <= 7
            )
    ) {
        /* Hide sharp */
        accidental_sharp.style.display = "none";

        /* Show the flat accidental */
        element = accidental_flat;

    }

    if (element) {
        /* If an accidental ought to be displayed */
        element.style.right = "auto";
        element.style.left = "";
        element.style.top = "";
        element.style.marginLeft =
            Math.round(
                crotchet.offsetLeft
                + crotchet_x
                - 75
            )
            + "px";
        element.style.marginTop =
            Math.round(
                line.offsetHeight / 2
                + line.offsetTop
                - 20
            )
            + "px";
        element.style.display = "block";

    } else {
        /* Hide both accidentals */
        const elements = cache.accidental_elements;

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";

        }

    }

}

function display_crotchet(line, active_id, inactive_id, y_offset) {
    const cache = get_score_hover_cache();
    const inactive = (
        inactive_id == "crotchet-stem-up"
        ? cache.crotchet_up
        : cache.crotchet_down
    );
    inactive.style.opacity = "0";

    const crotchet = (
        active_id == "crotchet-stem-up"
        ? cache.crotchet_up
        : cache.crotchet_down
    );
    const x = get_crotchet_x(cache);

    const y =
        line.offsetHeight / 2
        + line.offsetTop + y_offset;

    const transform = "translate(" + x + "px, " + y + "px)";
    display_crotchet_transition(crotchet, transform);

    display_accidental(crotchet, line, x);
}

function display_crotchet_stem_down(line) {
    display_crotchet(
        line,
        "crotchet-stem-down",
        "crotchet-stem-up",
        -18);
}

function display_crotchet_stem_up(line) {
    display_crotchet(
        line,
        "crotchet-stem-up",
        "crotchet-stem-down",
        -70);
}

export function on_note_above_score_mouseover(x) {
    const note_and_sharp = get_note(x.id);
    display_current_note_by_id(x.id);

    display_crotchet_stem_down(x);

    const lines = get_score_hover_cache().lines_above;

    for (let i = 0; i < lines.length; i++) {
        /* Greater or equal than */
        if (!is_note_less(x.id, lines[i].id)) {
            lines[i].style.background
                = "linear-gradient(to right, white 45%, black 45%, black 57%, white 57%)";

        } else {
            lines[i].style.background
                = "none";

        }

    }

    draw_on_recorder(note_and_sharp);

}

export function on_note_above_middle_mouseover(x) {
    const note_and_sharp = get_note(x.id);
    display_current_note_by_id(x.id);

    display_crotchet_stem_down(x);

    draw_on_recorder(note_and_sharp);

}

export function on_note_below_middle_mouseover(x) {
    const note_and_sharp = get_note(x.id);
    display_current_note_by_id(x.id);

    display_crotchet_stem_up(x);

    draw_on_recorder(note_and_sharp);

}

export function on_note_below_score_mouseover(x) {
    const note_and_sharp = get_note(x.id);
    display_current_note_by_id(x.id);

    display_crotchet_stem_up(x);

    const lines = get_score_hover_cache().lines_below;

    for (let i = 0; i < lines.length; i++) {
        if (is_note_less(lines[i].id, x.id)) {
            lines[i].style.background
                = "none";

        } else {
            lines[i].style.background
                = "linear-gradient(to right, white 45%, black 45%, black 57%, white 57%)";

        }

    }

    draw_on_recorder(note_and_sharp);

}

export function on_score_mouseout(x) {
    display_current_note_by_id(null);
    const cache = get_score_hover_cache();

    HOLES.forEach(
        function(hole, index) {
            cache.hole_elements[hole].style.backgroundColor
                = "white";

        }

    );

    cache.crotchet_down.style.opacity = "0";

    cache.crotchet_up.style.opacity = "0";

    cache.accidental_sharp.style.display = "none";

    cache.accidental_flat.style.display = "none";

    cache.hole_elements["0"].style.background = "none";

    cache.hole_elements["2"].style.background = "none";

    cache.out_of_range.style.display = "none";
    const lines_groups = [cache.lines_above, cache.lines_below];

    for (let g = 0; g < lines_groups.length; g++) {
        const lines = lines_groups[g];

        for (let i = 0; i < lines.length; i++) {
            lines[i].style.background = "none";
        }
    }

}
