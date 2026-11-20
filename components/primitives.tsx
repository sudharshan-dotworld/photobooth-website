'use client';
import {createContext,useContext,useEffect,useMemo} from 'react';
import {RoundedBox} from '@react-three/drei';
import {frameGeometry} from './geometry';
export type V=[number,number,number];
export const Highlight=createContext(false);
export function Metal({color='#b6b8ba',metalness=.48}:{color?:string;metalness?:number}){const selected=useContext(Highlight);return <meshStandardMaterial color={color} roughness={.38} metalness={metalness} emissive={selected?'#527e95':'#000'} emissiveIntensity={selected?.18:0}/>}
export function Box({p=[0,0,0],s,r=[0,0,0],color='#b6b8ba',radius=.004,metalness=.48}:{p?:V;s:V;r?:V;color?:string;radius?:number;metalness?:number}){return <RoundedBox args={s} position={p} rotation={r} radius={Math.min(radius,...s.map(v=>v*.23))} smoothness={2} castShadow receiveShadow><Metal color={color} metalness={metalness}/></RoundedBox>}
export function Cylinder({p,radius,depth,color='#b6b8ba',r=[Math.PI/2,0,0]}:{p:V;radius:number;depth:number;color?:string;r?:V}){return <mesh position={p} rotation={r} castShadow><cylinderGeometry args={[radius,radius,depth,32]}/><Metal color={color}/></mesh>}
export function Screw({p,r=[0,0,0]}:{p:V;r?:V}){return <group position={p} rotation={r}><Cylinder p={[0,0,0]} radius={.005} depth={.003}/><Box p={[0,0,.002]} s={[.006,.0013,.001]} color="#34383b" radius={0}/></group>}
export function Screws({xs,ys,z}:{xs:number[];ys:number[];z:number}){return <>{xs.flatMap(x=>ys.map(y=><Screw key={`${x}-${y}`} p={[x,y,z]}/>))}</>}
export function Frame({p,w,h,b=.025,d=.02,r=.05,color='#b6b8ba'}:{p:V;w:number;h:number;b?:number;d?:number;r?:number;color?:string}){const geometry=useMemo(()=>frameGeometry(w,h,r,b,d),[w,h,r,b,d]);useEffect(()=>()=>geometry.dispose(),[geometry]);return <mesh position={p} geometry={geometry} castShadow receiveShadow><Metal color={color}/></mesh>}
