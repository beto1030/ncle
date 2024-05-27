# HTML
```main>.card>.front+.back```
```html
<main>
    <div class="card">
        <div class="front"></div>
        <div class="back"></div>
    </div>
</main>
```
# CSS
* remove all margin and padding
* apply box-sizing border-box
```css
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

* apply width, height, and a border to make a card
```css
main > .card{
  width: 400px;
  height: 200px;
  border: 1px solid;
}
```

* now lets add some margin to center these cards 
```css
main > .card{
  width: 400px;
  height: 200px;
  border: 1px solid;

  margin: 10px auto;
}
```

* now let's make it more like a flashcard, the front and back should overlap
```css
main > .card{
    
  width: 400px;
  height: 200px;
  border: 1px solid;

  margin: 10px auto;

  position: relative;
}

main > .card > .front, main > .card > .back{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}
```

* we don't want to see the both front and back at the same time 

```css
main > .card > .back{
  display: none;
}
```

* now lets style the text within the card using flexbox

```css
main > .card > .front, main > .card > .back{
  display: flex;
  justify-content: center; /* horizontally */
  align-items: center; /* vertically */
  height: 100%; /* required to make align-items to work */
  width: 90%; /* to take up almost all width of the card */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

* let's improve the look of the card with rounded corners and giving the cards a shadow effect

```css
main > .card{
  width: 400px;
  height: 200px;
  border: 1px solid;

  margin: 10px auto;

  position: relative;

  border-radius: 5px; /* 5px rounded corners */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2); /* shadow effect */
}
```

# Create flashcard html structure function
that takes 3 parameters term, def, category

# Read text file
that creates a array that is populated using the built in javascript split function with newline character

then loop through this array that contains one line of text file per element eliminating spaces in front and at the end of each line using javascript native function trim.

Then check if the line is not empty.

If not empty then create desctructured array to store the term,def,category that are all seperated with a colon symbol.

Inside that same loop call the createFlashcards function to dynamically create these elements after each iteration of the loop
