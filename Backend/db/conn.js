const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Collaborative_Code_Editor',()=>{
    console.log("Connected to mongoo");
}
);
