import { ApiError } from "../utils/ApiError.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import Content from "../models/contentModel.js";
const AddContent = catchAsyncError(async (req, res, next) => {
    try {
        const { main_module, ...submodules } = req.body;
        const submoduleArray = Object.values(submodules); // Convert submodule_1, submodule_2, etc. into an array
    
        const newModule = new Content({
          main_module,
          submodules: submoduleArray
        });
    
        const saved = await newModule.save();
        res.status(201).json(saved);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving module data' });
      }
})

const getContent = catchAsyncError(async (req,res,next)=>{
    try {
        const { main_module } = req.body;
    
        if (!main_module) {
          return res.status(400).json({ error: 'main_module is required' });
        }
    
        const moduleDoc = await Content.findOne({ main_module });
    
        if (!moduleDoc) {
          return res.status(404).json({ error: 'Module not found' });
        }
    
        res.status(200).json(moduleDoc);
      } catch (error) {
        console.error('Error fetching module:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

})
export{
    AddContent,
    getContent
}