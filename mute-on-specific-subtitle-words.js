/**
 * Script which observes subtitle changes for specified words (as defined in the words array)
 * and mutes mpv. Replaces the specified word in shows the modified subtitle using and OSD
 * message that looks like a subtitle.
 * Unmutes and retores previous subtitle visibility when on new subtitle.
 */

//
// .
/**
 * Define list of words to mute (and hide subtitles) - add your own words here.
 * NOTE1: '\s*' matches on zero or more non-whitespace characters.
 * NOTE2: during runtime, regexWord list will be treated as case-insensitive.
 */
var regexWord = [
    'ass\s*', 'punkass',
    'bitch\s*',
    '\s*fuck\s*',
    'god\s*' ,
    'jesus\s*', 'christ',
    'piss\s*',
    '\s*shit\s*', 'bullshit'
];
var subvis = "yes"; // init
var overlay;

// get original settings
var origSettings = {};
[
    "osd-align-x",
    "osd-align-y",
    "osd-margin-y",
    "osd-font-size",
    "sub-pos",
    "sub-font-size",
].forEach(function(s) {
    try {
        origSettings[s] = mp.get_property(s);
    } catch (error) {
        print(error);
    }});
print("original_settings:" + JSON.stringify(origSettings));

// set overlay options (to mimic subtitles)
var settings = {};
settings["osd-align-x"] = "center";
settings["osd-align-y"] = "bottom";
settings["osd-margin-y"] = "32";
settings["osd-font-size"] = origSettings['sub-font-size'] || "";
print("settings:" + JSON.stringify(settings));

// now set these settings in mpv
for (key in settings) {
    mp.set_property(key, settings[key]);
}

/**
 * Returns a regex object which can be used for checking if subtitles matches
 * on against any word in the regexWord list, or for replacing individual words.
 * @param {String} value 
 */
function regex(value) {
    return new RegExp("\\b"+ value + "\\b", 'i');
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

/**
 * Checks subtitle text for specified words (as defined in the words array).
 * Uses boundary word regex check to minimise false positives.
 * @param {String} name 
 * @param {String} value 
 */
mp.observe_property("sub-text", "string", function(name, value) {
    if (!value) {
        modifySubtitle();
        return;
    }

    // get subtitle visibility (for next restore)
    subvis = mp.get_property("sub-visibility");

    // check for bad word regex match on current subtitle text
    if (regexWord.some(function (v) {
        // ignore case and use word boundary match on bad word
        return regex(v).test(value);
    })) {
        var subtitle = value;
        regexWord.forEach(function(w, index, array) {
            subtitle = subtitle.replace(regex(w), "_____");
        });
        modifySubtitle(subtitle);
    } else {
        modifySubtitle();
    }
});