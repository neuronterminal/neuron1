import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';

const DEFAULT_ARCHITECTURE: ModelArchitecture = {
  inputShape: [128],
  outputShape: [64],
  layers: [
    { type: 'dense', units: 256, activation: 'relu' },
    { type: 'dense', units: 128, activation: 'relu' },
    { type: 'dense', units: 64, activation: 'softmax' }
  ]
};

export class TrainingService {
  private model: tf.LayersModel | null = null;

  async initialize() {
    try {
      this.model = await tf.loadLayersModel('localstorage://neural-chat-model');
      console.log('Model loaded successfully');
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  }

  async train(data: { input: number[][], output: number[][] }) {
    if (!this.model) return;

    return this.model.fit(
      tf.tensor2d(data.input),
      tf.tensor2d(data.output),
      {
        epochs: 50,
        batchSize: 32,
        validationSplit: 0.2
      }
    );
  }
}
