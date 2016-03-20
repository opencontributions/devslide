A draggable selection track in js.  No jquery or other libraries required.

CSS transitions, adapts to container width. There are two callbacks. The first callback is fired when the control is within an item range, the second is fired on setting the item.

Events are set up independently for easy touchscreen support

Usage:

    var track = new trackSelect;
    track.init(containerElement, numberOfItems, callback0, callback1);

Example:

    var track = new trackSelect;
    track.init($('.container_track')[0], 5,
        function(active) {
            $('.button_active').removeClass('button_active');
            $('.button_inner').eq(active).addClass('button_active');
        },
        function(active) {
            $('.button_active').removeClass('button_active');
            $('.button_inner').eq(active).addClass('button_active');
            $('.container_data')[0].innerHTML = json[active].item;
        }
    );

Methods available are grab(pageX), click(pageX, transition), dragTrack(pageX), up(pageX) and direct(index, transition).

transition is a boolean indicating whether to apply CSS transition classes.

Example events (using a minimal build of jQuery mobile for virtual mouse events):

    $(track.trackControl).on('vmousedown', function(e) {
        e.stopPropagation();
        track.grab(e.pageX);
    });
    $(track.container).on('click', function(e) {
        track.click(e.pageX, true);
    });
    $(document).on('vmousemove', function(e) {
        track.dragTrack(e.pageX);
    });
    $(document).on('vmouseup', function(e) {
        track.up(e.pageX);
    });
    $('.container_buttons').on('click', '.button_inner', function(e) {
        track.direct($(this).parent().index(), true);
    });

Demo available at: https://opencontributions.github.io/devslide/
