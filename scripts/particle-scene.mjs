import fs from 'node:fs';
import * as T from 'three';
import sharp from 'sharp';

// The cabinet comes from the supplied STEP. The human particle silhouettes
// are sampled from the supplied art reference, not assembled from primitives.
const cad=JSON.parse(fs.readFileSync('public/cad/booth.json')),out=[];
let seed=42;
const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
const put=(p,n,k)=>out.push(...p.map(v=>+v.toFixed(5)),...n.map(v=>+v.toFixed(4)),k);
const names=new Set(['PBK_N-01','PBK_N-02','MirrorPBK_N-02','PBK_N-04','PBK_N-14','PBK_N-16','sq acrylic','PBK_N-18','PBK_N-27','Acrylic Plate','acer 27inch display','PBK_N-40']);
const seen=new Set(),meshes=[],triangles=[];
// Turn only the cabinet toward the people on its left. Apply this before
// visibility sampling so the newly exposed right side is genuinely present.
const boothYaw=-.65;
const transform=p=>new T.Vector3(p.x*.001,p.y*.001-.95,p.z*.001).applyAxisAngle(new T.Vector3(0,1,0),boothYaw).add(new T.Vector3(1.05,0,0));
// A deterministic depth raster eliminates hidden rear walls and internal edges.
const size=1400,depth=new Float32Array(size*size).fill(Infinity);
const project=p=>{const x=p.x*Math.cos(-.2)+p.z*Math.sin(-.2),z=-p.x*Math.sin(-.2)+p.z*Math.cos(-.2),d=4.3-z;return [(x/d+.55)*size,(.55-(p.y-.25)/d)*size,d]};
for(const m of cad.meshes){
 if(!names.has(m.name)||seen.has(m.name))continue;seen.add(m.name);meshes.push(m);
 const a=m.attributes.position.array,ix=m.index.array;
 for(let i=0;i<ix.length;i+=3){
  const t=[0,1,2].map(j=>transform(new T.Vector3().fromArray(a,ix[i+j]*3)));triangles.push(t);
  const [A,B,C]=t.map(project),den=(B[1]-C[1])*(A[0]-C[0])+(C[0]-B[0])*(A[1]-C[1]);if(Math.abs(den)<.001)continue;
  const minX=Math.max(0,Math.floor(Math.min(A[0],B[0],C[0]))),maxX=Math.min(size-1,Math.ceil(Math.max(A[0],B[0],C[0]))),minY=Math.max(0,Math.floor(Math.min(A[1],B[1],C[1]))),maxY=Math.min(size-1,Math.ceil(Math.max(A[1],B[1],C[1])));
  for(let y=minY;y<=maxY;y++)for(let x=minX;x<=maxX;x++){
   const u=((B[1]-C[1])*(x+.5-C[0])+(C[0]-B[0])*(y+.5-C[1]))/den,v=((C[1]-A[1])*(x+.5-C[0])+(A[0]-C[0])*(y+.5-C[1]))/den,w=1-u-v;
   if(u>=0&&v>=0&&w>=0){const d=1/(u/A[2]+v/B[2]+w/C[2]);const j=y*size+x;if(d<depth[j])depth[j]=d;}
  }
 }
}
const visible=p=>{const [x,y,d]=project(p),j=Math.floor(y)*size+Math.floor(x);return d<=(depth[j]??Infinity)+.012};
for(const [A,B,C] of triangles){const cross=B.clone().sub(A).cross(C.clone().sub(A)),area=cross.length()/2,n=cross.normalize();const count=Math.floor(area*16000+rand());for(let j=0;j<count;j++){let u=rand(),v=rand();if(u+v>1){u=1-u;v=1-v}const p=A.clone().addScaledVector(B.clone().sub(A),u).addScaledVector(C.clone().sub(A),v);if(visible(p))put(p.toArray(),n.toArray(),0)}}
// Bound edge brightness in screen space, including densely tessellated vents.
const occupiedEdges=new Set();
for(const m of meshes){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(m.attributes.position.array,3));g.setIndex(m.index.array);const e=new T.EdgesGeometry(g,35),a=e.attributes.position.array;for(let i=0;i<a.length;i+=6){const A=transform(new T.Vector3().fromArray(a,i)),B=transform(new T.Vector3().fromArray(a,i+3)),count=Math.ceil(A.distanceTo(B)/.0028);for(let j=0;j<count;j++){const p=A.clone().lerp(B,j/count);if(visible(p)){const q=project(p),key=Math.floor(q[0])+size*Math.floor(q[1]);if(!occupiedEdges.has(key)){occupiedEdges.add(key);put(p.toArray(),[0,0,1],3)}}}}g.dispose();e.dispose()}

const {data,info}=await sharp('scripts/particle-reference.png').removeAlpha().raw().toBuffer({resolveWithObject:true});
// Mask follows the three people and stops above the original foreground fabric.
const polygon=[[69,179],[75,141],[85,119],[94,115],[94,96],[109,91],[119,103],[113,118],[119,134],[128,124],[134,114],[150,113],[156,121],[156,108],[164,105],[168,112],[164,127],[164,148],[157,155],[148,153],[145,177],[154,198],[160,177],[166,152],[177,142],[177,124],[189,117],[201,127],[199,141],[203,154],[199,181],[197,219],[174,221],[149,210],[128,202],[104,195],[69,181]];
function inside(x,y){let yes=false;for(let i=0,j=polygon.length-1;i<polygon.length;j=i++){const a=polygon[i],b=polygon[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes}return yes}
for(let i=0;i<110000;i++){const x=69+rand()*135,y=91+rand()*132;if(!inside(x,y))continue;const j=(Math.floor(y)*info.width+Math.floor(x))*info.channels;const l=(data[j]+data[j+1]+data[j+2])/765;if(l<.075||rand()>Math.pow(l,.65))continue;
 const wx=-1.45+(x-69)*.0105,wy=.57-(y-91)*.0105;
 // Counter-rotate the sampled silhouettes so their original poses stay intact.
 put([wx/Math.cos(.2),wy,-wx*Math.tan(.2)],[Math.min(1,l*1.5),0,1],1);
}
for(let i=0;i<165000;i++)put([(rand()-.5)*8,rand(),rand()],[0,1,0],2);
// Each dust particle has its own attachment on the upper/right CAD surface.
// Kind 4 uses the normal channels to carry that attachment, avoiding a nozzle.
const plumeAnchors=[];
for(let i=0;i<out.length;i+=7)if(out[i+6]===0&&out[i+1]>.52&&out[i]>1.10)plumeAnchors.push(out.slice(i,i+3));
if(!plumeAnchors.length)throw Error('No visible CAD surface for the dispersion');
for(let i=0;i<6500;i++){
 const anchor=plumeAnchors[Math.floor(rand()*plumeAnchors.length)];
 const reach=.15+Math.pow(rand(),1.5)*.85,angle=rand()*Math.PI*2;
 put([anchor[0]+reach,anchor[1]+.10+Math.sin(angle)*reach*.50,anchor[2]+Math.cos(angle)*reach*.5],anchor,4);
}
// Sparse ground particles hug the same rotated footprint as the cabinet.
// Their density falls off exponentially away from its contact perimeter.
for(let i=0;i<9000;i++){
 const side=Math.floor(rand()*4),along=rand()*2-1,spread=-Math.log(Math.max(.001,rand()))*.055;
 const x=side<2?(side===0?-1:1)*(.445+spread):along*.445;
 const z=side<2?along*.31:(side===2?-1:1)*(.31+spread);
 const p=new T.Vector3(x,-.982+(rand()-.5)*.026,z).applyAxisAngle(new T.Vector3(0,1,0),boothYaw).add(new T.Vector3(1.05,0,0));
 put(p.toArray(),[0,1,0],5);
}
fs.writeFileSync('public/cad/particle-scene.json',JSON.stringify(out));console.log(`Wrote ${out.length/7} visible particles`);
