#StreamLoaded#
*Load images only when they're in view*

The unfortunate reality is that users don't always read articles down to the bottom of page, so why serve them potentially large images which they will never see? Not doing so will save both you and them bandwidth. This plugin aims to only load images when the user is about to scroll past the image. There is certainly a way to get this wrong, i.e. not taking care to keep SEO visibility for your images, but this plugin expects the placeholder to wrapped in a link to the original image, thus maintaining SEO visibility. 

###Initialising###
#####HTML#####
    <script type="text/javascript" src="/path/to/streamloaded.js"></script>
#####JavaScript#####
    $(function () {
        $('a.streamloaded').streamLoaded({...});
    });
*NB, `$(function(){});` is just shorthand for `$(document).ready(function (){})`. Also, any element with the `.streamloaded` class will be initialised automatically*

The `anchor` element that is being initialised will require a few attributes: 

| name | Description |
------ | ------ |
data-streamloaded-after | A plain object with all of the properties that should be applied to the created `<img/>`
data-width | The width of the image
data-height | The height of the image
href | The path to the image to load

###Options###
| Option | Datatype | Description |
------|------|------|
offset | int/float | The amount of pixels before the image is in view before the software should start loading the image
onbeforeload | callback | Callback for before the image gets loaded. Returning `false` will cause execution to stop. A data object describing the instance is passed as `Param1`
oninit | callback | Callback for when the instance get initialised. No parameters are passed
onimagereplace | callback | Callback for when an image gets replaced. An object with one property, `image`, is passed as `Param1`. The property refers to the newly created Image object
onload | callback | Called when the image has finished loading. Returning `false` will prevent the loaded image from replacing the container. An object with one property, `image`, is passed as `Param1`. The property refers to the newly created Image object
onscroll | callback | Called whenever the user scrolls. An object with two properties, `proximity` (how close the user is before triggering the image load) and `windowheight` (i.e. the height of the window) is passed as `Param1`.

######Why Stream?######
`stream` is just a plugin prefix I like to use to avoid namespace pollution. E.g. when I wrote `streamComplete`, I could have easily called it `autocomplete`, but this would have clashed with jQuery UI's `$.autocomplete` (if someone had it installed).