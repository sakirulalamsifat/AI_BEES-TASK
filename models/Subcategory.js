import mongoose from 'mongoose'

const subCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },

    discountEnable: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const SubCategory = mongoose.model('SubCategory', subCategorySchema)

export default SubCategory
