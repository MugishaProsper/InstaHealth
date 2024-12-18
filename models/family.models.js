import mongoose from "mongoose";

const familySchema = mongoose.Schema({
  head : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  members : [ { type : mongoose.Schema.Types.ObjectId, ref : 'User' } ],
  date : { type : Date, default : Date.now },
});

const relationshipSchema = mongoose.Schema({
  user : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  family : { type : mongoose.Schema.Types.ObjectId, ref : 'Family', required : true },
  relationship : { type : String, required : true }
}, { timestamps : true });

export const Family = mongoose.model('Family', familySchema);
export const Relationship = mongoose.model('Relationship', relationshipSchema);

export default { Family, Relationship }