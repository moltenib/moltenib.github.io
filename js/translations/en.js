export const EN_TRANSLATIONS = {
    locale: "en",
    note_octave_offset: 0,
    page: {
        title: "Recorder Fingering Graph",
        og_title: "Recorder Fingering Graph",
        og_description: "An interactive web page to find the fingering for each note that can be played on the recorder.",
        heading: "Recorder Fingering Graph",
        intro: "Hover your mouse on a note below to see its associated fingering on the recorder.",
        labels: {
            size: "Recorder size:",
            style: "Style:",
            accidental: "Accidentals:",
            as_written: "Sound as written:",
            key: "Key:",
            clef: "Clef:"
        },
        options: {
            size: ["Soprano", "Alto", "Tenor", "Bass"],
            style: ["German", "Baroque"],
            accidental: ["Sharp", "None", "Flat"],
            as_written: ["Yes", "No"],
            key: [
                "C# major / A# minor",
                "F# major / D# minor",
                "B major / G# minor",
                "E major / C# minor",
                "A major / F# minor",
                "D major / B minor",
                "G major / E minor",
                "C major / A minor",
                "F major / D minor",
                "Bb major / G minor",
                "Eb major / C minor",
                "Ab major / F minor",
                "Db major / Bb minor",
                "Gb major / Eb minor",
                "Cb major / Ab minor"
            ],
            clef: ["Treble", "Bass"]
        },
        out_of_range: "Note: Out of range. You may choose a different size of recorder to reach this tone.",
        description: [
            "The recorder is an instrument of the woodwind family with history tracing back to the Middle Ages. It is commonly introduced to school students in its soprano form, which is one of the sizes in which this instrument comes, each of them reaching a different pitch. The fingering system used in schools is most often the German one.",
            "Conventionally, the soprano recorder's range of notes begins in a score at an additional line that represents middle C though, in practice, a soprano's lowest note is an octave higher. Other sizes of recorder like the tenor and alto sound as written, starting at C<sub>4</sub> and F<sub>4</sub> respectively, with the bass being another exception as it begins at F<sub>3</sub>, frequently using the F clef and written one octave lower than its actual sound.",
            "This graph will help you to find the appropriate fingering considering the size of recorder you are using as well as the key and accidentals in question."
        ],
        footnote: "",
        too_small: "Please use a larger screen to display this site.",
        languages: {
            en: "English",
            es: "Castellano",
            de: "Deutsch",
            it: "Italiano"
        }
    },
    hole_tooltips: {
        "0": "Left Thumb",
        "1": "Left Index",
        "2": "Left Middle",
        "3": "Left Ring",
        "4": "Right Index",
        "5": "Right Middle",
        "6a": "Right Ring",
        "6b": "Right Ring",
        "7a": "Right Little Finger",
        "7b": "Right Little Finger"
    }
};
