import mongoose, { Schema } from 'mongoose';

// Define the schema for the main module
const ModuleSchema = new Schema({
  main_module: { type: String, required: true },
  submodules: { type: [Schema.Types.Mixed], required: true },  // Using Mixed for dynamic content
});

const Content = mongoose.model('ContentModel', ModuleSchema);

export default Content;
