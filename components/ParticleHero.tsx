'use client';
import {useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import * as THREE from 'three';
import ConversionActions from './site/ConversionActions';
const vertex=`attribute float eventWeight;attribute vec3 eventPosition;attribute vec3 eventNormal;uniform float morph;uniform float burst;attribute float seed;attribute float kind;attribute vec3 shadeNormal;uniform float time;uniform float progress;varying vec3 tint;varying float alpha;
vec3 fabric(float x,float v,float layer){
 // Four overlapping sheets share the same amplitude and contact plane.
 float family=mod(layer,2.);
 float phase=time*.26+floor(layer*.5)*.62;
 float fold=sin(x*.73+v*2.5-phase);
 float leftWave=1.-smoothstep(-2.8,-.4,x);
 float y=-.64-.15*x+(.25+.16*leftWave)*fold+.10*sin(x*1.35-v*3.+phase);
 y+=.12*sin(v*6.283+x*.5+phase)*sin(v*3.14159);
 if(family>.5)y=-.95+.060*x*x+.12*sin(x*.8+v*2.-phase)+v*.13;
 if(family<.5)y+=.40*(1.-smoothstep(-3.2,-1.,x));
 float z=(v-.5)*(2.4+1.2*leftWave)+.20+layer*.13;
 // Flatten the landscape near the physical foot plane of the CAD, then
 // recover the free wave gradually outside its footprint.
 float contact=exp(-pow((x-1.05)/.78,2.)-pow(z/.85,2.));
 y=mix(y-layer*.045,-.985+.012*sin(x*8.+z*6.-phase),contact);
 return vec3(x,y,z);
}
void main(){
 float s=seed;vec3 target=position;
 float p=smoothstep(s*.18,.80+s*.18,progress);
 vec3 stream=fabric((fract(s*71.31)*2.-1.)*4.,fract(s*173.31),0.);
 vec3 pos=mix(stream,target,p);
 float light=max(0.,dot(normalize(shadeNormal),normalize(vec3(-.65,.8,1.))));
 float rim=pow(1.-abs(dot(normalize(shadeNormal),normalize(vec3(-.2,.05,1.)))),3.);
 float pink=smoothstep(1.12,1.65,target.x)*.38;
 alpha=.025+light*.12+rim*.12;
 if(kind>.5&&kind<1.5){
  // Dissolve before the silhouette's sampled boundary. Independent phases
  // carry the lower particles into the moving cloth and back, without resets.
  float edge=-.44-.24*clamp((target.x+1.45)/1.42,0.,1.);
  float lower=1.-smoothstep(edge+.02,edge+.48,target.y);
  float phase=fract(sin(s*9271.7)*43758.5453)*6.283185;
  float breath=.5-.5*cos(time*.48+phase);
  float travel=lower*(.18+.82*breath);
  float drift=sin(phase*7.3)*.46;
  vec3 destination=fabric(target.x+drift,fract(s*137.3),0.);
  destination.y-=.06+.13*fract(s*41.7);
  vec3 living=mix(target,destination,travel);
  living.x+=sin(time*.55+phase)*.10*lower*sin(travel*3.14159);
  living.y+=cos(time*.43+phase*2.)*.08*lower;
  living.z+=sin(time*.37+phase)*.14*lower;
  pos=mix(stream,living,p);
  float boundary=smoothstep(edge-.04,edge+.18,target.y);
  alpha=shadeNormal.x*.68*mix(1.,.34,travel)*mix(boundary,1.,smoothstep(.12,.55,travel));
  alpha*=.88+.12*sin(target.y*17.+target.x*11.+phase);
  pink=.025+travel*.18;
 }
 if(kind>2.5&&kind<3.5)alpha=.12;
 if(kind<.5||(kind>2.5&&kind<3.5)){
  // Most of the CAD outline remains anchored. A sparse population leaves
  // the upper-right corner and returns along a soft, looping flow.
  float h=fract(sin(s*13731.3)*43758.5453);
  float corner=smoothstep(.3,1.,target.y)*smoothstep(.95,1.48,target.x);
  float excursion=pow(.5-.5*cos(time*.42+h*92.),2.);
  float release=corner*step(.90,h)*excursion;
  vec3 drift=vec3(.48+.22*sin(time*.22+h*31.),.17+.14*sin(time*.38+h*17.),.18*cos(time*.31+h*11.));
  pos+=drift*release*p;
  alpha*=1.-release*.64;
  pink=max(pink,release*.48);
 }
 if(kind>1.5&&kind<2.5){
  float v=position.y;float layer=min(3.,floor(position.z*4.));
  pos=fabric(position.x,v,layer);
  float crease=pow(max(0.,1.-abs(v-.47)*12.),3.);
  float localEnergy=exp(-pow((position.x-1.3)/1.3,2.));
  pink=.12+crease*.28+localEnergy*.08;
  alpha=(.12+.19*pow(abs(sin(v*4.+position.x*.35+layer*.4)),6.)+crease*.13)*(1.-smoothstep(2.8,4.,abs(position.x)));
  alpha*=.72+.28*sin(position.x*5.+v*13.+time*.12)*sin(position.x*5.+v*13.+time*.12);
  // Quiet contact region gives the cabinet visual weight without a halo.
  alpha*=1.-.60*exp(-pow((pos.x-1.05)/.48,2.)-pow(pos.z/.40,2.));
  alpha*=mod(layer,2.)>.5?smoothstep(-3.6,-1.8,position.x):1.;
  float leftPresence=1.-smoothstep(-2.5,-.3,position.x);
  alpha*=1.+leftPresence*1.5;
  pink+=leftPresence*.12;
  p=1.;
 }
 if(kind>3.5&&kind<4.5){
  float phase=fract(sin(s*6731.3)*43758.5453)*6.283185;
  float tide=.5-.5*cos(time*.36+phase);
  vec3 anchor=shadeNormal;
  vec3 plume=mix(anchor,target,.12+.88*tide);
  plume.y+=sin(time*.45+phase*3.)*.13*sin(tide*3.14159);
  plume.z+=cos(time*.32+phase)*.16*tide;
  plume.x+=sin(time*.24+phase*2.)*.10*tide;
  pos=mix(stream,plume,p);
  pink=.44*(1.-.6*tide);
  alpha=(.055+.12*fract(s*73.31))*pow(1.-.8*tide,2.);
 }
 if(kind>4.5){
  // A loose skirt of particles follows the actual rotated base footprint.
  pos=mix(stream,target,p);
  pos.y+=.009*sin(time*.36+s*53.);
  pos.x+=.012*sin(time*.28+s*91.);
  pink=.08+.12*smoothstep(1.,1.7,target.x);
  alpha=.10+.09*fract(s*37.);
 }
 // Morph only the cabinet surface/edge population; all other points retain
 // their existing animation. Scatter vanishes at both settled endpoints.
 if(kind<.5||(kind>2.5&&kind<3.5)){
  vec3 destination=mix(target,eventPosition,morph);
  float h=fract(sin(s*9831.7)*43758.5453);
  vec3 scatter=vec3(sin(h*63.),cos(h*41.),sin(h*97.))*(.14+.48*h);
  scatter.x+=.10*sin(time*.8+h*31.);
  vec3 idleOffset=(pos-mix(stream,target,p))*(1.-morph);
  pos=mix(stream,destination,p)+idleOffset+scatter*burst*p;
  vec3 normal=normalize(mix(shadeNormal,eventNormal,morph)+vec3(.00001));
  if(kind<.5){float illumination=max(0.,dot(normal,normalize(vec3(-.65,.8,1.))));
   float silhouette=pow(1.-abs(dot(normal,normalize(vec3(-.2,.05,1.)))),3.);
   alpha=.085+illumination*.32+silhouette*.19;}
  // Break CAD edge chains into sparse accents. Surface grains carry the
  // shape, matching the photographic point texture used for the people.
  float grain=fract(sin(s*71237.3)*43758.5453);
  if(kind>2.5){alpha*=step(.68,grain)*(.55+.45*grain);}
  else{alpha*=step(.13,grain)*(.65+.55*grain);}
  vec3 fuzz=vec3(sin(s*7139.),cos(s*9127.),sin(s*5171.))*.0045;
  pos+=fuzz*p;
  pink+=burst*.18;
  alpha*=(1.-burst*.25)*mix(1.,eventWeight,morph);
 }
 if(kind>3.5)alpha*=1.-morph*.85;
 tint=mix(vec3(.94,.97,1.),vec3(1.,.12,.47),pink);
 alpha=clamp(alpha*mix(.18,1.,p)*1.65,0.,.92);
 vec4 mv=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mv;
 float dotSize=(kind<.5||(kind>2.5&&kind<3.5))?4.7:(kind>1.5&&kind<2.5?3.6:3.5);
 gl_PointSize=clamp(dotSize/(-mv.z)*2.,.75,3.0);
}`;
const fragment=`varying vec3 tint;varying float alpha;void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;gl_FragColor=vec4(tint,alpha*(1.-smoothstep(.05,.5,d)));}`;
function Cloud({points,eventPoints,still}:{points:number[];eventPoints:number[];still:boolean}){
 // Wide canvases span the whole hero, so the scene drops below the copy; on phones the canvas
 // already starts under the copy, so it stays centred and only shrinks when the view is narrow.
 const aspect=useThree(st=>st.size.width/Math.max(1,st.size.height)),wide=aspect>1.3,fit=Math.min(1,Math.max(.5,aspect*.95));
 const mat=useRef<THREE.ShaderMaterial>(null),elapsed=useRef(0);
 const g=useMemo(()=>{
  const count=points.length/7,p=new Float32Array(count*3),n=new Float32Array(count*3),ep=new Float32Array(count*3),en=new Float32Array(count*3),weights=new Float32Array(count),k=new Float32Array(count),seeds=new Float32Array(count);
  const pools=[[],[]] as number[][];
  for(let i=0;i<eventPoints.length;i+=7)pools[eventPoints[i+6]===3?1:0].push(i);
  if(!pools[0].length||!pools[1].length)throw Error('Event booth particle geometry is incomplete');
  // Sort each CAD surface vertically to avoid a random particle assignment.
  for(const pool of pools)pool.sort((a,b)=>eventPoints[a+1]-eventPoints[b+1]||eventPoints[a]-eventPoints[b]);
  const sourcePools=[[],[]] as number[][];
  for(let i=0;i<count;i++)if(points[i*7+6]===0||points[i*7+6]===3)sourcePools[points[i*7+6]===3?1:0].push(i);
  const mapping=new Map<number,number>();
  sourcePools.forEach((pool,index)=>{pool.sort((a,b)=>points[a*7+1]-points[b*7+1]||points[a*7]-points[b*7]);pool.forEach((i,rank)=>mapping.set(i,pools[index][Math.min(pools[index].length-1,Math.floor(rank/pool.length*pools[index].length))]));});
  for(let i=0;i<count;i++){const target=mapping.get(i);for(let j=0;j<3;j++){p[i*3+j]=points[i*7+j];n[i*3+j]=points[i*7+3+j];ep[i*3+j]=target===undefined?p[i*3+j]:eventPoints[target+j];en[i*3+j]=target===undefined?n[i*3+j]:eventPoints[target+3+j];}k[i]=points[i*7+6];const poolIndex=k[i]===3?1:0;weights[i]=target===undefined?1:Math.min(1,pools[poolIndex].length/sourcePools[poolIndex].length);seeds[i]=((Math.imul(i+1,1664525)+1013904223)>>>0)/4294967296;}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(p,3));geo.setAttribute('shadeNormal',new THREE.BufferAttribute(n,3));geo.setAttribute('eventWeight',new THREE.BufferAttribute(weights,1));geo.setAttribute('eventPosition',new THREE.BufferAttribute(ep,3));geo.setAttribute('eventNormal',new THREE.BufferAttribute(en,3));geo.setAttribute('kind',new THREE.BufferAttribute(k,1));geo.setAttribute('seed',new THREE.BufferAttribute(seeds,1));return geo;
 },[points,eventPoints]);
 useEffect(()=>()=>g.dispose(),[g]);
 useFrame((_,dt)=>{elapsed.current+=dt;
  const cycle=Math.max(0,elapsed.current-7)%12,returning=cycle>=6,local=cycle%6;
  const t=THREE.MathUtils.smoothstep(local,4,6);
  const m=mat.current;if(m){const u=m.uniforms;
   u.time.value=still?0:elapsed.current;u.progress.value=still?1:Math.min(1,elapsed.current/7);
   u.morph.value=still?0:returning?1-t:t;u.burst.value=still?0:Math.sin(Math.PI*t);}
 });
 const uniforms=useMemo(()=>({time:{value:0},progress:{value:0},morph:{value:0},burst:{value:0}}),[]);
 return <group position={[wide?.3:-.02,wide?-.42:-.2,0]} scale={fit} rotation={[0,-.2,0]}><points geometry={g} frustumCulled={false}><shaderMaterial ref={mat} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} transparent depthWrite={false} blending={THREE.AdditiveBlending}/></points></group>
}
export default function ParticleHero(){
 const [eventPoints,setEventPoints]=useState<number[]|null>(null),[points,setPoints]=useState<number[]|null>(null),[still,setStill]=useState(false),[visible,setVisible]=useState(true),[error,setError]=useState(false);
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{Promise.all(['/cad/particle-scene.json','/cad/event-particles.json'].map(url=>fetch(url).then(r=>{if(!r.ok)throw Error();return r.json()}))).then(([scene,event])=>{setPoints(scene);setEventPoints(event)}).catch(()=>setError(true));const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setStill(mq.matches);change();mq.addEventListener('change',change);const o=new IntersectionObserver(e=>setVisible(e[e.length-1].isIntersecting));if(root.current)o.observe(root.current);return()=>{o.disconnect();mq.removeEventListener('change',change)}},[]);
 return <section ref={root} className="particle-hero" aria-labelledby="hero-title">
  <div className="particle-art" aria-hidden="true">{points&&eventPoints?<Canvas frameloop={visible&&!still?'always':'demand'} camera={{position:[0,.25,4.7],fov:40}} dpr={[1,1.5]} gl={{alpha:true,antialias:true}}><Cloud points={points} eventPoints={eventPoints} still={still}/></Canvas>:error?null:<span className="particle-loading">Loading the booth preview</span>}</div>
  <div className="hero-copy"><h1 id="hero-title"><span>Timeless Moments, Perfectly Captured.</span> <em>With Next Generation Photo Booths</em></h1><p>Two booth models, or software for your own hardware. Capture photos, print them and share digital copies.</p></div>
  <div className="hero-foot"><ConversionActions/></div>
 </section>
}


