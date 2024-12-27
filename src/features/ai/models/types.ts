import { layers } from '@tensorflow/tfjs';

export interface LayerConfig {
  type: 'dense' | 'lstm' | 'attention';
  units: number;
  activation?: string;
  config?: Partial<layers.LayerArgs>;
}

export interface ModelArchitecture {
  inputShape: number[];
  outputShape: number[];
  layers: LayerConfig[];
}
