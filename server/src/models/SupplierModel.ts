import mongoose, { Schema } from "mongoose";

const SupplierSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    slug: String,
    product: String,
    categories: {
        type: [String]
    },
    price: Number,
    contact: String,
    isTaking: {
        type: Number,
        default: 0,
        enum: [0, 1],
    },
    photoUrl: String,
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const SupplierModel = mongoose.model('suppliers', SupplierSchema);
export default SupplierModel;