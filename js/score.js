/* The fingering that should be used on a C recorder */
function get_note(note) {
    var n = note;

    if (clef == "f") {
        /* This will turn, for example, `d5' into `f3' */
        n = lines_up(
            add_octaves(n, -2), 2);

    }

    if (
            accidental == "1"
            || (
                key < 7
                && KEYS[key].indexOf(n[0]) != -1
            )
    ) {
        return add_semitone(n);

    } else if (
            accidental == "-1"
            || (
                key > 7
                && KEYS[key].indexOf(
                    line_down(note)[0]) != -1
            )
    ) {
        return substract_semitone(n);

    }

    /* Return search criteria for the position map */
    return [n, "n"];
}
function note_and_sharp_to_alto(note_and_sharp) {
    var n = lines_down(note_and_sharp[0], 2);

    var sharp = note_and_sharp[1];

    if (n[0].match(/[cf]/)) {
        if (sharp == "s") {
            sharp = "n";

        } else {
            n = line_down(n);

        }

    } else {
        n = line_down(n);

        if (n[0] == "f") {
            sharp = "s";

        }

    }

    return [n, sharp];
}

function note_and_sharp_to_soprano(note_and_sharp) {
    return [
        add_octaves(note_and_sharp[0], -1),
        note_and_sharp[1]
    ];

}

function note_and_sharp_to_bass(note_and_sharp) {
    note_and_sharp = note_and_sharp_to_alto(note_and_sharp);

    var raise_by = (as_written == "t" ? 1 : 2);

    return [
        add_octaves(note_and_sharp[0], raise_by),
        note_and_sharp[1]
    ];
}

function note_out_of_range(note_and_sharp) {
    return (
        note_less(note_and_sharp[0], "c4")
        || note_greater(note_and_sharp[0], "d6")
        || (
            note_and_sharp[0] == "d6"
            && note_and_sharp[1] == "s"
        )
    );
}


/* Main drawing function, takes the notes played by a tenor recorder */
function draw_on_recorder(note_and_sharp) {
    if (size == "1" && as_written == "t") {
        note_and_sharp = note_and_sharp_to_soprano(
            note_and_sharp);

    } else if (size == "2") {
        note_and_sharp = note_and_sharp_to_alto(
            note_and_sharp);

    } else if (size == "4") {
        note_and_sharp = note_and_sharp_to_bass(
            note_and_sharp);

    }

    if (note_out_of_range(note_and_sharp)) {
        /* Out of range */
        document.getElementById("out-of-range").style.display = "block";
        /* Clear any previous fingering */
        for (var i = 0; i < HOLES.length; i++) {
            document.getElementById(HOLES[i]).style.background = "none";
            document.getElementById(HOLES[i]).style.backgroundColor = "white";
        }

        return;

    } else {
        document.getElementById("out-of-range").style.display = "none";

    }

    /* Use German fingering when Baroque is not available */
    var style_ = (
        POSITIONS[note_and_sharp[0]][note_and_sharp[1]][style] ? style : "g");

    var i = 0;

    var j = 0;

    /* Clear any previous half-hole gradients */
    document.getElementById("0").style.background = "none";
    document.getElementById("2").style.background = "none";

    if (
        POSITIONS[note_and_sharp[0]][note_and_sharp[1]][style_][0]
            == "0b" ) {
        /* Set background image */
        document.getElementById("0").style.background
            = "linear-gradient(to right, white 50%, black 50%, black 100%)";

        i++;

        j++;

    }

    if (note_and_sharp[0] == "c6"
            && note_and_sharp[1] == "s") { 
        document.getElementById("2").style.background
            = "linear-gradient(to right, white 50%, black 50%, black 100%)";

    }

    for (; i < HOLES.length; i++) {
        if (
            POSITIONS[note_and_sharp[0]][note_and_sharp[1]][style_][j]
                == HOLES[i]) {
            document.getElementById(HOLES[i]).style.backgroundColor
                    = "black";

            j++;

        } else {
            document.getElementById(HOLES[i]).style.backgroundColor
                    = "white";

        }

    }
}
