function wipImageZoomConfig(){this.defaults={zoomEnable:!0,defaultIndex:0,images:[],style:"inner",boxPos:"right-top",boxW:400,boxH:400,method:"lens",cursor:"crosshair",lens:!0,zoomLevel:3,immersiveMode:"769",immersiveModeOptions:{},immersiveModeMessage:"Click to Zoom",prevThumbButton:"&#9665;",nextThumbButton:"&#9655;",thumbsPos:"bottom",thumbCol:3,thumbColPadding:4},this.setDefaults=function(e){this.defaults=angular.extend(this.defaults,e)},this.$get=function(){return this}}function wipImageZoomDirective(e){return{restrict:"EA",template:'<div class="wip-image-zoom {{vm.options.style}}-style {{vm.options.thumbsPos}}-thumbs"\n     ng-class="{\n     \'active\':vm.zoomActive, \n     \'immersive-mode\':vm.immersiveModeActive && !immersive,\n     \'zoom-disabled\':!vm.options.zoomEnable,\n     \'box-style\':vm.options.style == \'box\' ,\n     \'inner-style\':vm.options.style == \'inner\'}">\n\n    <wip-image-zoom-thumbs ng-if="vm.options.thumbsPos === \'top\' && vm.images.length > 1"></wip-image-zoom-thumbs>\n\n    <div ng-hide="!vm.options.zoomEnable && immersive" class="main-image-wrapper" ng-class="{\'loading\':vm.largeImageLoading}">\n        <div class="image-zoom-tracker" wip-image-zoom-tracker></div>\n        <div class="image-zoom-lens" wip-image-zoom-lens></div>\n        <img class="main-image" ng-src="{{vm.mainImage.medium}}" image-on-load="vm.initZoom()">\n        <div class="zoom-mask"\n             ng-class="vm.options.style == \'box\'? vm.options.boxPos : \'\'"\n             wip-image-zoom-mask>\n            <img wip-image-zoom-image class="zoom-image main-image-large" image-on-load="vm.largeImageLoaded()"\n                 ng-src="{{vm.mainImage.large}}">\n        </div>\n        <div ng-if="vm.immersiveModeActive && !immersive && vm.options.immersiveModeMessage !== \'\'"\n             class="immersive-mode-message" ng-bind="vm.options.immersiveModeMessage"></div>\n    </div>\n\n    <div class="immersive-no-zoom-image-wrapper" ng-show="!vm.options.zoomEnable && immersive">\n        <img class="main-image-large" ng-src="{{vm.mainImage.large}}">\n    </div>\n\n    <wip-image-zoom-thumbs\n            ng-if="vm.options.thumbsPos === \'bottom\' && vm.images.length > 1"></wip-image-zoom-thumbs>\n</div>',replace:!0,scope:{selectedModel:"=?",selectedIndex:"=?",wipImageZoom:"=",immersive:"=?"},controllerAs:"vm",link:function(e,o,i,t){t.el=o,t.attrs=i,t.init()},controller:["$scope","$document","$window","$compile","wipImageZoomConfig",function(o,i,t,m,n){function s(){Y.options=o.wipImageZoom?angular.extend(F,o.wipImageZoom):F,a(),o.selectedIndex=Y.options.defaultIndex,o.selectedModel=Y.mainImage}function a(){Y.options.images.length<=0&&(Y.options.images=[{thumb:Y.attrs.src,medium:Y.attrs.src,large:Y.attrs.src}]),Y.images=Y.options.images,Y.mainImage=Y.images[Y.options.defaultIndex]}function l(){G&&e.cancel(G),G=e(function(){v(),r(),T()},400)}function r(){Y.options.zoomEnable&&(f(),Y.zoomTracker.style.cursor=Y.options.cursor,Y.options.lens?Y.zoomLens.style.display="block":Y.zoomLens.style.display="none",d(),Y.immersiveModeActive=Y.options.immersiveMode&&Y.options.immersiveMode>t.innerWidth||"allways"===Y.options.immersiveMode,Y.immersiveModeActive&&!o.immersive&&Y.zoomTracker.addEventListener("mousedown",u),(!Y.immersiveModeActive||o.immersive)&&g())}function g(){Y.zoomTracker.addEventListener("mousemove",L),Y.zoomTracker.addEventListener("touchstart",L),Y.zoomTracker.addEventListener("mouseleave",k),Y.zoomTracker.addEventListener("touchend",k),Y.zoomTracker.addEventListener("mousemove",z),Y.zoomTracker.addEventListener("touchmove",z)}function d(){Y.zoomTracker.removeEventListener("mousedown",u),Y.zoomTracker.removeEventListener("mousemove",L),Y.zoomTracker.removeEventListener("touchstart",L),Y.zoomTracker.removeEventListener("mouseleave",k),Y.zoomTracker.removeEventListener("touchend",k),Y.zoomTracker.removeEventListener("mousemove",z),Y.zoomTracker.removeEventListener("touchmove",z)}function p(){i.find("html").removeClass("wip-image-zoom-immersive-mode-enabled"),d(),Y.immersedEl.remove(),l()}function u(e){e.preventDefault(),e.stopPropagation(),o.$apply(function(){i.find("html").addClass("wip-image-zoom-immersive-mode-enabled");var e=i.find("body").eq(0);Y.immersedImageOpt=angular.extend(angular.copy(Y.options),Y.options.immersiveModeOptions),Y.immersedImageOpt.defaultIndex=o.selectedIndex,Y.immersedImageOpt.style="inner",Y.immersedEl=m('<div class="immersive-wip-image-zoom">\n    <div class="disable-immersive-mode-button" ng-click="vm.disableImmersiveMode()">&#10006;</div>\n    <img src="" wip-image-zoom="vm.immersedImageOpt" immersive="true" selected-index="selectedIndex">\n</div>\n')(o),e.append(Y.immersedEl),l()})}function v(){Y.images.length<=1||(Y.thumbsWrapperWidth=Y.thumbsWrapper.clientWidth,Y.thumbWidth=Math.round((Y.thumbsWrapperWidth+Y.options.thumbColPadding)/Y.options.thumbCol),Y.thumbsWidth=Y.thumbWidth*Y.images.length,Y.maxPosX=Y.images.length-Y.options.thumbCol,o.$evalAsync(function(){"top"==Y.options.thumbsPos?(Y.thumbsEl.style.paddingBottom=Y.options.thumbColPadding+"px",Y.thumbsEl.style.paddingTop=0):(Y.thumbsEl.style.paddingTop=Y.options.thumbColPadding+"px",Y.thumbsEl.style.paddingBottom=0);for(var e=0;e<Y.thumbsEl.children.length;e++){var o=Y.thumbsEl.children[e];o.style.width=Y.thumbWidth+"px",o.style.paddingRight=Y.options.thumbColPadding+"px"}}))}function c(){b(Y.thumbsPos+1)}function h(){b(Y.thumbsPos-1)}function b(e){e=0>e?0:e,e=e>Y.maxPosX?Y.maxPosX:e,Y.thumbsPos=e;var o=Y.thumbsPos*Y.thumbWidth*-1;Y.thumbsEl.style.transform="translate3d("+o+"px, 0px, 0)"}function f(){var e=Y.zoomTracker.getBoundingClientRect();O=e.width,j=e.height,D=e.left+t.scrollX,B=e.top+t.scrollY,"box"!=Y.options.style||o.immersive?(W=O,A=j,Y.zoomMaskEl.style.width="100%",Y.zoomMaskEl.style.height="100%"):(W=Y.options.boxW,A=Y.options.boxH,Y.zoomMaskEl.style.width=W+"px",Y.zoomMaskEl.style.height=A+"px"),Y.options.zoomLevel>1&&(Y.zoomImageEl.style.width=O*Y.options.zoomLevel+"px",Y.zoomImageEl.style.height=j*Y.options.zoomLevel+"px"),$=Y.zoomImageEl.offsetWidth,R=Y.zoomImageEl.offsetHeight,x()}function z(e){e.preventDefault();var o="touchmove"==e.type&&e.touches&&e.touches[0];P=o&&o.pageX||e.pageX,C=o&&o.pageY||e.pageY,y(),"lens"===Y.options.method?I():w()}function I(){var e=[($-W+1*X/N)*[H/O]],o=[(R-A+1*q/N)*[S/j]];Y.zoomImageEl.style.transform="translate3d("+-1*e+"px,"+-1*o+"px,0)"}function w(){var e=[($-W)*[(P-D)/O]],o=[(R-A)*[(C-B)/j]];e=D>P?0:e,o=B>C?0:o,e=P>D+O?$-W:e,o=C>B+j?R-A:o,Y.zoomImageEl.style.transform="translate3d("+-1*e+"px,"+-1*o+"px,0)"}function x(){N=O/$,X=W*N,q=A*N,Y.zoomLens.style.width=X+"px",Y.zoomLens.style.height=q+"px"}function y(){H=P-D-.5*X,S=C-B-.5*q,H=H>O-X?O-X:H,H=0>H?0:H,S=S>j-q?j-q:S,S=0>S?0:S,Y.zoomLens.style.transform="translate3d("+H+"px,"+S+"px,0)"}function T(){if(!(Y.images.length<=1)){var e=E(),o=Y.thumbsPos+Y.options.thumbCol>e&&Y.thumbsPos<e;return o?void b(Y.thumbsPos):void b(e)}}function E(){for(var e=0;e<Y.images.length;e++)if(Y.images[e].medium===Y.mainImage.medium)return e}function L(){o.$evalAsync(function(){Y.zoomActive=!0})}function k(){o.$evalAsync(function(){Y.zoomActive=!1})}function M(e){Y.largeImageLoading=!0,Y.mainImage=e,o.selectedModel=Y.mainImage,o.selectedIndex=Y.images.indexOf(Y.mainImage)}function Z(){Y.largeImageLoading=!1}var P,C,O,j,D,B,W,A,$,R,X,q,H,S,N,Y=this,F=angular.copy(n.defaults),G=!0;Y.el,Y.zoomTracker,Y.zoomLens,Y.zoomImageEl,Y.thumbsWrapper,Y.thumbsEl,Y.mainImage,Y.options,Y.images=[],Y.zoomActive=!1,Y.largeImageLoading=!0,Y.prevThumbActive=!1,Y.nextThumbActive=!1,Y.thumbWidth,Y.thumbsWrapperWidth,Y.thumbsWidth,Y.thumbsPos=0,Y.immersiveModeActive,Y.init=s,Y.initZoom=r,Y.initThumbs=v,Y.largeImageLoaded=Z,Y.updateMainImage=M,Y.nextThumb=c,Y.prevThumb=h,Y.disableImmersiveMode=p,o.$watch("selectedModel",function(e,o){angular.isDefined(e)&&e!==o&&(Y.mainImage=e,T())},!0),o.$watch("selectedIndex",function(e,o){angular.isDefined(e)&&e!==o&&(Y.mainImage=Y.images[e],T())},!0),angular.element(window).on("resize",function(){l()}),t.Ps&&angular.element(document).on("ps-scroll-y",function(){f()}),o.$watch(function(){return{left:Y.zoomTracker.getBoundingClientRect().left+t.scrollX,top:Y.zoomTracker.getBoundingClientRect().top+t.scrollY}},function(e,o){angular.isDefined(e)&&e!==o&&l()},!0),o.$watch("wipImageZoom",function(e,o){angular.isDefined(e)&&e!==o&&(s(),l())},!0)}]}}function wipImageZoomLensDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,i,t){t.zoomLens=o[0]}}}function wipImageZoomTrackerDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,i,t){t.zoomTracker=o[0]}}}function wipImageZoomMaskDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,i,t){t.zoomMaskEl=o[0]}}}function wipImageZoomImageDirective(){return{restrict:"EA",require:"^wipImageZoom",link:function(e,o,i,t){t.zoomImageEl=o[0]}}}function wipImageZoomThumbsDirective(){return{restrict:"EA",require:"^wipImageZoom",template:'<div class="thumbs-wrapper" ng-swipe-left="vm.nextThumb()" ng-swipe-right="vm.prevThumb()">\n    <div class="thumbs" >\n        <div class="thumb-wrapper" ng-repeat="image in vm.images">\n            <img ng-src="{{image.thumb}}" ng-click="vm.updateMainImage(image)"\n                 ng-class="{\'selected\': vm.mainImage.thumb === image.thumb}">\n        </div>\n    </div>\n</div>\n<div class="prev-button"\n     ng-if="vm.thumbsPos !== 0"\n     ng-click="vm.prevThumb()"\n     ng-bind-html="vm.options.prevThumbButton">Prev\n</div>\n<div class="next-button"\n     ng-if="vm.thumbsPos !== vm.maxPosX"\n     ng-click="vm.nextThumb()"\n     ng-bind-html="vm.options.nextThumbButton">Next\n</div>',link:function(e,o,i,t){t.thumbsWrapper=o[0].getElementsByClassName("thumbs-wrapper")[0],t.thumbsEl=o[0].getElementsByClassName("thumbs")[0],t.initThumbs()}}}function imageOnLoadDirective(e){return{restrict:"A",link:function(o,i,t){i[0].addEventListener("load",function(){o.$apply(t.imageOnLoad)},!1),i[0].addEventListener("error",function(){e.warn("image could not be loaded")})}}}imageOnLoadDirective.$inject=["$log"],wipImageZoomDirective.$inject=["$timeout"],angular.module("wipImageZoom",["ngSanitize","ngTouch"]).provider("wipImageZoomConfig",wipImageZoomConfig).directive("imageOnLoad",imageOnLoadDirective).directive("wipImageZoom",wipImageZoomDirective).directive("wipImageZoomTracker",wipImageZoomTrackerDirective).directive("wipImageZoomLens",wipImageZoomLensDirective).directive("wipImageZoomMask",wipImageZoomMaskDirective).directive("wipImageZoomImage",wipImageZoomImageDirective).directive("wipImageZoomThumbs",wipImageZoomThumbsDirective),function(){"use strict";function e(){var e=this;e.zoomOptions1={defaultImage:0,style:"box",boxPos:"right-top",boxW:400,boxH:400,method:"lens",cursor:"crosshair",lens:!0,zoomLevel:3,immersiveMode:"769",immersiveModeOptions:{},prevThumbButton:"&#9665;",nextThumbButton:"&#9655;",thumbsPos:"bottom",thumbCol:4,thumbColPadding:4,images:[{thumb:"assets/images/1-thumb.jpg",medium:"assets/images/1-medium.jpg",large:"assets/images/1-large.jpg"},{thumb:"assets/images/2-thumb.jpg",medium:"assets/images/2-medium.jpg",large:"assets/images/2-large.jpg"},{thumb:"assets/images/3-thumb.jpg",medium:"assets/images/3-medium.jpg",large:"assets/images/3-large.jpg"},{thumb:"assets/images/4-thumb.jpg",medium:"assets/images/4-medium.jpg",large:"assets/images/4-large.jpg"},{thumb:"assets/images/5-thumb.jpg",medium:"assets/images/5-medium.jpg",large:"assets/images/5-large.jpg"},{thumb:"assets/images/6-thumb.jpg",medium:"assets/images/6-medium.jpg",large:"assets/images/6-large.jpg"},{thumb:"assets/images/7-thumb.jpg",medium:"assets/images/7-medium.jpg",large:"assets/images/7-large.jpg"}]}}angular.module("wipImageZoom").controller("MainController",e)}(),function(){"use strict";angular.module("wipImageZoomDemo",["wipImageZoom"])}(),function(){"use strict";function e(){}angular.module("wipImageZoomDemo").run(e)}(),function(){"use strict";function e(e){e.setDefaults({})}e.$inject=["wipImageZoomConfigProvider"],angular.module("wipImageZoomDemo").config(e)}(),angular.module("wipImageZoom").run(["$templateCache",function(e){e.put("app/main/main.html",'<div class=container><h1 class=page-title>wip-image-zoom</h1><div class=demo-preview><img src=assets/images/1-medium.jpg wip-image-zoom=vm.zoomOptions1 selected-model=vm.selected selected-index=vm.selectedIndex></div><section><div class=demo-settings><button ng-repeat="image in vm.zoomOptions1.images" ng-click="vm.selected = image">Image {{$index +1 }}</button><div class=setting><label>Style:</label><select ng-model=vm.zoomOptions1.style><option value=box>Box</option><option value=inner>Inner</option></select></div><div class=setting><label>Box Style Position:</label><select ng-model=vm.zoomOptions1.boxPos><option value=right-top>Right Top</option><option value=right-middle>Right Middle</option><option value=right-bottom>Right Bottom</option><option value=left-top>Left Top</option><option value=left-middle>Left Middle</option><option value=left-bottom>Left Bottom</option><option value=bottom-left>Bottom Left</option><option value=bottom-center>Bottom Center</option><option value=bottom-right>Bottom Right</option><option value=top-left>Top Left</option><option value=top-center>Top Center</option><option value=top-right>Top Right</option></select></div><div class=setting><label>Box Width:</label><input ng-model=vm.zoomOptions1.boxW type=number step=1 min=0></div><div class=setting><label>Box Height:</label><input ng-model=vm.zoomOptions1.boxH type=number step=1 min=0></div><div class=setting><label>Method:</label><select ng-model=vm.zoomOptions1.method><option value=lens>Lens</option><option value=pointer>Pointer</option></select></div><div class=setting><label>Cursor:</label><select ng-model=vm.zoomOptions1.cursor><option value=default>Default</option><option value=pointer>Pointer</option><option value=crosshair>Crosshair</option><option value=move>Move</option><option value=zoom-in>Zoom in</option><option value=none>None</option></select></div><div class=setting><label>Show Lens:</label><input ng-model=vm.zoomOptions1.lens type=checkbox></div><div class=setting><label>Zoom Level:</label><input ng-model=vm.zoomOptions1.zoomLevel type=number step=.5 min=0></div><div class=setting><label>Immersive Mode:</label><input ng-model=vm.zoomOptions1.immersiveMode><div class=detail>false or 0 for disable, max width(px) for trigger</div></div><div class=setting><label>Thumbs Position:</label><select ng-model=vm.zoomOptions1.thumbsPos><option value=top>top</option><option value=bottom>bottom</option></select></div><div class=setting><label>Previous Thumb Button:</label><input ng-model=vm.zoomOptions1.prevThumbButton type=text></div><div class=setting><label>Next Thumb Button:</label><input ng-model=vm.zoomOptions1.nextThumbButton type=text></div><div class=setting><label>Thumb Column Count:</label><input ng-model=vm.zoomOptions1.thumbCol type=number step=1 min=1></div><div class=setting><label>Thumb Column Padding (px):</label><input ng-model=vm.zoomOptions1.thumbColPadding type=number step=1 min=0></div></div><div class=demo-json><h4>Options</h4><pre>{{vm.zoomOptions1 | json}}</pre><h4>Selected Model</h4><pre>{{vm.selected | json}}</pre><h4>SelectedIndex</h4><pre>{{vm.selectedIndex}}</pre></div></section></div>')}]);
//# sourceMappingURL=../maps/scripts/app.js.map
