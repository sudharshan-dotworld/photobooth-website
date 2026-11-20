// Explore-page copy for each booth. Facts only from the product brief and design notes:
// modular build, castor base, ring light, side printer, DSLR or webcam, QR copies,
// pay-at-kiosk layouts, fun and ID modes, two screens, locking front door.
export type BoothModule={image:string;title:string;copy:string};
export type BoothPage={
  slug:string;name:string;eyebrow:string;lede:string;render:string;renderAlt:string;
  modular:{title:string;copy:string;modules:BoothModule[]};
  use:{title:string;copy:string;points:string[];image:string;imageAlt:string;numbered?:boolean};
  software:{title:string;copy:string;points:string[]};
};

export const boothPages:BoothPage[]=[
  {
    slug:'event-booth',name:'Event Booth',eyebrow:'Portable booth',
    lede:'A portable photo booth for weddings, parties and corporate events. It comes apart into modules, travels in parts and goes back together at the next venue.',
    render:'/landing/event-booth-render.webp',renderAlt:'Event Booth with ring-light camera, touchscreen, side printer shelf and wheeled base',
    modular:{
      title:'Modular design, easy to carry',
      copy:'Event Booth is built from separate modules joined by a single column. Take it apart after the event, carry each part on its own, and set it up again at the next venue.',
      modules:[
        {image:'/landing/modules/event-head.webp',title:'Camera and screen head',copy:'Ring-light camera and touchscreen in one unit.'},
        {image:'/landing/modules/event-printer.webp',title:'Printer shelf',copy:'Holds the photo printer beside the column.'},
        {image:'/landing/modules/event-base.webp',title:'Wheeled base',copy:'Castor wheels roll the booth into place.'},
      ],
    },
    use:{
      title:'Everything guests need at the event',
      copy:'Guests step up, take their photos and leave with a print in hand and a digital copy on their phone.',
      points:['DSLR or webcam in the camera head','Prints from the side-mounted printer','Digital copies by QR scan','Photo layouts with your event branding'],
      image:'/landing/photo-strip.png',imageAlt:'Printed photo strip with four poses on a pink background',
    },
    software:{
      title:'Runs on FunFoto software',
      copy:'The same software runs every Event Booth, so a new event only needs a new layout.',
      points:['Keeps working without an internet connection','A gallery of every session, ready to print again','Your own welcome screen for each event'],
    },
  },
  {
    slug:'automat-booth',name:'Automat Booth',eyebrow:'Self-service booth',
    lede:'A self-service photo booth for malls, attractions and campuses. Guests choose a layout, pay at the kiosk and leave with prints and digital copies.',
    render:'/landing/automat-booth-render.webp',renderAlt:'Automat Booth with lit camera head, touchscreen deck and print cabinet',
    modular:{
      title:'Modular build for delivery and service',
      copy:'Automat Booth is made of three modules. It comes apart for delivery, goes back together on site, and the front door opens for paper and printer access.',
      modules:[
        {image:'/landing/modules/automat-head.webp',title:'Lit camera head',copy:'Camera behind “Look here”, with the photo display below it.'},
        {image:'/landing/modules/automat-deck.webp',title:'Touchscreen deck',copy:'The angled screen where guests choose and pay.'},
        {image:'/landing/modules/automat-cabinet.webp',title:'Print cabinet',copy:'Printer, paper and the photo tray behind a locking front door.'},
      ],
    },
    use:{
      title:'Self-service from start to print',
      copy:'No attendant needed. Each layout is priced by its design and number of photo slots, shown on screen before guests confirm.',
      points:['Choose a layout on the touchscreen','Pay at the kiosk','Take the photos','Collect prints and scan for digital copies'],
      numbered:true,
      image:'/landing/features/digital-photo.webp',imageAlt:'Booth screen showing a QR code beside a phone with the guest photo',
    },
    software:{
      title:'Two screens, two modes',
      copy:'One display shows guests their photos, the other carries your branding and promotions.',
      points:['Fun mode and ID photo mode in one booth','Separate displays for photos and promotions','Extra print copies at a per-print price'],
    },
  },
];
