# cautious-garbanzo

# Steps

## First I need to link express library and the fs library.

## I created a port for the local.

## I created a const for allowing access to the express library.

## using a const of v4: uuidv4 and requiring the library of uuid i can later make unique ids for each array item made.

## I had to add a const of path to require path so i could join the certain path to the dirname which allows the application to work on other computers since their file structure will by different than mine.

## using middleware I was able to make paths for everything within the public folder so that there aren't crazy amounts of code just to get each of the static files to run properly.

## The first get function connects the endpoint of /notes to the dirname which is all the way to this file and connects the path to the notes.html so that when /notes is added on to the original http it'll load my notes.html page.

## The second get function connects the endpoint of /api/notes to read the file of db.json which is the array with all of our data. It parses the array to change them back to objects within the array.

## the third get function connects the "*" symbol to the index.html. What this is doing is saying that any path added onto the original http address will got to the index.html and display it unless otherwise specified like /api/notes was done earlier.

## The post method is now taking the data that the user sent in and writing it the db.json file which holds our array of data and also giving each saved object to be given an unique id number so that is can be called upon later.

## The delete method is allowing the user to remove any saved database data based on its unique id number that was assigned earlier. The id number is targeted within the index.js file inder the delete method, saying when the delete button is pressed then target this id and remove it.

# Special Thanks

## A special thanks to Joem Casusi (Tutor) for helping walk me through this. His explanation of how the get, post, and delete helped me understand it way more and his example and practice method helped me to understand how to write these functions and he also taught me more on what the middleware does and how to use the devtools to further understand why my application isn't working.
