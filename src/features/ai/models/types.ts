import { GRULayerArgs } from '@tensorflow/tfjs';

export interface LayerConfig {
  type: 'dense' | 'lstm' | 'attention';
  units: number;
  activation?: string;
  config?: Partial<GRULayerArgs>;
}

export interface ModelArchitecture {
  layers: LayerConfig[];
  inputShape: number[];
  outputShape: number[];
}
