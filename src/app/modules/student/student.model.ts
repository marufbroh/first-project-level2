import { Schema, model } from 'mongoose';
import validator from 'validator';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';


const userNameSchema = new Schema<UserName>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
        maxlength: [20, "First Name can not be more than 20 characters"],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                // console.log(firstNameStr);
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

const guardianSchema = new Schema<Guardian>({
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


const localGuardianSchema = new Schema<LocalGuardian>({
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


const studentSchema = new Schema<Student>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true
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
    isActive: {
        type: String,
        enum: {
            values: ["active", "blocked"],
            message: "{VALUE} is not a valid status"
        },
        default: "active"
    }
});

// Created a unique index on the email field
// studentSchema.index({ email: 1 }, { unique: true })

export const StudentModel = model<Student>("Student", studentSchema)