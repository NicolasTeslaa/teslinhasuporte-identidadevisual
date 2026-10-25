import React from 'react';
import {Composition, registerRoot} from 'remotion';
import { VervalMobileAd } from './VervalMobileAd';
import './styles.css';
import {LimpezaAd} from './limpeza/LimpezaAd';

export const Root: React.FC = () => (
  <>
    <Composition id="LimpezaAd" component={LimpezaAd} durationInFrames={900} fps={30} width={1080} height={1920} />
    <Composition id="VervalMobileAd" component={VervalMobileAd} durationInFrames={900} fps={30} width={1080} height={1920} />
  </>
);

registerRoot(Root);
