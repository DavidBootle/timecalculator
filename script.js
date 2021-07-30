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