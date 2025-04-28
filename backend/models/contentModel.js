import mongoose, { Schema } from 'mongoose';

// Define the schema for the main module
const ModuleSchema = new Schema({
  main_module: { type: String, required: true },
  overview_content: {
    description: String,
    adoption_date: String,
    "42nd_amendment": {
      year: Number,
      added_words: [String]
    },
    significance: String,
    visual_note: String
  },
  submodules: [{
    title: String,
    content: Schema.Types.Mixed
  }]
}, { collection: 'contents' });

const Content = mongoose.model('Content', ModuleSchema);

export default Content;
