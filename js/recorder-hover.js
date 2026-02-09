import { get_hole_tooltip } from "./hole-tooltips.js";

export function on_hole_mouseover(x) {
    x.style.backgroundColor = "black";

    const element = document.getElementById("hole-tooltip");
    const recorder = document.getElementById("recorder");
    const recorder_rect = recorder.getBoundingClientRect();
    const hole_rect = x.getBoundingClientRect();

    element.textContent = get_hole_tooltip(x.id);
    element.style.width = "";
    element.style.right = "auto";
    element.style.display = "block";

    const tooltip_rect = element.getBoundingClientRect();
    const recorder_center_x = recorder_rect.left + recorder_rect.width / 2;
    const hole_center_y = hole_rect.top + hole_rect.height / 2;

    element.style.left =
        Math.round(
            window.scrollX
            + recorder_center_x
            - tooltip_rect.width / 2
        )
        + "px";
    element.style.top =
        Math.round(
            window.scrollY
            + hole_center_y
            - tooltip_rect.height / 2
        )
        + "px";

}

export function on_hole_mouseout(x) {
    x.style.backgroundColor = "white";

    document.getElementById("hole-tooltip").style.display = "none";

}
