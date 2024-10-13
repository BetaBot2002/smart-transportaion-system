import pkg from 'mongoose';
const {Schema,model,validator} = pkg;
import { genSalt, hash, compare } from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [50, 'Username cannot exceed 50 characters']
  },
  imageUrl:{
    type:String,
    default:""
  },
  phoneNumber: {
    type: String,
    unique: true,
    validate: [phoneNumber => phoneNumber.length === 10,"Please enter valid phone number"]
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long']
  },
  otp:{
    type:String,
    default:""
  },
  city: {
    type: String,
    trim: true
  },
  nearestRailStation: {
    type: Schema.Types.ObjectId,
    ref: "Station",
  },
  nearestMetroStation: {
    type: Schema.Types.ObjectId,
    ref: "Station",
  },
  lruTrains:{
    type:[String],
    default:[]
  },
  favouriteRoutes:{
    type:[[Schema.Types.ObjectId,Schema.Types.ObjectId]],
    ref:"Station",
    default:[]
  },
  role:{
    type:String,
    default:"user"
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {

  if (this.password && (this.isModified('password') || this.isNew)) {
    const salt = await genSalt(2);
    this.password = hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await compare(password, this.password);
};

const User = model('User', userSchema);

export default User;
