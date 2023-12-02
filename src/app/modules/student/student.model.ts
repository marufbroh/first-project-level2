import { Schema, model } from 'mongoose';
import validator from 'validator';
import { TGuardian, TLocalGuardian, TStudent, StudentMethods, StudentModel, TUserName } from './student.interface';
import bcrypt from "bcrypt";
import config from '../../config';
// import { boolean } from 'joi';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: [20, "First Name can not be more than 20 characters"],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: '{VALUE} is not capitalize format'
        }
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: "{VALUE} is not valid"
        }
    }
})

const guardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        required: [true, 'Father\'s name is required']
    },
    fatherOccupation: {
        type: String,
        required: [true, 'Father\'s occupation is required']
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father\'s contact number is required']
    },
    motherName: {
        type: String,
        required: [true, 'Mother\'s name is required']
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother\'s occupation is required']
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother\'s contact number is required']
    }
});


const localGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Local guardian\'s name is required']
    },
    occupation: {
        type: String,
        required: [true, 'Local guardian\'s occupation is required']
    },
    address: {
        type: String,
        required: [true, 'Local guardian\'s address is required']
    },
    contactNo: {
        type: String,
        required: [true, 'Local guardian\'s contact number is required']
    }
});


const studentSchema = new Schema<TStudent, StudentModel>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: "User",
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        maxlength: [20, "Password can not be more than 20 characters"]
    },
    name: {
        type: userNameSchema,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "{VALUE} is not a valid gender"
        },
        required: [true, 'Gender is required']
    },
    dateOfBirth: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "{VALUE} is not a valid email type"
        }
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required']
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required']
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ["A", "AB", "B", "O", "Rh+", "Rh-"],
            message: "{VALUE} is not a valid blood group"
        }
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required']
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required']
    },
    guardian: {
        type: guardianSchema,
        required: [true, 'Guardian information is required']
    },
    localGuardian: {
        type: localGuardianSchema,
        required: [true, 'Local guardian information is required']
    },
    profileImg: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        toJSON: {
            virtuals: true
        }
    });


// pre save middleware / hook : will work on create() and save()
studentSchema.pre("save", async function (next) {
    // console.log(this, "pre hook : we will save the data");

    // hashing password and save into DB
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next();
})

// post save middleware / hook
studentSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
})


// Query Middleware find
studentSchema.pre("find", function (next) {
    // console.log(this);
    this.find({ isDeleted: { $ne: true } });
    next();
})

// Query Middleware findOne
studentSchema.pre("findOne", function (next) {
    // console.log(this);
    this.findOne({ isDeleted: { $ne: true } });
    next();
})

// Query Middleware aggregate
studentSchema.pre("aggregate", function (next) {
    // console.log(this);
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next();
})


// virtual
studentSchema.virtual("fullName").get(function () {
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
})



// crating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });

    return existingUser;
}


// create a custom instance
// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id });

//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>("Student", studentSchema)