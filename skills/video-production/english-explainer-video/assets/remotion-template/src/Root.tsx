import {Composition} from 'remotion';
import {ThreeDays,daysFrames} from './ThreeDays';
import {Nonfinite,lessonFrames} from './Nonfinite';

const IllustratedGrammar = () => <Nonfinite illustrated/>;
export const RemotionRoot = () => <>
  <Composition id="ThreeDays" component={ThreeDays} durationInFrames={daysFrames} fps={30} width={1280} height={720}/>
  <Composition id="NonfiniteIllustrated" component={IllustratedGrammar} durationInFrames={lessonFrames} fps={30} width={1280} height={720}/>
</>;
