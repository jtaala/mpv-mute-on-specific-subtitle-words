/**
 * Define mute word list.
 */
// test words
var words = ['danger', 'dang', 'heck', 'crap'];

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
        // lowercase it
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
    } else {
        mp.set_property("volume", "100");
    }
}

mp.observe_property("sub-text", "string", on_subtitle);
