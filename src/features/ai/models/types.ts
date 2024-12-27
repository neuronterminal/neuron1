import { LayerArgs } from '@tensorflow/tfjs';

export interface LayerConfig {
  type: 'dense' | 'lstm' | 'attention';
  units: number;
  activation?: string;
  config?: Partial<LayerArgs>;
}

export interface ModelArchitecture {
  layers: LayerConfig[];
  inputShape: number[];
  outputShape: number[];
}