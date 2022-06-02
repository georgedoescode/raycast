class t{constructor(t=0,r=0,i=0){this.x=t,this.y=r,this.z=i}static add(t,r){return t.copy().add(r.copy())}static rem(t,r){return t.copy().rem(r.copy())}static sub(t,r){return t.copy().sub(r.copy())}static mult(t,r){return t.copy().mult(r.copy())}static div(t,r){return t.copy().div(r.copy())}static dot(t,r){return t.copy().dot(r.copy())}static dist(t,r){return t.copy().dist(r.copy())}static lerp(t,r,i){return t.copy().lerp(r.copy().x,r.copy().y,i)}static rotate(t,r){return t.copy().rotate(r)}static angle(t,r){return Math.atan2(r.copy().y-t.copy().y,r.copy().x-t.copy().x)}static fromAngle(r,i=1){return new t(i*Math.cos(r),i*Math.sin(r),0)}set(t,r){const i=this._formatArgs(t,r);return this.x=i.x,this.y=i.y,this}copy(){return new t(this.x,this.y)}toArray(){return[this.x,this.y]}toObject(){return{x:this.x,y:this.y}}add(t,r){const i=this._formatArgs(t,r);return this.x+=i.x,this.y+=i.y,this}rem(t,r){const i=this._formatArgs(t,r);return this.x=this.x%i.x,this.y=this.y%i.y,this}sub(t,r){const i=this._formatArgs(t,r);return this.x-=i.x,this.y-=i.y,this}mult(t,r){const i=this._formatArgs(t,r);return this.x*=i.x,this.y*=i.y,this}div(t,r){const i=this._formatArgs(t,r);return this.x/=i.x,this.y/=i.y,this}mag(){return Math.sqrt(this.magSq())}magSq(){const t=this.x,r=this.y;return t*t+r*r}dot(t,r){const i=this._formatArgs(t,r);return this.x*i.x+this.y*i.y}dist(t){return t.copy().sub(this).mag()}normalize(){const t=this.mag();return 0!==t&&this.mult(1/t),this}limit(t){const r=this.magSq();return r>t*t&&this.div(Math.sqrt(r)).mult(t),this}setMag(t){return this.normalize().mult(t)}heading(){return Math.atan2(this.y,this.x)}rotate(t){let r=this.heading()+t;const i=this.mag();return this.x=Math.cos(r)*i,this.y=Math.sin(r)*i,this}lerp(t,r,i){return this.x+=(t-this.x)*i,this.y+=(r-this.y)*i,this}cross(r){return new t(this.y*r.z-this.z*r.y,this.z*r.x-this.x*r.z,this.x*r.y-this.y*r.x)}_formatArgs(r,i){return r.x&&r.y?new t(r.x,r.y):(i||(i=r),new t(r,i))}}function r(r,i){return new t(r,i)}var i=function(t,i,s,n){this.a=r(t,i),this.b=r(s,n)},s=/*#__PURE__*/function(){function i(r,i){this.position=r,this.dir=t.fromAngle(i)}return i.prototype.cast=function(t){var i=t.a.x,s=t.a.y,n=t.b.x,o=t.b.y,e=this.position.x,a=this.position.y,h=this.position.x+this.dir.x,u=this.position.y+this.dir.y,y=(i-n)*(a-u)-(s-o)*(e-h);if(0===y)return null;var c=((i-e)*(a-u)-(s-a)*(e-h))/y;return c>0&&c<1&&-((i-n)*(s-a)-(s-o)*(i-e))/y>0?r(i+c*(n-i),s+c*(o-s)):null},i}();function n(t,r){return new s(t,r)}function o(t,r){(null==r||r>t.length)&&(r=t.length);for(var i=0,s=new Array(r);i<r;i++)s[i]=t[i];return s}function e(t,r){var i="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(i)return(i=i.call(t)).next.bind(i);if(Array.isArray(t)||(i=function(t,r){if(t){if("string"==typeof t)return o(t,r);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?o(t,r):void 0}}(t))||r&&t&&"number"==typeof t.length){i&&(t=i);var s=0;return function(){return s>=t.length?{done:!0}:{done:!1,value:t[s++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a=/*#__PURE__*/function(){function i(t,i,s){void 0===s&&(s=32),this.position=new r(t,i),this.rays=[];for(var o=0;o<359.9;o+=360/s)this.rays.push(n(this.position,o*(Math.PI/180)))}var s=i.prototype;return s.updatePosition=function(t,r){this.position.set(t,r)},s.emit=function(r){for(var i,s=[],n=e(this.rays);!(i=n()).done;){for(var o,a=i.value,h=null,u=Infinity,y=e(r);!(o=y()).done;){var c=a.cast(o.value);if(c){var p=t.dist(this.position,c);p<u&&(u=p,h=c)}}h&&s.push({x:h.x,y:h.y})}return s},i}();exports.createBoundary=function(t,r,s,n){return new i(t,r,s,n)},exports.createEmitter=function(t,r,i){return new a(t,r,i)},exports.createRay=n;
//# sourceMappingURL=raycast.cjs.map
