import mongoose from 'mongoose';


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: [ true, 'Project name must be unique' ],
    },

    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    code: {
        type: String,
        default: 'console.log("Hello, JavaScript!");'
    },
    lang: {
        type: String,
        default: 'javascript'
    },
    langId: {
        type: Number,
        default: 63
    },

})


const Project = mongoose.model('project', projectSchema)


export default Project;