/**
 * Define list of words (encoded to base64) to mute (and hide subtitles).
 */
var words = ['fuck', 'shit'];

/**
 * Mutes audio on subtitles if they cont ***** (five stars)
 */
function on_subtitle(name, value) {
    if (!value) {
        mute(false);
        return;
    }

    if (words.some(function (v) {
        if (!value) {
            return false;
        }
        // decode the bad word
        value = value.toLowerCase();
        return (value.indexOf(v) !== -1);
    })) {
        mute(true);
    } else {
        mute(false);
    }
}

/**
 * Mutes mpv iff true.
 * @param {Boolean} option 
 */
function mute(option) {
    if (option) {
        mp.set_property("volume", "0");
        mp.set_property("sub-visibility", "no");
    } else {
        mp.set_property("volume", "100");
        mp.set_property("sub-visibility", "yes");
    }
}

mp.observe_property("sub-text", "string", on_subtitle);
