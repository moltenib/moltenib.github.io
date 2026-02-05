function line_up(note) {
    if (note[0] == "b") {
        /* One octave down */
        return "c" + (parseInt(note[1]) + 1);

    } else if (note[0] == "g") {
        /* A is below G */
        return "a" + note[1];

    }

    return String.fromCharCode(
        note[0].charCodeAt() + 1) + note[1];
}

function line_down(note) {
    if (note[0] == "c") {
        return "b" + (parseInt(note[1]) - 1);

    } else if (note[0] == "a") {
        return "g" + note[1];

    }

    return String.fromCharCode(
        note[0].charCodeAt() - 1) + note[1];
}

function lines_up(note, n) {
    let result = note;

    for (let i = 0; i < n; i++) {
        result = line_up(result);
    }

    return result;
}

function lines_down(note, n) {
    let result = note;

    for (let i = 0; i < n; i++) {
        result = line_down(result);
    }

    return result;
}

function note_less(note1, note2) {
    if (note1[1] < note2[1])
        return true;

    if (note1[1] == note2[1]) {
        if (
                (
                    note1[0] == "a"
                    || note1[0] == "b"
                ) && (
                    note2[0] != "a"
                    && note2[0] != "b"
                )
        ) {
            return false;
        }

        if (
                (
                    note2[0] == "a"
                    || note2[0] == "b"
                ) && (
                    note1[0] != "a"
                    && note1[0] != "b"
                )
        ) {
            return true;
        }

        return note1[0] < note2[0];

    }

    return false;
}

function note_greater(note1, note2) {
    return note1 != note2 && !note_less(note1, note2);
}

function add_octaves(note, n) {
    return note[0] + String.fromCharCode(
        note[1].charCodeAt() + n);
}
function add_semitone(note) {
    let sharp;

    if (note[0] == "e" || note[0] == "b") {
        sharp = "n";

        note = line_up(note);

    } else
        sharp = "s";

    return [note, sharp];

}
function substract_semitone(note) {
    let sharp;

    note = line_down(note);

    if (note[0] == "e" || note[0] == "b") {
        sharp = "n";

    } else
        sharp = "s";

    return [note, sharp];

}

function note_to_index(note, sharp) {
    let base;

    switch (note[0]) {
        case "c": base = 0; break;
        case "d": base = 2; break;
        case "e": base = 4; break;
        case "f": base = 5; break;
        case "g": base = 7; break;
        case "a": base = 9; break;
        case "b": base = 11; break;
        default: return null;
    }

    let octave = parseInt(note[1], 10);

    if (isNaN(octave)) {
        return null;
    }

    return (octave - 4) * 12 + base + (sharp == "s" ? 1 : 0);
}

function note_and_sharp_to_index(note_and_sharp) {
    return note_to_index(note_and_sharp[0], note_and_sharp[1]);
}
