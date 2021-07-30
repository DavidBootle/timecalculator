// This file contains scripts that control the functionality of the webpage. All calculations are performed client-side.

/**
 * @function
 * Sets the total display to the given number of hours, minutes, and seconds.
 * @param {int} hours
 * @param {int} minutes 
 * @param {int} seconds 
 */
function setTotal(hours, minutes, seconds) {

    let hoursString = hours.toString().padStart(2, '0');
    let minutesString = minutes.toString().padStart(2, '0');
    let secondsString = seconds.toString().padStart(2, '0');

    let totalString = `${hoursString}:${minutesString}:${secondsString}`;

    $('#totalDisplay').text(totalString);
}

/**
 * Adds a new input row.
 */
function newInputRow() {
    var numOfChildren = $('#inputForm').children().length;
    const rowId = numOfChildren - 1;

    $('#inputForm').append(`
    <div class="row mb-2">
        <div class="col">
            <input type="number" class="form-control font-monospace text-center hours-input" id="hours${rowId}" placeholder="00" min=0 />
        </div>
        <div class="col">
            <input type="number" class="form-control font-monospace text-center minutes-input" id="minutes${rowId}" placeholder="00" min=0 max=60 />
        </div>
        <div class="col">
            <input type="number" class="form-control font-monospace text-center seconds-input" id="seconds${rowId}" placeholder="00" min=0 max=60 />
        </div>
    </div>
    `);
}