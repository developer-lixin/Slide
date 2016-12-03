function getId(name){
	return document.getElementById(name);
}
function getTag(parent,tag){
	return parent.getElementsByTagName(tag);
}
function getClass(parent,name){
	return parent.getElementsByTagName(name);
}
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
/* 当css的参数个数小于3，是获取 否则是 设置 */ // 选项卡切换  改变的是透明度
function css(el,attr,val) { // 设置函数 css(属性名，样式名，值)
	if(arguments.length < 3) { // 如果 arguments 的长度小于3
		var val  = 0; // 定义变量 并赋值
		if(el.currentStyle) { // 如果 是ie下的获取计算后样式
			val = el.currentStyle[attr]; // 给变量赋值为 ie下的获取计算后样式
		} else {
			val = getComputedStyle(el)[attr]; // 否则 变量值为 正常浏览器下的 获取计算后样式
		}
		if(attr == "opacity") { // 如果 样式名等于 opacity 就使值 乘以100 （因为可能是小数）
			val*=100;
		}
		return parseFloat(val);  // 因为val 的值是字符串 所以要转换为数字
	}
	if(attr == "opacity") { // 如果 样式名 等于 opacity
		el.style.opacity = val/100; // 正常浏览器下的 opacity 为0-1 所以要除以100
		el.style.filter = "alpha(opacity = "+val+")"; // ie 下的opacity为0-100 所以直接写
	} else {
		el.style[attr] = val + "px"; //如果 样式名 不等于 opacity  就让结果加上单位 （例如： attr = left）
	}
}
function mTween(el,attr,target,time,type) { //设置mTween 函数（属性名，样式名， 目标，时间， 类型）
	var t = 0;
	var b = css(el,attr); // 因为上面转化为数字了，所以可以直接用css
	var c = target - b; // 差值 = 目标点  - 初始值
	var d = time/20; //次数 = 总时间 / 每次的时间
	clearInterval(el.timer); // 关闭定时器
	el.timer = setInterval(function(){ // el.timer  加上属性名就可以让定时器根据我们的操作，选择相应的属性名的定时器进行关闭  定义间隔定时器
		t++; // 执行次数加加
		if(t > d) { // 如果执行次数大于总次数
			clearInterval(el.timer); // 关闭定时器
		} else {
			var val = Tween[type](t,b,c,d); // 定义一个变量 并给它 赋值 为Tween 函数的值
			css(el,attr,val); // 调用css 函数,并把 css 中的值 改为我们设置的值（css 里的第三个值是需要设置的）
		}
	},20);
}