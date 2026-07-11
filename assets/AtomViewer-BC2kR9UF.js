import{r as e}from"./rolldown-runtime-S-ySWqyJ.js";import{i as t,r as n}from"./framework-DjPHiq1u.js";var r=e(t(),1),i=n(),a=`#version 300 es
in vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }`,o=`#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 res;
uniform float time;
uniform vec2 orbit;
uniform float zoom;

mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float sdSphere(vec3 p,float r){return length(p)-r;}
float sdBox(vec3 p,vec3 b){vec3 q=abs(p)-b;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.);}
float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}

vec2 scene(vec3 p){
  vec2 hit=vec2(p.y+1.35,1.);
  vec3 q=p;
  q.xz*=rot(orbit.x+time*.12);
  q.yz*=rot(orbit.y*.42);
  float s=sdSphere(q-vec3(-1.05,.05,0.),.72);
  if(s<hit.x)hit=vec2(s,2.);
  vec3 bp=q-vec3(.75,.08,0.); bp.xy*=rot(.55); bp.xz*=rot(.4);
  float b=sdBox(bp,vec3(.58)); if(b<hit.x)hit=vec2(b,3.);
  float t=sdTorus(q-vec3(0.,.18,.15),vec2(1.62,.12)); if(t<hit.x)hit=vec2(t,4.);
  return hit;
}
vec3 normal(vec3 p){vec2 e=vec2(.002,0);return normalize(vec3(scene(p+e.xyy).x-scene(p-e.xyy).x,scene(p+e.yxy).x-scene(p-e.yxy).x,scene(p+e.yyx).x-scene(p-e.yyx).x));}
float shadow(vec3 ro,vec3 rd){float r=1.,t=.03;for(int i=0;i<48;i++){float h=scene(ro+rd*t).x;r=min(r,16.*h/t);t+=clamp(h,.02,.18);if(h<.001||t>12.)break;}return clamp(r,0.,1.);}
float march(vec3 ro,vec3 rd,out float mat){float t=0.;mat=0.;for(int i=0;i<110;i++){vec2 h=scene(ro+rd*t);if(h.x<.001){mat=h.y;break;}t+=h.x;if(t>18.)break;}return t;}
vec3 palette(float m){if(m<1.5)return vec3(.12,.14,.16);if(m<2.5)return vec3(.70,.96,.18);if(m<3.5)return vec3(.12,.38,.92);return vec3(.95,.32,.12);}
vec3 shade(vec3 ro,vec3 rd,float t,float mat){
  vec3 p=ro+rd*t,n=normal(p),light=vec3(-3.,5.,4.),ld=normalize(light-p);
  float dif=max(dot(n,ld),0.)*shadow(p+n*.01,ld);
  float fres=pow(1.-max(dot(n,-rd),0.),5.);
  vec3 base=palette(mat),col=base*(.10+dif*.85);
  if(mat==1.){
    vec2 cell=abs(fract(p.xz*.5)-.5)/fwidth(p.xz*.5);
    float grid=1.-min(min(cell.x,cell.y),1.);
    float rings=.5+.5*cos(length(p.xz)*8.);
    col+=vec3(.38,.62,.12)*grid*.24+vec3(.12,.18,.08)*pow(rings,18.);
  }
  vec3 h=normalize(ld-rd);float spec=pow(max(dot(n,h),0.),mat==2.?80.:28.)*shadow(p+n*.01,ld);
  col+=spec*vec3(1.,.92,.78)*1.8+fres*.35;
  if(mat==1.){vec3 rr=reflect(rd,n);float rm;float rt=march(p+n*.015,rr,rm);if(rt<18.)col=mix(col,palette(rm)*(.18+max(dot(normal(p+rr*rt),ld),0.)*.45),.28);}
  if(mat==4.)col+=base*.7;
  return col;
}
void main(){
  vec2 uv=(gl_FragCoord.xy*2.-res)/res.y;
  vec3 ro=vec3(0.,.45,5.2/zoom),ta=vec3(0.,-.05,0.);
  vec3 f=normalize(ta-ro),r=normalize(cross(f,vec3(0,1,0))),u=cross(r,f);
  vec3 rd=normalize(f+uv.x*r+uv.y*u);
  float mat,t=march(ro,rd,mat);
  vec3 col=mix(vec3(.018,.022,.028),vec3(.075,.09,.105),max(rd.y,0.));
  if(t<18.)col=shade(ro,rd,t,mat);
  float glow=.018/(abs(length(uv-vec2(.52,.30))-.055)+.012);col+=vec3(.65,.95,.18)*glow*.055;
  col=col/(col+vec3(1.));col=pow(col,vec3(.4545));
  float vign=1.-dot(uv*.28,uv*.28);outColor=vec4(col*vign,1.);
}`;function s(){let e=(0,r.useRef)(null),t=(0,r.useRef)({x:.2,y:-.16}),n=(0,r.useRef)(1),s=(0,r.useRef)(null),[c,l]=(0,r.useState)(`RAYMARCHING LIVE`);return(0,r.useEffect)(()=>{let r=e.current,i=r.getContext(`webgl2`,{antialias:!1});if(!i){l(`WEBGL 2 REQUIRED`);return}let s=(e,t)=>{let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n},c=i.createProgram();i.attachShader(c,s(i.VERTEX_SHADER,a)),i.attachShader(c,s(i.FRAGMENT_SHADER,o)),i.linkProgram(c),i.useProgram(c);let u=i.createBuffer();i.bindBuffer(i.ARRAY_BUFFER,u),i.bufferData(i.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),i.STATIC_DRAW);let d=i.getAttribLocation(c,`p`);i.enableVertexAttribArray(d),i.vertexAttribPointer(d,2,i.FLOAT,!1,0,0);let f=i.getUniformLocation(c,`res`),p=i.getUniformLocation(c,`time`),m=i.getUniformLocation(c,`orbit`),h=i.getUniformLocation(c,`zoom`),g=0,_=performance.now(),v=()=>{let e=Math.min(devicePixelRatio,1.5),a=r.getBoundingClientRect(),o=Math.floor(a.width*e),s=Math.floor(a.height*e);(r.width!==o||r.height!==s)&&(r.width=o,r.height=s,i.viewport(0,0,o,s)),i.uniform2f(f,o,s),i.uniform1f(p,(performance.now()-_)/1e3),i.uniform2f(m,t.current.x,t.current.y),i.uniform1f(h,n.current),i.drawArrays(i.TRIANGLES,0,3),g=requestAnimationFrame(v)};return v(),()=>cancelAnimationFrame(g)},[]),(0,i.jsxs)(`div`,{className:`viewer cinematic`,children:[(0,i.jsx)(`canvas`,{ref:e,"aria-label":`Interactive Atom 3D Engine raymarched scene with reflections and soft shadows`,onPointerDown:e=>{s.current={x:e.clientX,y:e.clientY},e.currentTarget.setPointerCapture(e.pointerId),l(`ORBITING SCENE`)},onPointerMove:e=>{s.current&&=(t.current.x+=(e.clientX-s.current.x)*.008,t.current.y=Math.max(-.72,Math.min(.72,t.current.y+(e.clientY-s.current.y)*.006)),{x:e.clientX,y:e.clientY})},onPointerUp:()=>{s.current=null,l(`RAYMARCHING LIVE`)},onWheel:e=>{e.preventDefault(),n.current=Math.max(.72,Math.min(1.45,n.current-e.deltaY*.001))}}),(0,i.jsxs)(`div`,{className:`viewerTop`,children:[(0,i.jsxs)(`span`,{children:[(0,i.jsx)(`i`,{}),` `,c]}),(0,i.jsx)(`span`,{children:`ATOM 3D ENGINE / SDF FIELD`})]}),(0,i.jsxs)(`div`,{className:`viewerBottom`,children:[(0,i.jsx)(`span`,{children:`DRAG — ORBIT`}),(0,i.jsx)(`span`,{children:`REFLECTIONS · SOFT SHADOWS · PBR`}),(0,i.jsx)(`span`,{children:`SCROLL — ZOOM`})]})]})}export{s as AtomViewer};