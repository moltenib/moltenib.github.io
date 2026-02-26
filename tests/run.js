import { run_all_tests } from "./current-note.test.js";

function set_result_text(element, text) {
    if (element) {
        element.textContent = text;
    }
}

function render_test_results(report) {
    const summary = document.getElementById("summary");
    const list = document.getElementById("results");

    const summary_text = (
        "Passed: " + report.passed
        + "  Failed: " + report.failed
    );
    set_result_text(summary, summary_text);

    document.body.dataset.testFailed = String(report.failed);
    document.body.dataset.testPassed = String(report.passed);

    if (!list) {
        return;
    }

    list.innerHTML = "";

    for (let i = 0; i < report.results.length; i++) {
        const result = report.results[i];
        const item = document.createElement("li");

        if (result.ok) {
            item.textContent = "[PASS] " + result.name;
            item.className = "pass";
        } else {
            item.textContent = "[FAIL] " + result.name + " - " + result.error;
            item.className = "fail";
        }

        list.appendChild(item);
    }
}

const report = run_all_tests();

render_test_results(report);
