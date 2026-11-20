import fs from 'node:fs';
import * as THREE from 'three';
const cad=JSON.parse(fs.readFileSync('public/cad/booth.json'));
const out=[];
const names=new Set(['PBK_N-01','PBK_N-02','MirrorPBK_N-02','PBK_N-04','PBK_N-14','PBK_N-16','sq acrylic','PBK_N-18','PBK_N-27','Acrylic Plate','acer 27inch display','Canon_EOS R100','PBK_N-40']);
for(const m of cad.meshes){if(!names.has(m.name))continue;const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(m.attributes.position.array,3));g.setIndex(m.index.array);const e=new THREE.EdgesGeometry(g,30),a=e.attributes.position.array;for(let i=0;i<a.length;i+=6){const len=Math.hypot(a[i+3]-a[i],a[i+4]-a[i+1],a[i+5]-a[i+2]);const n=Math.max(1,Math.ceil(len/5));for(let j=0;j<n;j++){const t=j/n;for(let k=0;k<3;k++)out.push(Math.round((a[i+k]+(a[i+3+k]-a[i+k])*t)/1000*10000)/10000)}}g.dispose();e.dispose()}
const sampled=[];const stride=Math.max(1,Math.ceil(out.length/3/28000));for(let i=0;i<out.length;i+=3*stride)sampled.push(...out.slice(i,i+3));fs.writeFileSync('public/cad/particle-edges.json',JSON.stringify(sampled));console.log(sampled.length/3);
