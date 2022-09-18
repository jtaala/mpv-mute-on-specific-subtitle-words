/**
 * Script which observes subtitle changes for specified words (as defined in the words array)
 * and mutes mpv and hides subtitles (for the duration of that specific subtitle).
 * Retores previous volume and subtitle visibility on the next "good" subtitle.
 */

//Define list of words to mute (and hide subtitles) - add your own words here.
var words = ['ass', 'bitch', 'fuck', 'shit'];
var volume = "100"; // init
var subvis = "yes"; // init

/**
 * Checks subtitle text for specified words (as defined in the words array).
 * Uses boundary word regex check to minimise false positives.
 */
function on_subtitle(name, value) {
    if (!value) {
        mute(false);
        return;
    }

    // get current volume and subtitle visibility (for next restore)
    volume = mp.get_property("volume");
    subvis = mp.get_property("sub-visibility");

    // check for bad word regex match on current subtitle text
    if (words.some(function (v) {
        if (!value) {
            return false;
        }
        // use word boundary match on bad word
        return new RegExp("\\b"+ v + "\\b", 'i').test(value);
    })) {
        mute(true);
    } else {
        mute(false);
    }
}

/**
 * Mutes and hides subtitles (visibility) in mpv iff true.
 * @param {Boolean} option 
 */
function mute(option) {
    if (option) {
        mp.set_property("volume", "0");
        mp.set_property("sub-visibility", "no");
    } else {
        mp.set_property("volume", volume);
        mp.set_property("sub-visibility", subvis);
    }
}

// set observer for all subtitle text changes
mp.observe_property("sub-text", "string", on_subtitle);