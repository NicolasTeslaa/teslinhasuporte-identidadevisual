import React from 'react';
import {Composition, registerRoot} from 'remotion';

const Placeholder: React.FC = () => <div style={{flex: 1, backgroundColor: '#050B1A'}} />;

export const Root: React.FC = () => (
  <>
    <Composition id="VervalMobileAd" component={Placeholder} durationInFrames={720} fps={30} width={1080} height={1920} />
  </>
);

registerRoot(Root);
