# mpv script to mute on specific subtitle words
mpv script which observes subtitle changes for specified words (as defined in the words array) and mutes mpv and hides subtitles (for the duration of that specific subtitle).  Unmutes and restores subtitle visibility settings when the subtitle that contains specified word(s) ends.

Uses `word boundary` regex matching to minimise false positives (e.g if the word `real` has been added, then this script will match on `real` but not `surreal`).

# Installation
Add the script to your mpv script folder (usually at `~/.config/mpv/scripts` for GNU/Linux and `C:/Users/Username/AppData/Roaming/mpv/scripts/` for Windows).