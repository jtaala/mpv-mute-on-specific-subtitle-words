/**
 * Mutes audio on subtitles if they cont ***** (five stars)
 */
function on_subtitle(name, value) {
    if (!value) {
        mute(false);
        return;
    }

    if (contains(value, "DANGER")) {
       mute(true);
    } else {
       mute(false);
    }
}

function contains(source, value) {
    if (!value) {
        return;
    }

    // lowercase it
    value = value.toLowerCase();
    return (source.indexOf(value) !== -1);
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