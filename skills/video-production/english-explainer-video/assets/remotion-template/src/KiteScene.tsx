import {interpolate} from 'remotion';
const ease=(f:number,start:number,end:number)=>interpolate(f,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const KiteScene=({frame,scene,local}:{frame:number;scene:number;local:number})=>{
 const girlX=335+195*ease(frame,0,241);
 const walk=frame<241?Math.sin(frame*Math.PI/12):0;
 const kiteX=girlX-110+Math.sin(frame/26)*12;
 const kiteY=60+Math.sin(frame/22)*5;
 const help=scene>=7?1:scene===6?ease(local,18,82):0;
 const torn=scene>=5;
 return <svg viewBox="0 0 1000 260" style={{position:'absolute',top:150,left:140,width:1000,height:260}}>
 <g stroke="#b9c6bd" strokeWidth="2" fill="none">
 <path d="M65 228Q200 220 310 227T560 224T925 224"/>
 <path d="M86 211v-74m0 48-16-14m16-9 14-15"/>
 <path d="M852 216v-67m0 27 17-11"/>
 </g>
 <g fill="#dae4d9"><ellipse cx="85" cy="128" rx="30" ry="40"/><ellipse cx="853" cy="139" rx="23" ry="34"/></g>
 <g stroke="#a1b2a4" strokeWidth="2" fill="none"><path d="M85 211v-85m0 29-10-11m10-2 11-13M853 217v-83m0 24 10-11"/></g>
 <g stroke="#a7b8ae" strokeWidth="2" fill="none" transform={'translate('+Math.sin(frame/37)*7+' 0)'}><path d="M148 66q16-5 38-2m-21 10h37M753 58h33m-16 8h32"/></g>
 <path d={`M${girlX+20} 148 Q${girlX-55} 128 ${kiteX} ${kiteY+41}`} stroke="#51675f" strokeWidth="2" fill="none"/>
 <g transform={`translate(${kiteX} ${kiteY}) rotate(${-12+Math.sin(frame/30)*5})`}>
 <path d={torn?'M0-39 40-2 23 12 16 6 17 19 0 46-39-4Z':'M0-39 40-2 0 46-39-4Z'} fill="#d58263" stroke="#644f44" strokeWidth="2.5"/>
 <path d="M0-39 0 46-39-4Z" fill="#ebbd87"/><path d="M0-39V46M-39-4 40-2" stroke="#74594b" strokeWidth="2" fill="none"/>
 <path d="M0 46q-12 16 0 26t-8 21" fill="none" stroke="#996e57" strokeWidth="2"/><path d="m-10 62 15 5-12 5z" fill="#b75f51"/>
 {scene===5 && <ellipse cx="22" cy="13" rx="18" ry="16" fill="none" stroke="#a03c41" strokeWidth="3" strokeDasharray="5 3" opacity={ease(local,7,20)}/>}
 </g>
 <g transform={`translate(${girlX} ${walk*1.7})`} stroke="#354842" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
 <g fill="none"><path d={`M-8 182l${-walk*11} 21 -5 15h-8M5 181l${walk*12} 23 5 14h9`}/></g>
 <path d="M-13 137q10-9 20-2l13 54h-44z" fill="#648f81"/>
 <path d="M0 140l14 16 8-11" fill="none"/><path d={`M6 141l16 ${16-help*4} ${11+help*19} ${10-help*22}`} fill="none"/>
 <circle cx="0" cy="117" r="17" fill="#f3d5b5"/><path d="M-17 119q-5-30 18-25 14 2 16 16-13 0-20-7-1 11-14 16Z" fill="#49423e"/><ellipse cx="-21" cy="124" rx="7" ry="13" fill="#49423e"/><circle cx="9" cy="117" r="1.7" fill="#343d38" stroke="none"/>
 </g>
 <g transform="translate(636 0)" stroke="#444945" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"><path d="M-4 183l-5 35h-7m24-35 5 35h8" fill="none"/><path d="M-12 149q11-7 20-1l9 40h-36Z" fill="#d8b76e"/><circle cy="131" r="14" fill="#f0d1b3"/><path d="M-14 129q-4-22 14-19 16 0 16 17-13-1-21-7z" fill="#504740"/><path d={`M-8 151l-10 15 -${10+help*12} 1`} fill="none"/></g>
 <g transform={`translate(${594+help*9} ${214-help*49}) rotate(${-12+help*14})`}><path d="M-15-5 15-5 15 6-15 6Z" fill="#f9f3df" stroke="#7b5950" strokeWidth="2"/><path d="M-16-7h31v4h-31Z" fill="#ac624c"/></g>
 {scene===4 && <circle cx={girlX+20} cy="148" r={14+4*Math.sin(local/15)} stroke="#287f78" strokeWidth="2.6" fill="none"/>}
 {scene===6 && <path d="M558 205Q560 176 586 172l-8-2m8 2-5 7" stroke="#287f78" strokeWidth="2.5" fill="none" opacity={ease(local,7,21)}/>}
 </svg>
}
