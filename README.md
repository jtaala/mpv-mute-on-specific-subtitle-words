# mpv script to mute on specific subtitle words
`mpv` script which observes subtitle changes for specified words (as defined in the regex word array) and mutes mpv for the duration of that specific subtitle.  

Displayed subtitles are modified and the specified word is replaced with stars (e.g. *****).

Once a modified subtitle is finished, this script unmutes and restores original subtitle (and OSD) settings.

_NOTE: when modifying a displayed subtitle, this script generates and displays a custom OSD message (with subtitle font, size, position etc.)._

Uses `word boundary` regex matching to minimise false positives (e.g if the word `real` has been added, then this script will match on `real` but not `surreal`).

# Installation
Add the script to your mpv script folder (usually at `~/.config/mpv/scripts` for GNU/Linux and `C:/Users/Username/AppData/Roaming/mpv/scripts/` for Windows).