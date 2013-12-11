var spriteCow={};spriteCow.MicroEvent=function(){},spriteCow.MicroEvent.prototype={bind:function(a,b){this._events=this._events||{},this._events[a]=this._events[a]||[],this._events[a].push(b)},unbind:function(a,b){this._events=this._events||{},a in this._events!=!1&&this._events[a].splice(this._events[a].indexOf(b),1)},trigger:function(a){var b,c;if(a instanceof $.Event?(b=a.type,c=Array.prototype.slice.call(arguments,0)):(b=a,c=Array.prototype.slice.call(arguments,1)),this._events=this._events||{},b in this._events==!1)return a;for(var d=0,e=this._events[b].length;e>d;d++)this._events[b][d].apply(this,c);return a}},spriteCow.Rect=function(){function a(a,b,c,d){this.x=a,this.y=b,this.width=c,this.height=d}return a.prototype,a}(),spriteCow.ImgInput=function(){function a(a,b){var d=this;$('<div class="drop-indicator"></div>').appendTo(b),d.fileName="example.png",d._addDropEvents(b)}var b=a.prototype=new spriteCow.MicroEvent;return b._openFileAsImg=function(a){var b=this,c=new FileReader;b._lastFile=a,b.fileName=a.fileName||a.name,c.onload=function(){b.loadImgUrl(c.result)},c.readAsDataURL(a)},b._addDropEvents=function(a){var b=a[0],c=this;b.addEventListener("dragenter",function(a){a.stopPropagation(),a.preventDefault()},!1),b.addEventListener("dragover",function(b){b.stopPropagation(),b.preventDefault(),a.addClass("drag-over")},!1),b.addEventListener("dragleave",function(b){b.stopPropagation(),b.preventDefault(),a.removeClass("drag-over")},!1),b.addEventListener("drop",function(b){b.stopPropagation(),b.preventDefault(),a.removeClass("drag-over");var d=b.dataTransfer.files[0];d&&"image"===d.type.slice(0,5)&&c._openFileAsImg(d)},!1)},b.loadImgUrl=function(a){var b=this,c=new Image;c.onload=function(){b.trigger("load",c)},c.src=a},b.reloadLastFile=function(){this._lastFile&&this._openFileAsImg(this._lastFile)},a}(),spriteCow.SpriteCanvas=function(){function a(a,b,c,d){if(0===a[b+3]&&0===c[d+3])return!0;for(var e=4;e--;)if(a[b+e]!==c[d+e])return!1;return!0}function b(a,b){for(var c=a.length;c--;)if(!a[c]&&!b[c])return!1;return!0}function c(a){for(var b=a.length;b--;)if(a[b])return!1;return!0}function d(){var a=$("<canvas/>")[0];this.canvas=a,this._context=a.getContext("2d"),this._bgData=[0,0,0,0]}var e=d.prototype=new spriteCow.MicroEvent;return e.setImg=function(a){var b=this.canvas,c=this._context;b.width=a.width,b.height=a.height,c.drawImage(a,0,0),this._img=a},e.setBg=function(a){this._bgData=a},e.getBg=function(){return this._bgData},e.trimBg=function(a){var b;if(a=this._restrictRectToBoundry(a),a.width&&a.height)do b=this._edgesAreBg(a),a=this._contractRect(a,b);while(a.height&&a.width&&!c(b));return a},e._restrictRectToBoundry=function(a){var b=this.canvas,c=Math.min(Math.max(a.x,0),b.width),d=Math.min(Math.max(a.y,0),b.height);return c!==a.x&&(a.width-=c-a.x,a.x=c),d!==a.y&&(a.height-=d-a.y,a.y=d),a.width=Math.min(a.width,b.width-a.x),a.height=Math.min(a.height,b.height-a.y),a},e.expandToSpriteBoundry=function(a){for(var d=this._edgesAreBg(a),e=this._edgesAtBounds(a);!b(d,e);)a=this._expandRect(a,d,e),d=this._edgesAreBg(a),e=this._edgesAtBounds(a);return a=this._contractRect(a,d)},e._edgesAreBg=function(a){var c=(this.canvas,this._context),d=c.getImageData(a.x,a.y,a.width,1).data,e=c.getImageData(a.x+a.width-1,a.y,1,a.height).data,f=c.getImageData(a.x,a.y+a.height-1,a.width,1).data,g=c.getImageData(a.x,a.y,1,a.height).data;return[this._pixelsContainOnlyBg(d),this._pixelsContainOnlyBg(e),this._pixelsContainOnlyBg(f),this._pixelsContainOnlyBg(g)]},e._edgesAtBounds=function(a){var b=this.canvas;return[0===a.y,a.x+a.width===b.width,a.y+a.height===b.height,0===a.x]},e._pixelsContainOnlyBg=function(b){for(var c=this._bgData,d=0,e=b.length;e>d;d+=4)if(!a(c,0,b,d))return!1;return!0},e._expandRect=function(a,b,c){return b[0]||c[0]||(a.y--,a.height++),b[1]||c[1]||a.width++,b[2]||c[2]||a.height++,b[3]||c[3]||(a.x--,a.width++),a},e._contractRect=function(a,b){return b[0]&&a.height&&(a.y++,a.height--),b[1]&&a.width&&a.width--,b[2]&&a.height&&a.height--,b[3]&&a.width&&(a.x++,a.width--),a},d}(),function(){var a=function(){function a(a){this._$container=$('<div class="highlight"/>').appendTo(a)}var b=a.prototype;return b.moveTo=function(a,b){var c=this._$container.transitionStop(!0),d={left:a.x,top:a.y,width:a.width,height:a.height,opacity:1};a.width&&a.height?(c.css("display","block"),b?c.transition(d,{duration:200,easing:"easeOutQuad"}):c.vendorCss(d)):this.hide(b)},b.hide=function(a){var b=this._$container.transitionStop(!0);if(a){var c=parseInt(b.css("left")),d=parseInt(b.css("top"));b.transition({left:c+b.width()/2,top:d+b.height()/2,width:0,height:0,opacity:0},{duration:200,easing:"easeInQuad"})}else b.css("display","none")},b.setHighVisOnDark=function(a){return this._$container[a?"addClass":"removeClass"]("high-vis"),this},a}(),b=function(){function a(a,b){this._$canvas=b,this._$eventArea=a,this._context=b[0].getContext("2d"),this._listeners=[]}var b=a.prototype=new spriteCow.MicroEvent;return b.activate=function(){var a=this,e=(a._context,a._$eventArea);return a._listeners.push([e,"mousedown",function(b){if(0===b.button){var c=a._getColourAtMouse(b.pageX,b.pageY);a.trigger("select",c),b.preventDefault()}}]),a._listeners.push([e,"mousemove",function(b){var c=a._getColourAtMouse(b.pageX,b.pageY);a.trigger("move",c)}]),a._listeners.forEach(function(a){a[0].bind.apply(a[0],a.slice(1))}),a},b.deactivate=function(){return this._listeners.forEach(function(a){a[0].unbind.apply(a[0],a.slice(1))}),this},b._getColourAtMouse=function(a,b){var c=this._$canvas.offset(),d=a-Math.floor(c.left),e=b-Math.floor(c.top);return this._context.getImageData(d,e,1,1).data},a}(),c=function(){function a(a,b,c){this._$area=b,this._$eventArea=a,this._highlight=c,this._listeners=[]}var b=a.prototype=new spriteCow.MicroEvent;return b.activate=function(){var c,d,e,f,g,a=this,b=new spriteCow.Rect(0,0,0,0),h=$(document);return a._listeners.push([a._$eventArea,"mousedown",function(h){if(0===h.button){var i=a._$area.offset();c=h.pageX,d=h.pageY,e=Math.floor(h.pageX-i.left),f=Math.floor(h.pageY-i.top),b=new spriteCow.Rect(e,f,1,1),a._highlight.moveTo(b),g=!0,h.preventDefault()}}]),a._listeners.push([h,"mousemove",function(h){g&&(b.x=e+Math.min(h.pageX-c,0),b.y=f+Math.min(h.pageY-d,0),b.width=Math.abs(h.pageX-c)||1,b.height=Math.abs(h.pageY-d)||1,a._highlight.moveTo(b))}]),a._listeners.push([h,"mouseup",function(){g&&(g=!1,a.trigger("select",b))}]),a._listeners.forEach(function(a){a[0].bind.apply(a[0],a.slice(1))}),a},b.deactivate=function(){return this._listeners.forEach(function(a){a[0].unbind.apply(a[0],a.slice(1))}),this},a}();spriteCow.SpriteCanvasView=function(){function d(d,e){var f=this,g=$('<div class="sprite-canvas-container"/>'),h=$(d.canvas).appendTo(g),i=new a(g),j=new c(g,h,i),k=new b(h,h);this._$container=g,this._$bgElm=e,this._spriteCanvas=d,this._highlight=i,this._selectArea=j,this._selectColor=k,g.appendTo(e),j.bind("select",function(a){var b=d.trimBg(a);b.width&&b.height?(b=d.expandToSpriteBoundry(a),f._setCurrentRect(b)):i.hide(!0)}),k.bind("select",function(a){f.trigger("bgColorSelect",a),f.setBg(XenForo.SmileySpriteCow.colourBytesToCss(a))}),k.bind("move",function(a){f.trigger("bgColorHover",a)})}var e=d.prototype=new spriteCow.MicroEvent;return e._setCurrentRect=function(a){this._highlight.moveTo(a,!0),this.trigger("rectChange",a)},e.setTool=function(a){var b=this._selectArea,c=this._selectColor;switch(this._highlight.hide(),b.deactivate(),c.deactivate(),a){case"select-sprite":b.activate();break;case"select-bg":c.activate()}},e.setBg=function(a){$.support.transition?this._$bgElm.transition({"background-color":a},{duration:500}):this._$bgElm.css({"background-color":a}),this._highlight.setHighVisOnDark("#000"===a)},d}()}(),function(){function a(a){var b=$('<input type="text"/>').appendTo(a),c=this;c._$input=b,c._$editing=null,c._inputBoxOffset={top:-parseInt(b.css("padding-top"),10)-parseInt(b.css("border-top-width"),10),left:-parseInt(b.css("padding-left"),10)-parseInt(b.css("border-left-width"),10)},b.hide(),a.on("click","[data-inline-edit]",function(a){var b=$(a.target),d=c._$editing;d&&b[0]===d[0]||(c.edit(b),a.preventDefault())}),b.blur(function(){c.finishEdit()}).keyup(function(a){13===a.keyCode&&(b[0].blur(),a.preventDefault())})}var b=a.prototype=new spriteCow.MicroEvent;b.edit=function(a){a=$(a);var b=a.position();this._$editing&&this.finishEdit(),this._$editing=a,this._$input.show().css({top:b.top+this._inputBoxOffset.top,left:b.left+this._inputBoxOffset.left,width:Math.max(a.width(),50)}).val(a.text()).focus()},b.finishEdit=function(){if(this._$editing){var a=this._$input.hide().val(),b=new $.Event(this._$editing.data("inlineEdit"));b.val=a,this.trigger(b),this._$editing=null}},spriteCow.InlineEdit=a}(),spriteCow.CssOutput=function(){function a(a,b){return a=Math.round(a),b?a:a?a+"px":"0"}function b(a){return a?c(100*a,3)+"%":"0"}function c(a,b){var c=Math.pow(10,b||0);return Math.round(a*c)/c}function d(a){var b=$('<div class="css-output"></div>').appendTo(a);this._$container=b,this._$code=$("<code>\n\n\n\n\n</code>").appendTo(b),this.backgroundFileName="",this.path="cssOutputPath"in localStorage?localStorage.getItem("cssOutputPath"):"imgs/",this.rect=new spriteCow.Rect(0,0,0,0),this.imgWidth=0,this.imgHeight=0,this.scaledWidth=0,this.scaledHeight=0,this.useTabs=!0,this.useBgUrl=!0,this.percentPos=!1,this.bgSize=!1,this.selector=".sprite",this._addEditEvents(),this.output={}}var e=d.prototype;return e.update=function(){var h,c=this.useTabs?"	":"    ",d=this.rect,e=this._$code,f=this.bgSize?this.scaledWidth/this.imgWidth:1,g=this.bgSize?this.scaledHeight/this.imgHeight:1,i=$("#DataSource").val();e.empty().append($('<span class="selector"/>').text(this.selector)).append(" {\n"),this.useBgUrl&&this.backgroundFileName?(e.append(c+"background: url('"),h=$('<span class="file"/>').append($('<span class="file-name"/>').text(i)),e.append(h).append("') no-repeat ")):e.append(c+"background-position: "),this.percentPos?e.append('<span id="spriteX">'+b(d.x/-(d.width-this.imgWidth))+"</span> "+'<span id="spriteY">'+b(d.y/-(d.height-this.imgHeight))+"</span>;\n"):e.append('<span id="spriteX">'+a(-d.x*f)+"</span> "+'<span id="spriteY">'+a(-d.y*g)+"</span>;\n"),this.bgSize&&e.append(c+"background-size: "+a(this.scaledWidth)+" "+a(this.scaledHeight)+";\n"),e.append(c+'width: <span id="spriteWidth">'+a(d.width*f)+"</span>;\n"+c+'height: <span id="spriteHeight">'+a(d.height*g)+"</span>;\n"+"}"),$.extend(this.output,{width:a(d.width*f,!0),height:a(d.height*g,!0),x:a(-d.x*f,!0),y:a(-d.y*g,!0)})},e._addEditEvents=function(){var a=this;new spriteCow.InlineEdit(a._$container).bind("file-path",function(b){var c=b.val;a.path=c,a.update(),localStorage.setItem("cssOutputPath",c)})},d}(),spriteCow.Toolbar=function(){function a(a){var b=this,c=$('<div class="toolbar"><span class="feedback"></span></div>').appendTo(a);c.on("mouseenter","div[role=button]",function(){var a=$(this);b.feedback(a.hasClass("no-label")?a.text():"")}),c.on("click","div[role=button]",function(){var a=$(this),c=a.data("toolName"),d=new $.Event(c);d.isActive=a.hasClass("active"),b.trigger(d).isDefaultPrevented()||(d.isActive?b.deactivate(c):b.activate(c)),d.preventDefault()}),b.$container=c,b._$feedback=c.find("span.feedback")}a.createButton=function(a,b,c){c=c||{};var d=$('<div role="button"/>').addClass(a).text(b).data("toolName",a);return c.noLabel&&d.addClass("no-label"),c.active&&d.addClass("active"),d};var b=a.prototype=new spriteCow.MicroEvent;return b.addItem=function(b,c,d){return b instanceof spriteCow.ToolbarGroup?this._$feedback.before(b.$container):a.createButton(b,c,d).insertBefore(this._$feedback),this},b.feedback=function(a,b){var c=this._$feedback,d="#555";return c.transitionStop(!0).text(a).css({opacity:.999,color:d,"font-weight":"normal"}),b?(c.css("font-weight","bold"),$.support.transition?c.transition({color:"red"},{duration:3e3}):c.css("color","red")):c.animate({_:0},3e3),c.transition({opacity:0},{duration:2e3}),this},b.activate=function(a){var b=this.$container.find("."+a+"[role=button]");return b.closest(".toolbar-group").children().removeClass("active"),b.addClass("active"),this},b.deactivate=function(a){return this.$container.find("."+a+"[role=button]").removeClass("active"),this},b.isActive=function(a){return this.$container.find("."+a+"[role=button]").hasClass("active")},a}(),function(){function a(){this.$container=$('<div class="toolbar-group"/>')}var b=a.prototype;b.addItem=function(a,b,c){return spriteCow.Toolbar.createButton(a,b,c).appendTo(this.$container),this},spriteCow.ToolbarGroup=a}(),spriteCow.pageLayout=function(){function k(){var b=40,c=a.width()/(g.width()-b);return Math.round(1e4*c)/100+"%"}function l(){var g,j=k();return a.removeClass("intro"),g=[{duration:300,easing:"easeInOutQuad",targets:[[a,{width:"100%"}],[e,{opacity:0}]],before:function(){a.width(j),c.scrollTop(0)}},{duration:500,easing:"easeInOutQuad",targets:[[a,{width:"100%"}],[d,{height:d.height(),"padding-top":d.css("padding-top"),"padding-bottom":d.css("padding-bottom")}],[b,{height:b.height()}],[h,{height:h.height(),"padding-top":h.css("padding-top"),"padding-bottom":h.css("padding-bottom"),"border-top-width":h.css("border-top-width"),"border-bottom-width":h.css("border-bottom-width")}],[i,{height:i.height(),"padding-top":i.css("padding-top"),"padding-bottom":i.css("padding-bottom"),"border-top-width":i.css("border-top-width"),"border-bottom-width":i.css("border-bottom-width")}]],before:function(){}},{duration:500,easing:"swing",targets:[[f,{opacity:1}]]}],a.addClass("intro"),g}function m(a,b,c){function h(){d?m(a,b+1,c):c()}var d=a[b+1],e=a[b],f=e.duration,g=e.easing;e.before&&e.before(),e.targets.forEach(function(a,b){a[0].transition(a[1],{duration:f,easing:g,complete:b?$.noop:h})})}var d,e,f,h,i,a=$(".container"),b=$(".canvas-cell"),c=$(".canvas-inner"),g=$(window),j="intro";return{init:function(){h=$(".toolbar.top"),i=$(".toolbar.bottom"),e=$(".start-buttons"),d=$(".css-output"),f=$(".sprite-canvas-container")},toAppView:function(){if("app"!==j){var b=l();j="app",$.support.transition?m(b,0,function(){var c=[];a.removeClass("intro"),b.forEach(function(a){c=c.concat(a.targets)}),c.forEach(function(a){for(var b in a[1])a[0].css(b,"")})}):a.removeClass("intro")}}}}(),spriteCow.FeatureTest=function(){function a(a){var b=$('<div class="feature-test-results" />'),c=$("<ul/>");this._$container=b.appendTo(a),this._$results=c.appendTo(b),this.allPassed=!0}var b=a.prototype;return b.addResult=function(a,b){this.allPassed=this.allPassed&&a,$("<li/>").text(b).prepend(a?'<span class="pass">pass</span> ':'<span class="fail">fail</span> ').appendTo(this._$results)},a}(),spriteCow.featureTests=function(a){function d(){return!!a.createElement("canvas").getContext}function e(){return!(!window.File||!window.FileReader)}function f(){return!!b.addEventListener}var b=a.createElement("a"),c=a.documentElement,g=new spriteCow.FeatureTest($(".feature-test"));return g.addResult(d(),"<canvas> element"),g.addResult(e(),"File & FileReader"),g.addResult(f(),"addEventListener on elements"),$.browser.opera&&(c.className+=" opera"),g}(document),spriteCow.XenForoSmiley=function(){function a(a){$.extend(a,{key:i}),XenForo.SmileySpriteCow.add(a),i++}return i=1,a}();