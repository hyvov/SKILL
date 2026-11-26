import {Audio,Sequence,staticFile} from 'remotion';

type Beat = {frames:number; sourceFrames:number};
export const duration = (beats:Beat[]) => beats.reduce((sum, beat) => sum + beat.frames, 0);

// Keep each animation event aligned with the recorded narration for its scene.
export function lessonClock(frame:number, beats:Beat[]) {
  let outputStart = 0;
  let sourceStart = 0;
  for (const beat of beats) {
    if (frame < outputStart + beat.frames) {
      return sourceStart + Math.floor((frame-outputStart)*beat.sourceFrames/beat.frames);
    }
    outputStart += beat.frames;
    sourceStart += beat.sourceFrames;
  }
  return sourceStart-1;
}

export function LessonAudio({folder,beats}:{folder:string; beats:Beat[]}) {
  return <>
    <Audio src={staticFile(folder+'/foley.wav')}/>
    {beats.map((beat,i)=><Sequence key={i} from={duration(beats.slice(0,i))} durationInFrames={beat.frames}>
      <Audio src={staticFile(folder+'/'+i+'.wav')}/>
    </Sequence>)}
  </>;
}
