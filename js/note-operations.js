export function line_up(note) {
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

export function line_down(note) {
    if (note[0] == "c") {
        return "b" + (parseInt(note[1]) - 1);

    } else if (note[0] == "a") {
        return "g" + note[1];

    }

    return String.fromCharCode(
        note[0].charCodeAt() - 1) + note[1];
}

export function lines_up(note, n) {
    let result = note;

    for (let i = 0; i < n; i++) {
        result = line_up(result);
    }

    return result;
}

export function lines_down(note, n) {
    let result = note;

    for (let i = 0; i < n; i++) {
        result = line_down(result);
    }

    return result;
}

export function note_less(note1, note2) {
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

export function note_greater(note1, note2) {
    return note1 != note2 && !note_less(note1, note2);
}

export function add_octaves(note, n) {
    return note[0] + String.fromCharCode(
        note[1].charCodeAt() + n);
}
export function add_semitone(note) {
    let sharp;

    if (note[0] == "e" || note[0] == "b") {
        sharp = "n";

        note = line_up(note);

    } else
        sharp = "s";

    return [note, sharp];

}
export function substract_semitone(note) {
    let sharp;

    note = line_down(note);

    if (note[0] == "e" || note[0] == "b") {
        sharp = "n";

    } else
        sharp = "s";

    return [note, sharp];

}

export function note_to_index(note, sharp) {
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

    const octave = parseInt(note[1], 10);

    if (isNaN(octave)) {
        return null;
    }

    return (octave - 4) * 12 + base + (sharp == "s" ? 1 : 0);
}

export function note_and_sharp_to_index(note_and_sharp) {
    return note_to_index(note_and_sharp[0], note_and_sharp[1]);
}
