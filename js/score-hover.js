function display_accidental(crotchet, line) {
    var element = null;

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
        element.style.marginLeft =
            crotchet.offsetLeft
            - 75
            + "px";

        element.style.marginTop = 
            line.offsetHeight / 2
            + line.offsetTop - 20
            + "px";

        element.style.display = "block";

    } else {
        /* Hide both accidentals */
        var elements = document.getElementsByClassName("accidental");

        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";

        }

    }

}

function display_crotchet_stem_down(line) {
    document.getElementById("crotchet-stem-up").style.display = "none";

    /* Display the crotchet */
    var crotchet = document.getElementById("crotchet-stem-down");

    crotchet.style.marginLeft =
        line.offsetWidth / 2
        - crotchet.width / 2
        + "px";

    crotchet.style.marginTop =
        line.offsetHeight / 2
        + line.offsetTop - 18
        + "px";

    crotchet.style.display = "block";

    display_accidental(crotchet, line);

}

function display_crotchet_stem_up(line) {
    document.getElementById("crotchet-stem-down").style.display = "none";

    var crotchet = document.getElementById("crotchet-stem-up");

    crotchet.style.marginLeft =
        line.offsetWidth / 2
        - crotchet.width / 2
        + "px";

    crotchet.style.marginTop =
        line.offsetHeight / 2
        + line.offsetTop - 70
        + "px";

    crotchet.style.display = "block";

    display_accidental(crotchet, line);

}

function on_note_above_score_mouseover(x) {
    var note_and_sharp = get_note(x.id);

    display_crotchet_stem_down(x);

    var lines = document.getElementsByClassName(
        "line-short-above");

    for (var i = 0; i < lines.length; i++) {
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

function on_note_above_middle_mouseover(x) {
    var note_and_sharp = get_note(x.id);

    display_crotchet_stem_down(x);

    draw_on_recorder(note_and_sharp);

}

function on_note_below_middle_mouseover(x) {
    var note_and_sharp = get_note(x.id);

    display_crotchet_stem_up(x);

    draw_on_recorder(note_and_sharp);

}

function on_note_below_score_mouseover(x) {
    var note_and_sharp = get_note(x.id);

    display_crotchet_stem_up(x);

    var lines = document.getElementsByClassName(
        "line-short-below");

    for (var i = 0; i < lines.length; i++) {
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

function on_score_mouseout(x) {
    HOLES.forEach(
        function(hole, index) {
            document.getElementById(hole).style.backgroundColor
                = "white";

        }

    );

    document.getElementById(
        "crotchet-stem-down").style.display = "none";

    document.getElementById(
        "crotchet-stem-up").style.display = "none";

    document.getElementById(
        "accidental-sharp").style.display = "none";

    document.getElementById(
        "accidental-flat").style.display = "none";

    document.getElementById("0").style.background = "none";

    document.getElementById("2").style.background = "none";

    document.getElementById("out-of-range").style.display = "none";

    var lines;

    ["line-short-above", "line-short-below"].forEach(
        function (class_name, index) {
            lines = document.getElementsByClassName(class_name);

            for (var i = 0; i < lines.length; i++) {
                lines[i].style.background = "none";

            }

        }

    );

}
