import mongoose from "mongoose";
import { fieldEncryption } from "mongoose-field-encryption";
import { randomBytes } from "node:crypto";
import { mongooseSecretKey } from "../../../config/config.service.js";

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      unique: [true, "E-mail must be unique"],
      required: [true, "E-mail is required"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "E-mail must be in right format",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "phoneNumebr is required"],
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
      required: [true, "age is required"],
    },
  },
  {
    collection: "Assgnmint-9_Users",
    strict: true,
    timestamps: true,
    optimisticConcurrency: true,
  },
);

usersSchema.plugin(fieldEncryption, {
  fields: ["phone"],
  secret: mongooseSecretKey,
  saltGenerator: function (secret) {
    return randomBytes(16);
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", usersSchema);

export default UserModel;
