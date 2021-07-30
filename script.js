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
            <input type="number" class="form-control font-monospace text-center hours-input" id="hours${rowId}" placeholder="00" min=0 oninput="calculateTotal()"/>
        </div>
        <div class="col">
            <input type="number" class="form-control font-monospace text-center minutes-input" id="minutes${rowId}" placeholder="00" min=0 max=60 oninput="calculateTotal()"/>
        </div>
        <div class="col">
            <input type="number" class="form-control font-monospace text-center seconds-input" id="seconds${rowId}" placeholder="00" min=0 max=60 oninput="calculateTotal()"/>
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

/**
 * Gets the integer value of a input on the webpage.
 * @param {int} column - Specifies whether the input is hours, minutes, or seconds. 0 for hours, 1 for minutes, 2 for seconds.
 * @param {int} row - Specifies the row the input is on.
 * @returns {int} - The value of the input. 0 if the input is empty.
 */
function getValue(column, row) {

    var columnName;
    switch (column) {
        case 0:
            columnName = 'hours';
            break;
        case 1:
            columnName = 'minutes';
            break;
        case 2:
            columnName = 'seconds';
            break;
        default:
            console.log('Not a valid column number.');
            return null;
    }

    const val = $(`#${columnName}${row}`).val();

    if (val.length == 0) {
        return 0;
    }

    return parseInt(val);
}

/**
 * Gets the sum of the values from a single column.
 * @param {int} column - The column. 0 for hours, 1 for minutes, 2 for seconds.
 * @returns {int} - The sum of all the columns.
 */
function getColumnSum(column) {

    const numOfRows = $('#inputForm').children().length - 1;

    var sum = 0;
    for (var i = 0; i < numOfRows; i++) {
        sum += getValue(column, i);
    }

    return sum;
}

/**
 * Calculates the total number of hours, minutes, and seconds, and sets the total display accordingly.
 */
function calculateTotal() {

    const combinedHours = getColumnSum(0);
    const combinedMinutes = getColumnSum(1);
    const combinedSeconds = getColumnSum(2);

    let seconds = combinedSeconds + (combinedMinutes * 60) + (combinedHours * 60 * 60);

    var finalHours, finalMinutes, finalSeconds;

    finalHours = Math.floor(seconds / 60 / 60);
    seconds -= finalHours * 60 * 60;

    finalMinutes = Math.floor(seconds / 60);
    seconds -= finalMinutes * 60;

    finalSeconds = seconds;

    setTotal(finalHours, finalMinutes, finalSeconds);
}