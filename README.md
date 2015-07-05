##Edit - this doesn't seem to work anymore since spotify discontinued apps. Boo. Not sure if there is another way to achieve the same thing.

skipit
======

A spotify app to automatically skip songs according to customisable criteria. e.g. `skip songs with explicit lyrics when there are children in the room`

Currently supports skipping songs with explicit lyrics and/or skipping songs by genre

## Installation

 1. Sign up for a [developer account on Spotify](https://developer.spotify.com/technologies/apps/#developer) by logging in and agreeing to the [terms of use](https://developer.spotify.com/technologies/apps/terms-of-use/).
 2. Create the Spotify folder if it doesn't exist already: `~/Spotify` (Mac OS X and Linux) or `My Documents\Spotify` (Windows).
 3. Open the Spotify folder.
 4. Run `git clone https://github.com/julianjelfs/skipit.git skipit`.
 5. Download the [latest version of Spotify](http://spotify.com/download).
 6. Open Spotify and type "spotify:app:skipit" in the search bar (restart Spotify completely in case it doesn't find the App at first).

## Usage

Check the Explicit checkbox to automatically skip songs flagged by Spotify as explicit.

Enter a regexp into the genre text box to find genres to skip. The genres associated with the artist currently playing will be evaluated and if they
contain genres that you have chosen to filter, the track will be skipped.

e.g. `hip.hop|metal` would match hip-hop, alternative metal, punk metal, doom metal etc.

### Note

This is not foolproof at skipping sweary songs. It depends whether Spotify has characterised the song as explicit which is not 100% accurate. 
