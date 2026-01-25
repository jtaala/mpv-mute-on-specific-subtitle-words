/**
 * Script which observes subtitle changes for specified words (as defined in the words array)
 * and mutes mpv. Replaces the specified word in shows the modified subtitle using and OSD
 * message that looks like a subtitle.
 * Unmutes and retores previous subtitle visibility when on new subtitle.
 */

//Define list of words to mute (and hide subtitles) - add your own words here.
var regexWord = [
    'ass',
    'bitch.*',
    'fuck.*', 
    'god.*' ,
    'jesus.*', 'christ',
    'piss.*',
    'shit.*',
];
var subvis = "yes"; // init
var overlay;

// set overlay options (to mimic subtitles)
mp.set_property("osd-align-x", "center");
mp.set_property("osd-align-y", "bottom");
mp.set_property("osd-font-size", "36");

/**
 * Checks subtitle text for specified words (as defined in the words array).
 * Uses boundary word regex check to minimise false positives.
 * @param {String} name 
 * @param {String} value 
 */
function on_subtitle(name, value) {
    if (!value) {
        modifySubtitle();
        return;
    }

    // get subtitle visibility (for next restore)
    subvis = mp.get_property("sub-visibility");

    // check for bad word regex match on current subtitle text
    if (regexWord.some(function (v) {
        // ignore case and use word boundary match on bad word
        return new RegExp("\\b"+ v + "\\b", 'i').test(value);
    })) {
        var subtitle = value;
        regexWord.forEach(function(w, index, array) {
            subtitle = subtitle.replace(new RegExp(w, "i"), "_____");
        });
        modifySubtitle(subtitle);
    } else {
        modifySubtitle();
    }
}

/**
 * Mutes and modifies shown subtitle in mpv iff true.
 * @param {String} subtitle 
 */
function modifySubtitle(subtitle) {
    if (subtitle) {
        mp.set_property("ao-mute", "yes");
        mp.set_property("sub-visibility", "no");

        // show overlay "subtitle"
        overlay = mp.create_osd_overlay('ass-events');
        overlay.data = subtitle;
        overlay.update();
        return;
    }

    // remove any persistent overlay
    if (overlay) {
        overlay.remove();
    }
    // revert to normal operations
    mp.set_property("ao-mute", "no");
    mp.set_property("sub-visibility", subvis);
}

// set observer for all subtitle text changes
mp.observe_property("sub-text", "string", on_subtitle);