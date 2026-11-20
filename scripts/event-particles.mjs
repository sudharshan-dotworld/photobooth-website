import fs from 'node:fs';
import * as T from 'three';


// The cabinet comes from the supplied STEP. The human particle silhouettes
// are sampled from the supplied art reference, not assembled from primitives.
const cad=JSON.parse(fs.readFileSync('public/cad/event-booth.json')),out=[];
let seed=42;
const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
const put=(p,n,k)=>out.push(...p.map(v=>+v.toFixed(5)),...n.map(v=>+v.toFixed(4)),k);
const names=new Set(['PBK_N-01','PBK_N-02','MirrorPBK_N-02','PBK_N-04','PBK_N-14','PBK_N-16','sq acrylic','PBK_N-18','PBK_N-27','Acrylic Plate','acer 27inch display','PBK_N-40']);
const seen=new Set(),meshes=[],triangles=[];
// Turn only the cabinet toward the people on its left. Apply this before
// visibility sampling so the newly exposed right side is genuinely present.
const boothYaw=-.65;
const transform=p=>new T.Vector3(p.x*.001,(p.y+1129.520347)*.001-.95,p.z*.001).applyAxisAngle(new T.Vector3(0,1,0),boothYaw).add(new T.Vector3(1.05,0,0));
// A deterministic depth raster eliminates hidden rear walls and internal edges.
const size=1400,depth=new Float32Array(size*size).fill(Infinity);
const project=p=>{const x=p.x*Math.cos(-.2)+p.z*Math.sin(-.2),z=-p.x*Math.sin(-.2)+p.z*Math.cos(-.2),d=4.3-z;return [(x/d+.55)*size,(.55-(p.y-.25)/d)*size,d]};
for(const m of cad.meshes){
 meshes.push(m);
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


fs.writeFileSync('public/cad/event-particles.json',JSON.stringify(out));console.log('Event surface particles:',out.length/7);
