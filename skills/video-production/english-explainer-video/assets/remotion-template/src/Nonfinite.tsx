import {AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {KiteScene} from './KiteScene';
import playback from './nonfinite-playback.json';
import { lessonClock, LessonAudio, duration } from './Playback';
import cues from './nonfinite-timing.json';

const bounds = {extrapolateLeft:'clamp', extrapolateRight:'clamp'} as const;
const starts = cues.map((_,i) => cues.slice(0,i).reduce((sum,c) => sum+c.frames,0));
export const lessonFrames = duration(playback);
const titles = ['先读一句话','先读一句话','找句子主干','看谁随时态变化','现在分词','过去分词','不定式','回到完整句子'];
const subtitles = [
  ['一句话里有三个动词形式，哪个才是谓语？'],
  ['The girl holding a kite stopped to help.'],
  ['先找主角，女孩。','她做了什么？她停了下来。'],
  ['把「昨天」换成「每天」，','动词就从 stopped 变成 stops。','跟着时态变的，就是谓语。'],
  ['那谁拿着风筝？女孩自己拿着。','这里用 holding，补充说明女孩的动作。'],
  ['再给风筝加个词，broken。','风筝是坏的。','这个过去分词，描述风筝的状态。'],
  ['她停下来干什么？为了帮忙。','这里的不定式，表示目的。'],
  ['现在再读一遍。','先抓住主干，女孩停了下来。','再把其余三处放回句子里。']
];
const splits = [[0],[0],[0,.45],[0,.29,.69],[0,.43],[0,.38,.57],[0,.52],[0,.23,.64]];
const green='#216653', red='#a84b48';
const chinese='"Songti SC","SimSun","Noto Serif CJK SC","STSong",serif';

function Word({text, label, active, dim, progress}: {text:string;label?:string;active?:boolean;dim?:boolean;progress:number}){
 return <span style={{position:'relative',whiteSpace:'pre',color:dim?'#aaaeb1':'#17191a',fontWeight:active?700:500}}>
   {text}
   {active && <span style={{position:'absolute',bottom:-4,left:0,width:'100%',height:2,background:red,transformOrigin:'left',transform:`scaleX(${progress})`}}/>}
   {label && <span style={{position:'absolute',textAlign:'center',left:'50%',top:'100%',transform:'translateX(-50%)',marginTop:15,font:'600 22px "PingFang SC"',whiteSpace:'nowrap',color:green,opacity:progress}}>{label}</span>}
 </span>
}

export function Nonfinite({illustrated=false}:{illustrated?:boolean}){
 const frame=lessonClock(useCurrentFrame(), playback);
 const i=starts.reduce((idx,t,k)=>frame>=t?k:idx,0);
 const local=frame-starts[i];
 const progress=interpolate(local,[3,16],[0,1],bounds);
 const recap=i===7;
 const full=recap && local>=cues[i].frames*.64;
 const core=(recap && !full)||i===2;
 const part=(n:number)=>i===n || full;
 const showBroken=i>=5;
 const labels=full?['主动拿着','破损的','谓语','目的']:['现在分词','过去分词','谓语','不定式'];
 const intro=i<2;
 const captionIndex=splits[i].reduce((idx,t,k)=>local>=t*cues[i].frames?k:idx,0);
 const row=(left:string,middle:string,right:string)=><div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:23,fontSize:35,fontWeight:600}}><span>{left}</span><span style={{fontSize:24,color:green}}>{middle}</span><span>{right}</span></div>;
 return <AbsoluteFill style={{backgroundColor:'#fafbfc',backgroundImage:'linear-gradient(#dce0e455 1px, transparent 1px),linear-gradient(90deg,#dce0e455 1px, transparent 1px)',backgroundSize:'40px 40px',color:'#151617',fontFamily:chinese}}>
   {illustrated && <><KiteScene frame={frame} local={local} scene={i}/><LessonAudio folder="nonfinite" beats={playback}/></>}
   <header style={{position:'absolute',top:35,left:92,right:92,display:'flex',justifyContent:'space-between',fontWeight:700,fontSize:26}}><span>{titles[i]}</span><span style={{fontSize:23}}>悦享书屋英语精讲</span></header>
   <div style={{position:'absolute',top:illustrated?98:188,width:'100%',textAlign:'center',opacity:progress}}>
   {intro && <span style={{fontSize:31,fontWeight:700}}>哪个词是谓语？</span>}
   {i===2 && row('女孩','做了什么？','停了下来')}
   {i===3 && row('Yesterday · stopped','→','Every day · stops')}
   {i===4 && row('女孩','主动做这个动作　→','拿着风筝')}
   {i===5 && row('broken','描述状态　→','kite')}
   {i===6 && row('停下来','为了什么？　→','帮忙')}
   {recap && row('The girl','→','stopped.')}
   </div>
   <div style={{position:'absolute',top:illustrated?438:320,left:0,width:'100%',display:'flex',gap:11,alignItems:'baseline',justifyContent:'center',font:'45px Georgia,serif'}}>
   <Word text="The girl" active={i===2} progress={progress}/>
   <Word text="holding" active={part(4)} label={part(4)?labels[0]:undefined} dim={core} progress={progress}/>
   <Word text="a" dim={core} progress={progress}/>
   {showBroken && <Word text="broken" active={part(5)} label={part(5)?labels[1]:undefined} dim={core} progress={progress}/>}
   <Word text="kite" dim={core} progress={progress}/>
   <Word text="stopped" active={core||i===3||full} label={core||i===3||full?labels[2]:undefined} progress={progress}/>
   <Word text="to help." active={part(6)} label={part(6)?labels[3]:undefined} dim={core} progress={progress}/>
   </div>
   <div style={{position:'absolute',bottom:43,width:'100%',textAlign:'center',font:'600 26px "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif'}}><span style={{background:'#fafbfc',padding:'3px 12px'}}>{subtitles[i][captionIndex]}</span></div>
 </AbsoluteFill>
}
