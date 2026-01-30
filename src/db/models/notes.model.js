import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      validate: {
        validator: function (value) {
          return /[a-z]/.test(value);
        },

        message: (prop) =>
          console.log(`${prop.value} must be has at least one lowerCase`),
      },
    },

    content: {
      type: String,
      required: [true, "content is required"],
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "Assginment-9_Notes",
    strict: true,
    timestamps: true,
    optimisticConcurrency: true,
    toJSON: { virtuals: true },
  },
);

//create users virtual field
notesSchema.virtual("userData", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
});

const NoteModel = mongoose.models.Note || mongoose.model("Note", notesSchema);

export default NoteModel;
