import mongoose, { Schema } from "mongoose";

interface IUser {
    username?: String;
    email: String;
    password: String;
    rule: Number;
}

const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        min: [3, "Username has at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value: any) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address format',
        },
    },
    password: {
        type: String,
        min: [5, "Password has at least 5 characters"],
        required: true
    },
    rule: {
        type: Number,
        default: 1
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
});

const UserModel = mongoose.model('users', UserSchema);
export default UserModel;

