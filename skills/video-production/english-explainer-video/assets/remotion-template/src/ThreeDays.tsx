import {AbsoluteFill,useCurrentFrame} from 'remotion';
import playback from './days-playback.json';
import { lessonClock, LessonAudio, duration } from './Playback';
import cues from './days-timing.json';

const starts=cues.map((_,i)=>cues.slice(0,i).reduce((a,c)=>a+c.frames,0));
export const daysFrames=duration(playback);
const navy='#384f83',red='#a5444b',ink='#25282c', green='#38766b';
const phase=(frame:number,a:number,b:number)=>Math.max(0,Math.min(1,(frame-a)/(b-a)));
const headings=['三天之内，还是三天之后？','完成一份报告','完成一份报告','等一个包裹','等一个包裹','到达的时间点','最迟什么时候？','三天的截止线','回到最初的问题'];
function Sheet({x,y,progress}:{x:number;y:number;progress:number}){
 return <g transform={`translate(${x} ${y})`} strokeLinejoin="round"><path d="M-31-39h43l17 17v61h-60Z" fill="#fffdfa" stroke="#414958" strokeWidth="2.7"/><path d="M12-39v17h17" fill="#dce3ed" stroke="#414958" strokeWidth="2"/>{[0,1,2,3].map((n)=><path key={n} d={`M-21 ${-12+10*n}h${36*phase(progress,n*.20,n*.20+.22)}`} stroke={navy} strokeWidth="3"/>)}{progress>.96 && <g><circle cx="25" cy="31" r="13" fill={green}/><path d="m18 31 5 5 9-11" fill="none" stroke="white" strokeWidth="2.8"/></g>}</g>;
}
function Parcel({x,y}:{x:number;y:number}){
 return <g transform={`translate(${x} ${y})`} stroke="#624e3f" strokeWidth="2.5" strokeLinejoin="round"><path d="M-34-13 0-31 34-13 0 6Z" fill="#efcea1"/><path d="M-34-13 0 6v34l-34-20Z" fill="#dcb27f"/><path d="M0 6 34-13v33L0 40Z" fill="#c79a67"/><path d="m-19-21 34 19 6-3-34-19Z" fill="#f5e6c8" strokeWidth="1.5"/><path d="m-24 6 11 6" stroke="#7b6049"/></g>;
}
export function ThreeDays(){
 const f=lessonClock(useCurrentFrame(), playback);
 const i=starts.reduce((idx,t,k)=>f>=t?k:idx,0), local=f-starts[i];
 const doc=i===1||i===2, box=i>=3&&i<=5, deadline=i===6||i===7;
 const fill=phase(f,starts[2]+10,starts[2]+125), travel=phase(f,starts[5]+28,starts[5]+143);
 const stamp=phase(local,12,29),x=175,w=690, y=293;
 const finalFill=phase(local,25,130);
 const en=i===0?'in three days':doc?'I can finish the report':box?'The package will arrive':deadline?'Hand it in':'in  /  within';
 return <AbsoluteFill style={{backgroundColor:'#faf9f5',backgroundImage:'linear-gradient(#c5c6c129 1px,transparent 1px),linear-gradient(90deg,#c5c6c129 1px,transparent 1px)',backgroundSize:'36px 36px',color:ink,fontFamily:'"Songti SC","SimSun","Noto Serif CJK SC",Georgia,serif'}}>
 <LessonAudio folder="three-days" beats={playback}/>
 <header style={{margin:'36px 86px',display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:25}}><span>{headings[i]}</span><span style={{fontSize:22}}>悦享书屋英语精讲</span></header>
 <div style={{position:'absolute',top:132,width:'100%',textAlign:'center',font:'52px Georgia,serif'}}>{i===8?<>I'll <span style={{color:red}}>finish it</span> <span style={{color:navy}}>in three days.</span></>:doc?<>I can <span style={{color:red}}>finish the report</span></>:box?<>The package <span style={{color:red}}>will arrive</span></>:en}{i>0&&i<8&&<span style={{color:navy}}> {deadline?'within':'in'} three days.</span>}</div>
 <svg viewBox="0 0 1060 405" style={{position:'absolute',width:1060,height:405,left:110,top:200}} fontFamily="PingFang SC,sans-serif" fill={ink}>
 {<>
 {i===8&&<><text x="235" y="75" fontSize="31" fill={navy}>持续过程</text><text x="690" y="75" fontSize="31" fill={red}>瞬间结果</text>
 <rect x={x} y={y-35} width={w} height="18" fill="#dfe4ed"/>
 <rect x={x} y={y-35} width={w*finalFill} height="18" fill={navy}/>
 <Sheet x={x+w} y={y-85} progress={finalFill}/>
 {finalFill===1&&<><circle cx={x+w} cy={y} r="9" fill={red}/><text x={x+w-45} y={y-65} textAnchor="end" fontSize="25" fill={red}>报告写完</text></>}</>}
 {i===0 && <g fontFamily="Songti SC" fontSize="49" fontWeight="650"><text x="184" y="155">三天之内</text><text x="514" y="155" fontSize="33" fill={navy}>？</text><text x="647" y="155" fill={red}>三天之后</text></g>}
 <path d={`M${x} ${y}h${w}`} stroke="#43464a" strokeWidth="2.5"/>
 {[0,1,2,3].map(n=><g key={n}><path d={`M${x+n*w/3} ${y-8}v16`} stroke="#48494a" strokeWidth="2.5"/><text x={x+n*w/3} y={y+46} textAnchor="middle" fontSize="23" fill={n===3?red:ink}>{['现在','一天后','两天后','三天后'][n]}</text></g>)}
 {doc&&<><Sheet x={x+w*fill} y={163} progress={fill}/><path d={`M${x} ${y-23}h${w*fill}`} stroke={navy} strokeWidth="11"/><path d={`M${x+w*fill} 212v49`} stroke={navy} strokeDasharray="4 5" strokeWidth="2"/>{fill===1&&<text x="530" y="224" textAnchor="middle" fontSize="25" fill={navy}>写完所用的时间</text>}</>}
 {box&&<><path d={`M${x} ${y-38}h${w*travel}`} stroke={navy} strokeDasharray="6 9" strokeWidth="3"/><Parcel x={x+w*travel} y={200-9*Math.sin(Math.PI*travel)}/>{travel>=1&&<><circle cx={x+w} cy={y} r="10" fill={red}/><text x={x+w-64} y="215" textAnchor="end" fontSize="27" fill={red}>到达</text></>}</>}
 {deadline&&<><rect x={x} y={y-24} width={w} height="20" fill="#dce5de"/><path d={`M${x+w} 141V${y+8}`} stroke={red} strokeWidth="4"/><text x={x+w} y="115" textAnchor="middle" fontSize="27" fill={red}>最迟三天</text><Sheet x={x+80} y={174} progress={i===7?stamp:0}/><circle cx={x+80} cy={y} r="7" fill={green}/><text x={x+80} y="242" textAnchor="middle" fontSize="21" fill={green}>今天下午{i===6?'？':'　可以交'}</text></>}
 </>}
 </svg>
 <div style={{position:'absolute',bottom:45,left:30,right:30,textAlign:'center',font:'600 25px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif'}}>{cues[i].text}</div>
 </AbsoluteFill>
}
