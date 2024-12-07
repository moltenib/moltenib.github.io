function select_style(value) {
    /* German or Baroque */
    style = value;
}

function select_accidental(value) {
    accidental = value;
}

function select_as_written(value) {
    as_written = value;
}

function select_key(value) {
    key = parseInt(value);

    if (key <= 7) {
        /* Use sharps */
        var sharps_to_add = 7 - key;

        var i;

        for (i = 0; i < sharps_to_add; i++) {
            document.getElementById(
                "sharp-" + i + "-" + clef).style.display = "block";

        }

        for (; i < 7; i++)
            document.getElementById(
                "sharp-" + i + "-" + clef).style.display = "none";

        var elements = document.getElementsByClassName("flat");

        for (var i = 0; i < elements.length; i++)
            elements[i].style.display = "none";

    } else {
        /* Use flats */
        var flats_to_add = key - 7;

        var i;

        for (i = 0; i < flats_to_add; i++) {
            document.getElementById(
                "flat-" + i + "-" + clef).style.display = "block";

        }

        for (; i < 7; i++)
            document.getElementById(
                "flat-" + i + "-" + clef).style.display = "none";

        var elements = document.getElementsByClassName("sharp");

        for (var i = 0; i < elements.length; i++)
            elements[i].style.display = "none";

    }

}

function select_clef(value) {
    /* Set the new value of the clef */
    clef = value;

    document.getElementById("treble-clef").style.display = (
        clef == "g" ? "block" : "none");
    document.getElementById("bass-clef").style.display = (
        clef == "f" ? "block" : "none");

    var elements = document.getElementsByClassName(
        "key-signature");

    for (var i = 0; i < elements.length; i++)
        elements[i].style.display = "none";

    if (size == "4" && clef == "g") {
        var element = document.getElementById(
            "as-written");

        element.value = "t";

        element.disabled = true;

        select_as_written("t");

    } else {
        document.getElementById("as-written").disabled = false;

    }

    select_key(key);

}

function select_size(value) {
    size = value;

    var clef_value = (value == "4" ? "f" : "g");

    var element = document.getElementById("clef");

    /* Bass recorder uses a bass clef, others use treble  */
    if (element.value != clef_value) {
        element.value = clef_value;

        select_clef(clef_value);
    }

    element = document.getElementById("as-written");

    /* Alto and tenor recorders always sound as written */
    if (size == 2 || size == 3) {
        element.value = "t";

        select_as_written("t");

        element.disabled = true;

        document.getElementById("style").value = "b";

        select_style("b");

    } else {
        element.value = "f";

        select_as_written("f");

        element.disabled = false;

        if (size == "4") {
            document.getElementById("style").value = "b";

            select_style("b");

        }

    }
}
