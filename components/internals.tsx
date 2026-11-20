'use client';
import React,{useEffect,useRef} from 'react';
import {useFrame,ThreeEvent} from '@react-three/fiber';
import {Html} from '@react-three/drei';
import * as THREE from 'three';
import {parts,PartId,formationAt} from './model';
import {Motion} from './types';
import {V,Highlight,Box,Cylinder,Screws,Screw,Frame} from './primitives';
export function Assembly({id,motion,selected,onSelect,children}:{id:PartId;motion:React.RefObject<Motion>;selected:PartId|null;onSelect:(id:PartId)=>void;children:React.ReactNode}){
 const group=useRef<THREE.Group>(null);const spec=parts.find(p=>p.id===id)!;
 const art=useRef<{mesh:THREE.Mesh;materials:THREE.Material[];transparent:boolean[];edge:THREE.LineSegments}[]>([]);
 useEffect(()=>{const list:typeof art.current=[];group.current?.traverse(object=>{if(!(object instanceof THREE.Mesh))return;const edge=new THREE.LineSegments(new THREE.EdgesGeometry(object.geometry,28),new THREE.LineBasicMaterial({color:'#5a9b9c',transparent:true,opacity:0,depthWrite:false}));edge.raycast=()=>{};object.add(edge);const materials=Array.isArray(object.material)?object.material:[object.material];list.push({mesh:object,materials,transparent:materials.map(m=>m.transparent),edge})});art.current=list;return()=>{list.forEach(({edge})=>{edge.removeFromParent();edge.geometry.dispose();(edge.material as THREE.Material).dispose()});art.current=[]}},[]);
 useFrame(()=>{if(!group.current)return;const m=motion.current;const state=formationAt(m.formation,id);const hidden=m.cutaway&&(id==='enclosure'||id==='vents');
 group.current.position.set(...spec.offset.map(v=>v*(m.explode+(1-state.solid)*.12)) as V);
 if(id==='display'||id==='camera')group.current.position.y+=m.split;
 for(const item of art.current){item.mesh.visible=!hidden;item.materials.forEach((material,i)=>{material.opacity=state.solid;material.transparent=state.solid<.999||item.transparent[i];material.depthWrite=state.solid>.5});const line=item.edge.material as THREE.LineBasicMaterial;line.opacity=state.wire*.65;item.edge.visible=state.wire>.001}
 });
 return <Highlight.Provider value={selected===id}><group ref={group} onClick={(e:ThreeEvent<MouseEvent>)=>{if(e.delta>4)return;e.stopPropagation();onSelect(id)}}>{children}{selected===id&&<Html position={spec.anchor} center zIndexRange={[10,0]}><button className="component-label" onClick={()=>onSelect(id)}>{spec.name}</button></Html>}</group></Highlight.Provider>
}

export function MiniPC({motion}:{motion:React.RefObject<Motion>}){return <group position={[-.08,.934,-.13]}>
 <Box s={[.33,.065,.22]} color="#363e43"/><Box p={[0,-.042,0]} s={[.39,.018,.26]}/>
 {Array.from({length:16},(_,i)=><Box key={i} p={[-.145+i*.019,.037,0]} s={[.008,.010,.19]} color="#737e83"/>)}
 {[-.10,-.045,.02].map(x=><group key={x}><Box p={[x,0,.112]} s={[.036,.018,.006]} color="#111a20"/><Box p={[x,0,.116]} s={[.026,.006,.003]} color="#447f91"/></group>)}
 <Box p={[.10,0,.112]} s={[.037,.021,.006]} color="#171e23"/><Cylinder p={[.139,0,.115]} radius={.004} depth={.004} color="#83b9ac"/>
 <Screws xs={[-.175,.175]} ys={[-.04]} z={.10}/>
 <Box p={[-.23,-.08,.02]} s={[.055,.006,.16]} color="#43645b"/>
 {Array.from({length:5},(_,i)=><Box key={i} p={[-.23,-.072,-.035+i*.026]} s={[.033,.008,.013]} color="#b3b6a5"/>)}
 </group>}
export function Power(){return <group position={[-.15,.26,-.16]}>
 <Box p={[0,-.073,0]} s={[.31,.014,.26]}/><Box s={[.24,.12,.16]} color="#858e93"/>
 {Array.from({length:10},(_,i)=><Box key={i} p={[-.098+i*.022,.063,0]} s={[.009,.003,.11]} color="#303c42"/>)}
 <Box p={[0,.02,.09]} s={[.20,.045,.025]} color="#304c43"/>
 {Array.from({length:6},(_,i)=><group key={i}><Box p={[-.082+i*.033,.02,.107]} s={[.022,.022,.012]} color="#75998c"/><Screw p={[-.082+i*.033,.022,.116]}/></group>)}
 <Box p={[.19,-.01,.01]} s={[.055,.10,.14]} color="#272f35"/><Box p={[.19,.01,.086]} s={[.026,.040,.008]} color="#b8b9b2"/>
 <Box p={[.08,.13,-.08]} s={[.19,.022,.055]} color="#39434a"/>
 {[-.07,-.03,.01,.05].map(x=><Box key={x} p={[x+.08,.146,-.08]} s={[.022,.011,.035]} color="#c5c6b7"/>)}
 </group>}
export function Cooling({motion}:{motion:React.RefObject<Motion>}){const rotors=useRef<THREE.Group>(null);useFrame((_,dt)=>{if(!rotors.current||motion.current.reduced)return;rotors.current.children.forEach(g=>g.rotation.z-=Math.min(dt,.05)*7)});return <group position={[.315,0,-.017]} rotation={[0,Math.PI/2,0]}>
 {[.363,.708].map(y=><group key={y} position={[0,y,0]}><Frame p={[0,0,-.012]} w={.24} h={.24} r={.012} b={.019} d={.03} color="#3c474e"/><Screws xs={[-.105,.105]} ys={[-.105,.105]} z={.027}/></group>)}
 <group ref={rotors}>{[.363,.708].map(y=><group key={y} position={[0,y,.01]}>{Array.from({length:7},(_,i)=><group key={i} rotation={[0,0,i*Math.PI*2/7]}><Box p={[.046,0,0]} s={[.094,.026,.008]} r={[0,0,.55]} color="#45575c" radius={.01}/></group>)}<Cylinder p={[0,0,.007]} radius={.032} depth={.023} color="#899b9c"/></group>)}</group>
 </group>}
const connections:{from:PartId;to:PartId;points:V[];color:string}[]=[
 {from:'power',to:'computer',points:[[-.15,.28,-.06],[-.29,.28,-.08],[-.29,.90,-.08],[-.18,.934,-.02]],color:'#b69565'},
 {from:'computer',to:'display',points:[[.02,.934,-.02],[-.26,.95,-.03],[-.26,1.4,-.03],[0,1.46,.015]],color:'#6b9d9d'},
 {from:'computer',to:'touch',points:[[.065,.934,-.02],[.20,.96,.02],[.20,1.04,.10],[0,1.10,.14]],color:'#6b9d9d'},
 {from:'computer',to:'camera',points:[[-.08,.934,-.02],[-.30,.96,-.05],[-.30,1.772,-.05],[0,1.772,.03]],color:'#6b9d9d'},
 {from:'computer',to:'printer',points:[[-.13,.934,-.02],[-.23,.87,-.07],[-.23,.70,-.07],[-.065,.684,.012]],color:'#6b9d9d'},
 {from:'power',to:'printer',points:[[-.08,.28,-.06],[-.08,.39,-.10],[.27,.39,-.10],[.27,.65,.037]],color:'#b69565'},
 {from:'power',to:'cooling',points:[[-.19,.28,-.06],[-.20,.31,-.19],[.29,.31,-.19],[.315,.363,-.017]],color:'#b69565'},
 {from:'power',to:'cooling',points:[[-.22,.28,-.06],[-.24,.32,-.22],[.29,.32,-.22],[.29,.708,-.017]],color:'#b69565'},
];
export function Harness({motion}:{motion:React.RefObject<Motion>}){return <>{connections.map((c,i)=><Cable key={i} connection={c} motion={motion} index={i}/>)}</>}
function Cable({connection:c,motion,index}:{connection:typeof connections[number];motion:React.RefObject<Motion>;index:number}){
 const line=useRef<THREE.Mesh>(null),pulse=useRef<THREE.Mesh>(null);const last=useRef(-1);const curve=useRef(new THREE.CatmullRomCurve3(c.points.map(p=>new THREE.Vector3(...p))));
 useFrame(({clock})=>{const m=motion.current;if(!line.current)return;const opacity=formationAt(m.formation,'computer').solid;line.current.visible=opacity>.99;const e=m.explode;
 if(Math.abs(last.current-e)>.0001){const a=parts.find(p=>p.id===c.from)!,b=parts.find(p=>p.id===c.to)!;curve.current=new THREE.CatmullRomCurve3(c.points.map((p,i)=>new THREE.Vector3(...p).add(new THREE.Vector3(...a.offset).lerp(new THREE.Vector3(...b.offset),i/(c.points.length-1)).multiplyScalar(e))));line.current.geometry.dispose();line.current.geometry=new THREE.TubeGeometry(curve.current,32,.003,6,false);last.current=e}
 if(pulse.current){pulse.current.visible=opacity>.99&&m.lit&&!m.reduced;pulse.current.position.copy(curve.current.getPoint((clock.elapsedTime*.22+index*.13)%1))}
 });useEffect(()=>()=>line.current?.geometry.dispose(),[]);
 return <><mesh ref={line}><tubeGeometry args={[curve.current,32,.003,6,false]}/><meshStandardMaterial color={c.color} roughness={.65}/></mesh><mesh ref={pulse}><sphereGeometry args={[.006,8,8]}/><meshBasicMaterial color={c.color}/></mesh></>
}
