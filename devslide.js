'use strict';
function trackSelect() {
    var radius = 20;
    //call this every click in case window size changes
    function setBoundaries(self, l) {
    	self.offset = self.container.getBoundingClientRect().left;
        self.trackWidth = self.container.offsetWidth;
        self.boundaries = [];
        var sectionFull = self.trackWidth / l;
        var sectionHalf = sectionFull / 2;
        var centre, min, max;
        for (var i = 0; i < l; i++) {
            centre = (sectionFull * i) + sectionHalf;
            min = centre - sectionHalf;
            max = centre + sectionHalf;
            self.boundaries.push([centre, min, max]);
        }
    }
    function setActive(self, i) {
	self.active = i;
        self.cb1(i);
    }
    function detectBoundaries(self, pos) {
        for (var i = 0; i < self.controlPoints; i++) {
            if (pos >= self.boundaries[i][1] && pos < self.boundaries[i][2]) {
                //cb0 is just for looks, e.g. icon fades, called on mousemove
                //make sure to only fire if changed
                if (i !== self.active) self.cb0(i);
                return i;
            }
        }
    }
    //pass as px values
    function movePosition(self, pos) {
        pos = pos / self.trackWidth * 100;
        self.trackControl.style.left = pos + '%';
        self.trackInner.style.width = pos + '%';
    }
    function populateTrack(container) {
        var containerTrackInner = document.createElement('div');
	var trackInner = document.createElement('div');
	var trackControl = document.createElement('div');
        containerTrackInner.className = 'container_track_inner';
        trackInner.className = 'track_inner';
        trackControl.className = 'track_control';
        containerTrackInner.appendChild(trackInner);
        container.appendChild(containerTrackInner);
        container.appendChild(trackControl);
        return [trackInner, trackControl];
    }
    function setTransition(self) {
	self.trackInner.className = 'track_inner track_inner_transition';
	self.trackControl.className = 'track_control track_control_transition';
    }
    return {
        init: function(container, points, cb0, cb1) {
            //populate with js.  don't want to select things
            var eles = populateTrack(container);
            this.container = container;
            this.trackInner = eles[0];
            this.trackControl = eles[1];
            this.controlPoints = points;
	    this.dragging = false;
            this.active = 0;
	    this.grabbed = -1;
            this.cb0 = cb0;
            this.cb1 = cb1;
            setBoundaries(this, points);
            this.direct(0);
        },
        grab: function(x) {
            setBoundaries(this, this.controlPoints);
	    this.trackInner.className = 'track_inner';
	    this.trackControl.className = 'track_control';
	    this.dragging = true;
            //this is a little detail to drag the control from the exact click point
            //within it rather from its centre. don't know which is nicer
            var clickOffset = x - this.trackControl.getBoundingClientRect().left - radius;
            clickOffset = 0;
            this.offset = this.offset + clickOffset;
	    this.grabbed = detectBoundaries(this, x - this.offset);
        },
        click: function(x, transition) {
            if (this.dragging === true) return true;
            setBoundaries(this, this.controlPoints);
	    var active = detectBoundaries(this, x - this.offset);
	    if (active === this.active) return true;
	    if (transition === true) setTransition(this);
            this.direct(active, transition);
        },
        up: function(x) {
            if (this.dragging === false) return true;
	    this.dragging = false;
            this.direct(this.active, false);
        },
        direct: function(i, transition) {
	    if (transition === true) setTransition(this);
            movePosition(this, this.boundaries[i][0]);
            setActive(this, i);
        },
        dragTrack: function(x) {
            if (this.dragging === false) return true;
            if (x - this.offset < radius ||
                x - this.offset > this.trackWidth - radius) return true;
            movePosition(this, x - this.offset);
            this.active = detectBoundaries(this, x - this.offset);
        }
    };
}