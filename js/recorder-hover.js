import { HOLE_TOOLTIPS } from "./hole-tooltips.js";

export function on_hole_mouseover(x) {
    x.style.backgroundColor = "black";

    const element = document.getElementById("hole-tooltip");
    const recorder = document.getElementById("recorder");

    element.textContent = HOLE_TOOLTIPS[x.id];

    element.style.width = (recorder.offsetWidth + 10) + "px";

    element.style.left =
        recorder.offsetLeft
        - recorder.offsetWidth / 2
        + "px";

    element.style.top =
        x.offsetTop
        + x.offsetHeight / 3.5
        + "px";

    element.style.display = "block";

}

export function on_hole_mouseout(x) {
    x.style.backgroundColor = "white";

    document.getElementById("hole-tooltip").style.display = "none";

}
