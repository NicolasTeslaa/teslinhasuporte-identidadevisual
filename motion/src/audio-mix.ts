import {audioConfig,video} from './config';
import {narrationSettings} from './narration-config';
import {effectsVolume} from './narration';
import manifest from './narration-manifest.json';

export type AudioOptions={narration:boolean;effects:boolean;music:string|null};
export type AudioTrack={role:'narration'|'effects'|'music';src:string;volume:number};
export function getAudioTracks(options:AudioOptions,frame:number):AudioTrack[] {
  const tracks:AudioTrack[]=[];
  if(options.narration)tracks.push({role:'narration',src:narrationSettings.source,volume:1});
  if(options.effects)tracks.push({role:'effects',src:audioConfig.effects,volume:options.narration?effectsVolume(frame,manifest.regions):0.8});
  if(options.music)tracks.push({role:'music',src:options.music,volume:(options.narration?0.12+0.08*(effectsVolume(frame,manifest.regions)-0.18)/0.62:audioConfig.musicVolume)*Math.max(0,Math.min(1,frame/30,(video.frames-frame)/45))});
  return tracks;
}
