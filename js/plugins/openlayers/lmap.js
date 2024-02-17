//v0.0.1
var LMap = {
	Map:function(target,mapImgUrl,extent,zoom){
		this._zoom = zoom||2;
		this._extent = extent;
		this._projection = new ol.proj.Projection({
			code : 'xkcd-image',
			units : 'pixels',
			extent : this._extent
		});
		this._imageLayer = new ol.layer.Image({
			source : new ol.source.ImageStatic({
				url : mapImgUrl,// 这里添加静态图片的地址
				projection : this._projection,
				imageExtent : this._extent
			})
		});
		var view = new ol.View({
			projection : this._projection,
			center : ol.extent.getCenter(this._extent),
			zoom : this._zoom,
			maxZoom : 5
		});
		var options = {
				layers : [this._imageLayer],
				target : target,
				view : view
		};
		ol.Map.call(this,options);
		//定义一个容器
		this._vectorLayer = new ol.layer.Vector({
			style:null,
			source : new ol.source.Vector({
				wrapX : false
			})
		});
		this.addLayer(this._vectorLayer);
		//定义一个绘画容器
		this._drawVectorLayer = new ol.layer.Vector({
			source : new ol.source.Vector()
		});
		this.addLayer(this._drawVectorLayer);
		//扩展方法
		this.addOverlayMarker = function(marker) {
			var source = this._vectorLayer.getSource();
			source.addFeature(marker);
		};
		this.openDraw = function(type,icon,name) {
			this._drawVectorLayer.getSource().clear();
			var _name = name||'标记点'
			var style = createLabelStyle(new ol.Feature({name:_name}));
			if(icon){
				style.setImage(icon);
			}
			var draw = new ol.interaction.Draw({
				source : this._drawVectorLayer.getSource(),
				type : type,
				style :style
			});
			this.addInteraction(draw);
			var modify = new ol.interaction.Modify({source: this._drawVectorLayer.getSource()});
			this.addInteraction(modify);
			draw._modify = modify;
			return draw;
		}
		this.closeDraw = function(draw) {
			this.removeInteraction(draw);
		}
		// 打开可移动
		this.openTranslate = function() {
			var select = new ol.interaction.Select();
			var translate = new ol.interaction.Translate({
				features : select.getFeatures()
			});
			this.addInteraction(select);
			this.addInteraction(translate);
			return translate;
		}
		//关闭移动
		this.closeTranslate = function(translate) {
			this.removeInteraction(translate);
		}
		//popup
		this._isOpenPopup = false;
		this.openPopup = function(){
			
			
			
			var popup = $('<div id="popup" class="ol-popup"><a href="#" id="popup-closer" class="ol-popup-closer"></a><div id="popup-content"></div></div>');
			$("body").append(popup);
			var container = $("#popup");
			var closer = $("#popup-closer");
			var content = $("#popup-content");
			var overlay = new ol.Overlay({
				element : container[0],
				autoPan : true,
				offset: [0, -50],
				autoPanAnimation : {
					duration : 250
				}
			});
			closer.click(function() {
				overlay.setPosition(undefined);
				closer.blur();
				return false;
			});
			 this._popupOverlay = overlay;
			 this.addOverlay(overlay);
			 this.on('click', function(evt) {
			 var feature = this.forEachFeatureAtPixel(evt.pixel, function(feature) {
				 return feature;
			 });
			 if (feature) {
				 var info = feature._popupInfo;
				 if(info == null){
					 console.log('没有内容');
					 return;
				 }
				  try{
					  if(showInfoWindow(feature) == "1"){return;}
					  }catch(e){}
				 var coordinates = feature.getGeometry().getCoordinates();
				 content.html(info);
				 overlay.setPosition(coordinates);
			 }else{
				 overlay.setPosition(undefined);
			 }
			});
		}
		//更换图层
		this.updateMapImg = function(mapImgUrl,exent){
			sucessImage = 1;
			var _source = this._imageLayer.getSource();
			var _newsource = new ol.source.ImageStatic({
				url : mapImgUrl,// 这里添加静态图片的地址
				projection : this._projection,
				imageExtent : exent||this._extent
			})
			 this._imageLayer.setSource(_newsource);
			_newsource.on('imageloadend', function(){
				layer.close(m_index);     
			});
			
			_newsource.on('imageloadstart', function() {
				 m_index = layer.load(1);
		     });
		      
		}
		//关闭打开的popup
		this.closeOpenedPopup = function(){
			if(this._popupOverlay.getPosition()){
				this._popupOverlay.setPosition(undefined);
			}
		}
	},
	Marker:function(point,options){
		this._popupInfo = null;
		this._point = point;
		this._icon = options.icon||new ol.style.Icon(createDefultIconOptions());
		this._lable = options.lable||null;
		this._name = options.name||'';
		var styleOptions = {};
		if(this._name!=''){
			this._lable = new LMap.Lable(this._name);
		}
		if(this._icon){
			styleOptions.image = this._icon;
		}
		if(this._lable){
			styleOptions.text = this._lable;
		}
		var options = {
		  geometry : this._point,
		  name : this._name,
		}
		ol.Feature.call(this,options);
		this.setStyle(new ol.style.Style(styleOptions));
		this.setLable = function(lable){
			this._lable = lable;
		}
		//添加popup信息
		this.addPopupInfo = function(html){
			this._popupInfo = html;
		}
		//隐藏
		this.hide = function(){
			//保存属性以便恢复
			this._lastStyle = this.getStyle();
			this.setStyle(null);
		}
		//显示
		this.show = function(){
			this.setStyle(this._lastStyle);
		}
		//隐藏lable
		this.hideLable = function(){
			var style = this.getStyle();
			if(!style){return;}
			style.setText(null);
			this.setStyle(style);
		}
		//显示lable
		this.showLable = function(){
			var style = this.getStyle();
			if(!style){return;}
			style.setText(this._lable);
			this.setStyle(style);
		}
		//定位和打开popup
		this.showAndOpenPopup =function(pmap){
			var smap = pmap||map;
			//定位
			//打开
			var info = this._popupInfo;
			if(info == null){
				console.log('没有内容');
				return;
			}
			var coordinates = this.getGeometry().getCoordinates();
			var content = $("#popup-content");
			content.html(info);
			smap.getView().animate({center:coordinates});
			smap._popupOverlay.setPosition(coordinates);
			
			
		}
		//设置icon
		this.setIcon = function(icon){
			var style = this.getStyle();
			this._icon = icon;
			style.setImage(icon);
			this.setStyle(style);
		}
	},
	Point:function(lng,lat){
		this._lng =lng;//经度
		this._lat = lat;//纬度
		ol.geom.Point.call(this,[this._lng,this._lat]);
	},
	Lable:function(name,options){
		var options = options||{};
		var lableOptions = createDefultLableOptions();
		//设置文本
		lableOptions.text = name;
		//设置偏移量
		if(options.offset){
			lableOptions.offsetX = options.offset[0]?options.offset[0]:0;
			lableOptions.offsetY = options.offset[1]?options.offset[1]:0;
		}
		//设置默认值
		ol.style.Text.call(this,lableOptions);
	},
	Icon:function(imgUrl){
		var iconOptions = createDefultIconOptions();
		iconOptions.src = imgUrl;
		this._iconOptions = iconOptions;
		ol.style.Icon.call(this,this._iconOptions);
	}
}
//继承实现
ol.inherits(LMap.Map, ol.Map);
ol.inherits(LMap.Point, ol.geom.Point);
ol.inherits(LMap.Marker, ol.Feature);
ol.inherits(LMap.Icon, ol.style.Icon);
ol.inherits(LMap.Lable, ol.style.Text);
var createDefultLableOptions = function(){
	return {
		// 对齐方式
		textAlign : 'center',
		// 文本基线
		textBaseline : 'middle',
		// 字体样式
		font : 'normal 14px 微软雅黑',
		// 文本内容
		text : '',
		// 填充样式
		fill : new ol.style.Fill({
			color : '#aa3300'
		}),
		// 笔触
		stroke : new ol.style.Stroke({
			color : '#ffcc33',
			width : 2
		})
	};
}
var createDefultIconOptions = function(){
	return {
		// 控制标注图片和文字之间的距离
		anchor : [ 0.5, 60 ],
		// 标注样式的起点位置
		anchorOrigin : 'top-right',
		// X方向单位：分数
		anchorXUnits : 'fraction',
		// Y方向单位：像素
		anchorYUnits : 'pixels',
		// 偏移起点位置的方向
		offsetOrigin : 'top-right',
		// 透明度
		opacity : 0.75,
		// 图片路径
		src : '../img/dot1.png'
	};
}
//创建标签的样式
var createLabelStyle = function(feature) {
	// 返回一个样式
	return new ol.style.Style({
		// 把点的样式换成ICON图标
		image : new ol.style.Icon({
			// 控制标注图片和文字之间的距离
			anchor : [ 0.5, 60 ],
			// 标注样式的起点位置
			anchorOrigin : 'top-right',
			// X方向单位：分数
			anchorXUnits : 'fraction',
			// Y方向单位：像素
			anchorYUnits : 'pixels',
			// 偏移起点位置的方向
			offsetOrigin : 'top-right',
			// 透明度
			opacity : 0.75,
			// 图片路径
			src : '../img/dot1.png'
		}),
		// 文本样式
		text : new ol.style.Text({
			// 对齐方式
			textAlign : 'center',
			// 文本基线
			textBaseline : 'middle',
			// 字体样式
			font : 'normal 14px 微软雅黑',
			// 文本内容
			text : feature.get('name'),
			// 填充样式
			fill : new ol.style.Fill({
				color : '#aa3300'
			}),
			// 笔触
			stroke : new ol.style.Stroke({
				color : '#ffcc33',
				width : 2
			})
		})
	});
};
/**
 * 0未使用
 * 1.正在加载
 * 2.图片加载成功
 */
var Imagesucess =0;
var m_index ;
