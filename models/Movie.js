const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
   title: {
       type:String,
       required: [true,'{PATH} alanı zorunludur'],
       maxlength: [50, '{PATH} alanı ({VALUE}), {MAXLENGTH}  karakterden küçük olmalıdır. '],
       minlength: [2, '{PATH} alanı ({VALUE}), {MINLENGTH}  karakterden büyük olmalıdır. ']
   },
   category: String,
   country: String,
   year: Number,
   imdb_score: Number,
   director_id: Schema.Types.ObjectId,
    createdDate: {
       type: Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('movie', MovieSchema);
