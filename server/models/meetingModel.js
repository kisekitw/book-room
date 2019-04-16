const mongoose = require('mongoose'),
      Schema = mongoose.Schema;



      const roomSchema = new Schema({
        value: String,
      });


// const meetingSchema = new Schema({
//   room: {
//     type: Schema.Types.ObjectId,
//     ref: 'Room'
//   },
//   title: String,
//   hostId: {
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   startTime: { type: Date },
//   endTime: { type: Date },
//   attendees: [{
//     type: Schema.Types.ObjectId,
//     ref: 'User'
//   }]
// });

const meetingSchema = new Schema({
  room: {
    value: String
  },
  title: String,
  hostId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  startTime: { type: Date },
  endTime: { type: Date },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

meetingSchema.index({room: 1, startTime: 1, attendees: 1});

module.exports = mongoose.model('Meeting', meetingSchema);
