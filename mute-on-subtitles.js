/**
 * Define list of words (encoded to base64) to mute (and hide subtitles).
 */
var words = ['piss', 'ass', 'bitch', 'fuck', 'shit'];

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
        // word bounday match on bad word
        return new RegExp("\\b"+ v + "\\b", 'i').test(value);
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
