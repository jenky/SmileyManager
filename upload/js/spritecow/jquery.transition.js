!function(a){var c={easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)"},d=a("<b/>"),e="transitionend webkitTransitionEnd oTransitionEnd",f=function(){var a=d[0].style,b=["Webkit","O","ms","Moz"],c={};return function(d){if(d in c)return c[d];var g,e="",f=b.length,h=d.replace(/-([a-z])/gi,function(a,b){return b.toUpperCase()});if(h in a)e=d;else for(g=h.slice(0,1).toUpperCase()+h.slice(1);f--;)if(b[f]+g in a){e=(b[f]+g).replace(/([A-Z])/g,"-$1").toLowerCase();break}return c[d]=e}}(),g=f("transition");c.swing=c.easeInOutQuart,a.fn.transition=function(b,d){if(!g)return this.animate(b,d);d=a.extend({duration:500,easing:"swing",complete:a.noop},d||{});var h={},i="";return a.each(b,function(a,b){var c=f(a);c&&(h[c]=b,i+=(i?",":"")+c)}),this.queue(function(b){function j(){f.unbind(e,j),f.css(g,"").vendorCss("transition-duration","0"),d.complete(),setTimeout(b,0)}var f=a(this);setTimeout(function(){f.bind(e,j).css(g,"all "+ +d.duration/1e3+"s "+(c[d.easing]||d.easing)).vendorCss("transition-property",i),setTimeout(function(){f.css(h)},0)},0)}),this},a.fn.transitionStop=function(a){return this.stop(a).vendorCss(g,"")},a.fn.vendorCss=function(a,b){if("object"==typeof a){for(var c in a)this.vendorCss(c,a[c]);return this}return a=f(a),arguments.length>1?this.css(a,b):this.css(a)},a.support.transition=!!g}(jQuery);