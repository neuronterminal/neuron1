import * as tf from '@tensorflow/tfjs';
import { ModelArchitecture } from '../ai/models/types';
import { createModel } from '../ai/models/modelFactory';

export class AdvancedTrainingManager {
  private model: tf.LayersModel | null = null;
  private conceptModel: tf.LayersModel | null = null;

  async initializeModels() {
    const mainArchitecture: ModelArchitecture = {
      inputShape: [128],
      outputShape: [64],
      layers: [
        { type: 'dense', units: 256, activation: 'relu' },
        { type: 'dense', units: 128, activation: 'relu' },
        { type: 'dense', units: 64, activation: 'softmax' }
      ]
    };

    this.model = await createModel(mainArchitecture);
  }

  async loadModels() {
    try {
      this.model = await tf.loadLayersModel('localstorage://neural-chat-model');
      return true;
    } catch (error) {
      console.error('Failed to load models:', error);
      return false;
    }
  }

  async saveModels() {
    if (this.model) {
      await this.model.save('localstorage://neural-chat-model');
    }
  }

  async getModelWeights() {
    return this.model?.getWeights() || [];
  }

  async setModelWeights(weights: tf.Tensor[]) {
    if (this.model) {
      this.model.setWeights(weights);
    }
  }

  async trainOnDialogue(data: any) {
    if (!this.model) return;
    return this.model.fit(
      tf.tensor2d(data.input),
      tf.tensor2d(data.output),
      { epochs: 10 }
    );
  }

  async trainOnConcepts(data: any) {
    if (!this.conceptModel) return;
    return this.conceptModel.fit(
      tf.tensor2d(data.input),
      tf.tensor2d(data.output),
      { epochs: 10 }
    );
  }
}
