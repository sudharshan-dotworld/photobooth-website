

// Heading set large across rows with guest photos in the gaps, each row scrolling as a
// marquee (alternate rows run the other way). The words are decorative copies of the
// real h2, which stays readable to screen readers.
const wallRows:(string|{src:string;pos?:string})[][]=[
 [{src:'/landing/carousel-event-6.webp'},{src:'/landing/portrait.png',pos:'50% 30%'},'For your',{src:'/landing/carousel-event-2.webp'},{src:'/landing/friends.png',pos:'50% 35%'}],
 [{src:'/landing/celebration.png',pos:'50% 30%'},{src:'/landing/carousel-event-4.webp'},'event,',{src:'/landing/travel.png',pos:'50% 35%'},{src:'/landing/outdoors.png',pos:'50% 25%'}],
 [{src:'/landing/carousel-event-6.webp'},'venue, or',{src:'/landing/outdoors.png',pos:'50% 25%'},{src:'/landing/carousel-event-5.webp',pos:'50% 40%'},{src:'/landing/carousel-event-1.webp',pos:'50% 35%'}],
 [{src:'/landing/travel.png',pos:'50% 35%'},{src:'/landing/friends.png',pos:'50% 35%'},{src:'/landing/carousel-event-2.webp',pos:'50% 60%'},'business',{src:'/landing/celebration.png',pos:'50% 30%'}],
];

// Three copies per row: the track moves by one copy, so the loop never shows a gap.
const copies=[0,1,2];

export default function AudienceWall(){
  return <div className="audience-wall">
    <h2 className="audience-wall-title">Bring people together.</h2>
    <div className="wall-rows" aria-hidden="true">{wallRows.map((row,r)=><div className={`wall-row wall-row-${r+1}`} key={r}>
      <div className="wall-track">{copies.map(k=><div className="wall-set" key={k}>{row.map((cell,c)=>typeof cell==='string'
        ?<span className="wall-word" key={c}>{cell}</span>
        :<span className="wall-tile" key={c}><img src={cell.src} alt="" loading="lazy" style={cell.pos?{objectPosition:cell.pos}:undefined}/></span>)}</div>)}</div>
    </div>)}</div>
  </div>;
}

