const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },
  specifications: {
    type: String,
    required: [true, "Please Enter product Specifications"],
  },
  compatibility: {
    type: String,
    required: [true, "Please Enter product Compatibility"],
  },
  issuesRecalls: {
    type: String,
    required: [true, "Please Enter product Issues/Recalls"],
  },
  installationInstructions: {
    type: String,
    required: [true, "Please Enter product Installation Instructions"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to generate unique serviceTag and modelNumber before saving
productSchema.pre("save", function (next) {
  // Generate unique serviceTag and modelNumber here
  this.serviceTag = generateUniqueTag();
  this.modelNumber = generateUniqueNumber();

  next();
});

function generateUniqueTag() {
  // Logic to generate unique serviceTag, e.g., random string or based on other fields
  // Return the generated tag
  return "ABC" + Math.random().toString(36).substr(2, 5).toUpperCase();
}

function generateUniqueNumber() {
  // Logic to generate unique modelNumber, e.g., based on timestamp or sequential number
  // Return the generated number
  return "DELL" + Date.now().toString().substr(6);
}

module.exports = mongoose.model("Product", productSchema);
