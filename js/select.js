let key_signature_cache = null;

function get_key_signature_cache() {
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

function select_style(value) {
    /* German or Baroque */
    ctx.style = value;
}

function select_accidental(value) {
    ctx.accidental = value;
}

function select_as_written(value) {
    ctx.as_written = value;
}

function select_key(value) {
    ctx.key = parseInt(value);

    const cache = get_key_signature_cache();

    if (ctx.key <= 7) {
        /* Use sharps */
        const sharps_to_add = 7 - ctx.key;

        let i;

        for (i = 0; i < sharps_to_add; i++) {
            cache.sharps[ctx.clef][i].style.display = "block";

        }

        for (; i < 7; i++)
            cache.sharps[ctx.clef][i].style.display = "none";

        for (i = 0; i < cache.flat_elements.length; i++)
            cache.flat_elements[i].style.display = "none";

    } else {
        /* Use flats */
        const flats_to_add = ctx.key - 7;

        let i;

        for (i = 0; i < flats_to_add; i++) {
            cache.flats[ctx.clef][i].style.display = "block";

        }

        for (; i < 7; i++)
            cache.flats[ctx.clef][i].style.display = "none";

        for (i = 0; i < cache.sharp_elements.length; i++)
            cache.sharp_elements[i].style.display = "none";

    }

}

function select_clef(value) {
    /* Set the new value of the clef */
    ctx.clef = value;

    document.getElementById("treble-clef").style.display = (
        ctx.clef == "g" ? "block" : "none");
    document.getElementById("bass-clef").style.display = (
        ctx.clef == "f" ? "block" : "none");

    const elements = document.getElementsByClassName(
        "key-signature");

    for (let i = 0; i < elements.length; i++)
        elements[i].style.display = "none";

    if (ctx.size == "4" && ctx.clef == "g") {
        const element = document.getElementById(
            "as-written");

        element.value = "t";

        element.disabled = true;

        select_as_written("t");

    } else {
        document.getElementById("as-written").disabled = false;

    }

    select_key(ctx.key);

}

function select_size(value) {
    ctx.size = value;

    const clef_value = (value == "4" ? "f" : "g");

    let element = document.getElementById("clef");

    /* Bass recorder uses a bass clef, others use treble  */
    if (element.value != clef_value) {
        element.value = clef_value;

        select_clef(clef_value);
    }

    element = document.getElementById("as-written");

    /* Alto and tenor recorders always sound as written */
    if (ctx.size == 2 || ctx.size == 3) {
        element.value = "t";

        select_as_written("t");

        element.disabled = true;

        document.getElementById("style").value = "b";

        select_style("b");

    } else {
        element.value = "f";

        select_as_written("f");

        element.disabled = false;

        if (ctx.size == "4") {
            document.getElementById("style").value = "b";

            select_style("b");

        }

    }
}
