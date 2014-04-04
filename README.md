# jquery-character-counter

A simple, Twitter style character counter for HTML input fields. Based on your specified limit, the plugin simply adds a span ( by default ) after your HTML input and updates it as you type.

__Updates:__
* Added min option to allow for a minimum number of characters allowed

__Features:__
* Ctrl & V paste support
* Right click & paste support
* Customizable wrapper and css classes
* Customizable counter format
* Callbacks for exceeding and deceeding the specified limit

## Getting Started

To get started with the character counter, simply reference jQuery and the jQuery Character Counter plugin in your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>	
<script type="text/javascript" src="jquery.charactercounter.js"></script>
```

### Examples

#### Default Usage

__HTML:__
```html
<form>
  <textarea id="count_me"></textarea>
</form>
```
__Javascript:__
```javascript
$("#count_me").characterCounter();
```

#### Custom Limit

__HTML:__
```html
<form>
  <textarea id="count_me"></textarea>
</form>
```
__Javascript:__
```javascript
$("#count_me").characterCounter({
  limit: '250'  
});

$("#count_me").on('character-counter.change', function(e) {
  console.log(e.characterCounter.total, e.characterCounter.remaining);
});
```


### Options

The following options are currently available:

```javascript
{
limit: 150,
min: 0,
counterWrapper: 'span',
counterCssClass: 'counter',
counterFormat: '%1',
counterExceededCssClass: 'exceeded',
onExceed: function(count){},
onDeceed: function(count){},
customFields: {},
silentMode: false
}
```

__limit__ - the number of characters you wish to limit.  
__min__ - the number of characters you wish to set as the minimum allowed.  
__counterWrapper__ - the element you wish to wrap your counter in.  
__counterCssClass__ - the CSS class to apply to your counter.  
__counterFormat__ - the format of your counter text where '%1' will be replaced with the remaining character count.  
__counterExceededCssClass__ - the CSS class to apply when your limit has been exceeded.  
__onExceed__ - this function is called when the limit is breached   
__onDeceed__ - this function is called when the limit, having previously been exceeded, is now deceeded
__customFields__ - key value pairs of custom options to be added to the counter such as class, data attributes etc.
__silentMode__ - if true, will not write the count to an HTML element (you can still listen for the appropriate triggered events)