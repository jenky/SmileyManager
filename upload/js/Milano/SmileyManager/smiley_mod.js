!function(a){XenForo.SmileyMod=function(a){this.__construct(a)},XenForo.SmileyMod.prototype={__construct:function(b){this.$ctrl=b.click(a.context(this,"remove")),this.$target=a(this.$ctrl.data("target"))},remove:function(){this.$target.length&&this.$target.xfFadeUp(XenForo.speed.slow,function(){a(this).empty().remove()})}},XenForo.SpriteCow=function(a){this.__construct(a)},XenForo.SpriteCow.prototype={__construct:function(){XenForo.SmileySpriteCow.init()}},XenForo.SmileySpriteCow={init:function(){var b=a(".canvas-inner"),c=a(".code-container"),d=a("#DataSource"),e=new spriteCow.SpriteCanvas,f=new spriteCow.SpriteCanvasView(e,b),g=new spriteCow.ImgInput(b,b,d.val()),h=new spriteCow.CssOutput(c),i=new spriteCow.Toolbar(".toolbar-container");i.addItem("add-smiley",XenForo.phrases.add_smiley).addItem("reload-img",XenForo.phrases.reload_current_image,{noLabel:!0}).addItem((new spriteCow.ToolbarGroup).addItem("select-sprite",XenForo.phrases.select_sprite,{active:!0}).addItem("select-bg",XenForo.phrases.pick_background)).addItem("invert-bg",XenForo.phrases.toggle_dark_background,{noLabel:!0}),i.$container.addClass("top"),spriteCow.pageLayout.init(),g.bind("load",function(a){e.setImg(a),h.imgWidth=e.canvas.width,h.imgHeight=e.canvas.height,h.scaledWidth=Math.round(h.imgWidth/2),h.scaledHeight=Math.round(h.imgHeight/2),f.setTool("select-sprite"),h.backgroundFileName=g.fileName,spriteCow.pageLayout.toAppView()}),f.bind("rectChange",function(a){h.rect=a,h.update(),a.width===e.canvas.width&&a.height===e.canvas.height&&i.feedback(XenForo.phrases.incorrect_background,!0)}),f.bind("bgColorHover",function(a){i.feedback(XenForo.SmileySpriteCow.colourBytesToCss(a))}),f.bind("bgColorSelect",function(a){var b="select-sprite";f.setTool(b),i.activate(b),i.feedback(XenForo.phrases.background_set_to_x.replace(/\{color\}/,XenForo.SmileySpriteCow.colourBytesToCss(a)))}),i.bind("add-smiley",function(b){if(a.isEmptyObject(h.output))i.feedback(XenForo.phrases.select_sprite_first,!0);else{var c=a.extend(h.output,{data_source:d.val()});new spriteCow.XenForoSmiley(c)}b.preventDefault()}),i.bind("select-bg",function(){f.setTool("select-bg")}),i.bind("select-sprite",function(){f.setTool("select-sprite")}),i.bind("reload-img",function(a){g.reloadLastFile(),a.preventDefault()}),i.bind("invert-bg",function(a){a.isActive?f.setBg("#fff"):f.setBg("#000")}),g.loadImgUrl(d.val())},colourBytesToCss:function(a){return 0===a[3]?"transparent":"rgba("+a[0]+", "+a[1]+", "+a[2]+", "+String(a[3]/255).slice(0,5)+")"},add:function(b){XenForo.ajax("admin.php?smilies/sprite",b,function(b){return XenForo.hasResponseError(b)?!1:(b.templateHtml&&(a(b.templateHtml).xfInsert("appendTo",".SmileyList","xfFadeIn",XenForo.speed.slow),XenForo.init(),a(".SmileyList .SmileyListItem .paramsBlock").width("65%")),void 0)})}},XenForo.register(".SmileyMod","XenForo.SmileyMod"),XenForo.register(".SpriteCow","XenForo.SpriteCow")}(jQuery,this,document);