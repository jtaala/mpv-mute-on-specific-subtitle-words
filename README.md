# mpv script to mute on specific subtitle words
mpv script which observes subtitle changes for specified words (as defined in the words array) and mutes mpv and hides subtitles (for the duration of that specific subtitle).  Restores previous volume and subtitle visibility settings when the subtitle that contains specified word(s) finishes.

# Installation
Add the script to your mpv script folder (usually at `~/.config/mpv/scripts` for GNU/Linux and `C:/Users/Username/AppData/Roaming/mpv/scripts/` for Windows).
