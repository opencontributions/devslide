a draggable selection track in js.  no particular license.  no jquery or other libs required.

the technique is to set "dragActive" on mousedown, use document mousemove event.pageX to determine the control position and treat document mouseup as the release event where "dragActive" is true.

should be supported by all modern browsers.  intended for use by people who don't mind reading through the source and tweaking where needed.

usage:

    var track = new trackSelect;
    track.init(containerElement, numberOfItems, callback0, callback1);


the first callback is fired when the control is within an item range, the second is fired on setting the item.

example:

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


example events (using a minimal build of jquery mobile for virtual mouse events):

    $(track.trackControl).on('vmousedown', function(e) {
        $(this).removeClass('track_transition');
        $(track.trackInner).removeClass('track_inner_transition');
        track.grab(e.pageX);
    });
    $('.container_track').on('click', function(e) {
        $(track.trackControl).addClass('track_transition');
        $(track.trackInner).addClass('track_inner_transition');
        track.click(e.pageX);
    });
    $(document).on('vmousemove', function(e) {
        track.dragTrack(e.pageX);
    });

    $(document).on('vmouseup', function(e) {
        e.stopPropagation();
        track.up(e.pageX);
    });
    $('.container_buttons').on('click', '.button_inner', function(e) {
        $(track.trackControl).addClass('track_transition');
        $(track.trackInner).addClass('track_inner_transition');
        track.direct($(this).parent().index());
    });

demo available at: https://opencontributions.github.io/devslide/
