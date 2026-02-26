import { ctx } from "../js/variables.js";
import { set_locale } from "../js/translations/index.js";
import { get_current_note_text_for } from "../js/score-hover.js";
import { get_note } from "../js/score.js";

function set_ctx(values) {
    Object.assign(ctx, values);
}

function assert_equal(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(message + " expected `" + expected + "` got `" + actual + "`");
    }
}

function assert_note_and_sharp(actual, expected_note, expected_sharp, message) {
    if (!Array.isArray(actual) || actual.length < 2) {
        throw new Error(message + " expected note tuple");
    }

    assert_equal(actual[0], expected_note, message + " note");
    assert_equal(actual[1], expected_sharp, message + " sharp");
}

export function run_all_tests() {
    const results = [];

    function test(name, fn) {
        try {
            fn();
            results.push({ name: name, ok: true });
        } catch (error) {
            results.push({ name: name, ok: false, error: error.message });
        }
    }

    set_locale("en");

    test("Tenor treble A major F4 shows F sharp", function() {
        set_ctx({
            size: 3,
            style: "g",
            accidental: 0,
            as_written: 1,
            key: 4,
            clef: "g"
        });
        assert_equal(
            get_current_note_text_for("f4"),
            "F♯4",
            "Current note text"
        );
    });

    test("No note id yields hyphen", function() {
        set_ctx({
            size: 1,
            style: "g",
            accidental: 0,
            as_written: 0,
            key: 7,
            clef: "g"
        });
        assert_equal(
            get_current_note_text_for(null),
            "-",
            "Current note text"
        );
    });

    test("Tenor bass A major F4 maps to A2", function() {
        set_ctx({
            size: 3,
            style: "g",
            accidental: 0,
            as_written: 1,
            key: 4,
            clef: "f"
        });
        assert_equal(
            get_current_note_text_for("f4"),
            "A2",
            "Current note text"
        );
    });

    test("Bass F major no accidental G4 shows Bb1", function() {
        set_ctx({
            size: 4,
            style: "b",
            accidental: 0,
            as_written: 0,
            key: 8,
            clef: "f"
        });
        assert_equal(
            get_current_note_text_for("g4"),
            "B♭1",
            "Current note text"
        );
    });

    test("Fingering logic uses converted note for bass flat keys", function() {
        set_ctx({
            size: 3,
            style: "g",
            accidental: 0,
            as_written: 1,
            key: 8,
            clef: "f"
        });
        assert_note_and_sharp(
            get_note("g4"),
            "a2",
            "s",
            "get_note(g4)"
        );
    });

    test("German Bb uses B name", function() {
        set_locale("de");
        set_ctx({
            size: 3,
            style: "g",
            accidental: -1,
            as_written: 1,
            key: 7,
            clef: "g"
        });
        assert_equal(
            get_current_note_text_for("b4"),
            "B4",
            "Current note text"
        );
        set_locale("en");
    });

    test("Manual accidental overrides key signature", function() {
        set_locale("en");
        set_ctx({
            size: 3,
            style: "g",
            accidental: -1,
            as_written: 1,
            key: 6,
            clef: "g"
        });
        assert_equal(
            get_current_note_text_for("f4"),
            "F♭4",
            "Current note text"
        );
    });

    const passed = results.filter(function(result) {
        return result.ok;
    }).length;

    return {
        passed: passed,
        failed: results.length - passed,
        results: results
    };
}
