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
 * @param {bool} focus - Whether to focus on the first element of the new row.
 */
function newInputRow(focus = false) {
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

    // keypress handler for the hours input
    $(`#hours${rowId}`).keypress(function (e) {

        const key = e.key;

        // cancels the input if the input is not a digit
        if (!/\d/.test(key)) {
            return false;
        }

        const val = $(this).val() + key;

        if ( val.length > 2 ) {
            return false;
        }
    })

    // keypress handler for the minutes input
    $(`#minutes${rowId}`).keypress(function (e) {

        const key = e.key;

        // cancels the input if the input is not a digit
        if (!/\d/.test(key)) {
            return false;
        }

        const val = $(this).val() + key;
        const valNum = parseInt(val);

        if (valNum > 60) {
            return false;
        }

        if ( val.length > 2 ) {
            return false;
        }
    })

    // keypress handler for the seconds input
    $(`#seconds${rowId}`).keypress(function (e) {

        const key = e.key;

        // cancels the input if the input is not a digit
        if (!/\d/.test(key)) {
            return false;
        }

        const val = $(this).val() + key;
        const valNum = parseInt(val);

        if (valNum > 60) {
            return false;
        }

        if (val.length > 2) {
            return false;
        }
    })

    // keydown handler for the seconds input
    $(`#seconds${rowId}`).keydown(function (e) { 
        
        if (e.key == 'Tab') {

            // checks to see if the row is the last row or not
            if($(this).parent().parent().is(':last-child')) {
                newInputRow();
            }
        }
    });

    if (focus) {
        $(`#hours${rowId}`).focus();
    }
}