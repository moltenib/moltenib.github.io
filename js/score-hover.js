import { ctx, HOLES } from "./variables.js";
import { KEYS } from "./keys.js";
import { line_up, lines_up, line_down, note_less } from "./note-operations.js";
import { get_note, draw_on_recorder } from "./score.js";

function show_crotchet(crotchet, transform) {
    const is_hidden = window.getComputedStyle(crotchet).opacity != "1";

    if (is_hidden) {
        /* If hidden, place instantly so it appears in place instead of sliding in. */
        crotchet.classList.add("no-transition");
        crotchet.style.transform = transform;
        crotchet.style.opacity = "1";

        /* Force style flush before restoring transitions. */
        void crotchet.offsetWidth;
        crotchet.classList.remove("no-transition");
        return;
    }

    crotchet.style.transform = transform;
    crotchet.style.opacity = "1";
}

function display_accidental(crotchet, line, crotchet_x) {
    let element = null;

    if (
            /* If the accidental is sharp */
            ctx.accidental == "1"
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
        document.getElementById(
            "accidental-flat").style.display = "none";

        /* Choose the sharp as the one to display */
        element = document.getElementById("accidental-sharp");

    } else if (
            /* Flat is selected */
            ctx.accidental == "-1"
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
        document.getElementById(
            "accidental-sharp").style.display = "none";

        /* Show the flat accidental */
        element = document.getElementById("accidental-flat");

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
        const elements = document.getElementsByClassName("accidental");

        for (let i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";

        }

    }

}

function display_crotchet(line, active_id, inactive_id, y_offset) {
    const inactive = document.getElementById(inactive_id);
    inactive.style.opacity = "0";

    const crotchet = document.getElementById(active_id);

    const x =
        line.offsetWidth / 2
        - crotchet.offsetWidth / 2;

    const y =
        line.offsetHeight / 2
        + line.offsetTop + y_offset;

    const transform = "translate(" + x + "px, " + y + "px)";
    show_crotchet(crotchet, transform);

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

    display_crotchet_stem_down(x);

    const lines = document.getElementsByClassName(
        "line-short-above");

    for (let i = 0; i < lines.length; i++) {
        /* Greater or equal than */
        if (!note_less(x.id, lines[i].id)) {
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

    display_crotchet_stem_down(x);

    draw_on_recorder(note_and_sharp);

}

export function on_note_below_middle_mouseover(x) {
    const note_and_sharp = get_note(x.id);

    display_crotchet_stem_up(x);

    draw_on_recorder(note_and_sharp);

}

export function on_note_below_score_mouseover(x) {
    const note_and_sharp = get_note(x.id);

    display_crotchet_stem_up(x);

    const lines = document.getElementsByClassName(
        "line-short-below");

    for (let i = 0; i < lines.length; i++) {
        if (note_less(lines[i].id, x.id)) {
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
    HOLES.forEach(
        function(hole, index) {
            document.getElementById(hole).style.backgroundColor
                = "white";

        }

    );

    document.getElementById(
        "crotchet-stem-down").style.opacity = "0";

    document.getElementById(
        "crotchet-stem-up").style.opacity = "0";

    document.getElementById(
        "accidental-sharp").style.display = "none";

    document.getElementById(
        "accidental-flat").style.display = "none";

    document.getElementById("0").style.background = "none";

    document.getElementById("2").style.background = "none";

    document.getElementById("out-of-range").style.display = "none";

    let lines;

    ["line-short-above", "line-short-below"].forEach(
        function (class_name, index) {
            lines = document.getElementsByClassName(class_name);

            for (let i = 0; i < lines.length; i++) {
                lines[i].style.background = "none";

            }

        }

    );

}
