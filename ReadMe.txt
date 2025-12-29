NEW CONFIGURATION FILE
New to the project is a configuration file which will allow you to change some of the behaviour of the app. 

That file is found at this path:
js-new/config.js

Currently, the following settings are active:

  nuclearTrigger: 
    how many single-language sounds/text updates until the multiple-language nuclear setting kicks in

  maxFZMessage: 
    single language message big text size
  maxFZSynonym: 
    single language synonym text size

  maxFZMessageNode: 
    multiple language (nuclear) node text size for message.
  maxFZSynonymNode: 
    multiple language (nuclear) node text size for message for synonym

  nodeOpacityBtmLimit: lower limit of random opacity for added text nodes (.2 = 20% opacity)
  nodeOpacityTopLimit: upper limit of random opacity for added text nodes (.2 = 20% opacity)

Other values are not currently operational, but will become so at a later date. 

To change settings, change a value, save the file, and then reload the page to test.

Note: the file config-original-settings.js contains the original values I have used, so if you bork the app, you can always just copy the config object from that file.

====================

ADDING A NEW LANGUAGE
To add a new language to the project, duplicate an existing language file. Those files are contained in js-new/language-data.

Change the name and values inside (more details below) to data-language.js: for example, data-swedish.js.

Now change the values in the new file. 

Each sound and its associated data is put between curly braces {}

To edit any value, make sure that the new value is placed between the quotation marks. Please also make sure that each line inside the curly braces ends in a comma.

Do not edit in a rich text program like MS Word. Use a program like VisualStudioCode (which is a free download). You could also use a program like TextEdit on Mac or NotePad on Windows, as long as you make sure that it is saving in plaintext format. An advantage of VisualStudioCode, however, is that it will use color to signify each part, which makes it easier to keep consistent syntax.

Once you have edited the file, open the file js-new/text-data.js and then duplicate one of the IMPORT statements and change the language code and path. In other words, continuing the swedish example,

  import ko from "./language-data/data-korean.js"

  will become 

  import sw from "./language-data/data-swedish.js"

Similarly, duplicate one of the lines in the TEXTDATA export statement, and again change the language codes, twice. So:

  ko: normalizeBySoundNum(ko),
  will become 
  sw: normalizeBySoundNum(sw),


FINALLY, in the sounds folder, put the sound files for that language. Make sure that they are in a folder whose name is that of the language itself.






