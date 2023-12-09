import { z, ZodError } from 'zod';


const createUserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1, { message: "First name is required" })
        .max(20, { message: "First Name can not be more than 20 characters" })
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'First name should be in capitalize format',
        }),
    middleName: z.string().optional(),
    lastName: z.string()
        // .refine(value => validator.isAlpha(value), { message: "Last name is not valid" })
        .min(1, { message: "Last name is required" }),
});

const createGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: "Father's name is required" }),
    fatherOccupation: z.string().min(1, { message: "Father's occupation is required" }),
    fatherContactNo: z.string().min(1, { message: "Father's contact number is required" }),
    motherName: z.string().min(1, { message: "Mother's name is required" }),
    motherOccupation: z.string().min(1, { message: "Mother's occupation is required" }),
    motherContactNo: z.string().min(1, { message: "Mother's contact number is required" }),
});

const createLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: "Local guardian's name is required" }),
    occupation: z.string().min(1, { message: "Local guardian's occupation is required" }),
    address: z.string().min(1, { message: "Local guardian's address is required" }),
    contactNo: z.string().min(1, { message: "Local guardian's contact number is required" }),
});

const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: createUserNameValidationSchema,
            gender: z.enum(['male', 'female', 'other']),
            dateOfBirth: z.string().optional(),
            email: z.string()
                .min(1, { message: "Email is required" })
                .email({ message: "Email is not a valid email type" }),
            contactNo: z.string().min(1, { message: "Contact number is required" }),
            emergencyContactNo: z.string().min(1, { message: "Emergency contact number is required" }),
            bloodGroup: z.enum(["A", "AB", "B", "O", "Rh+", "Rh-"]).optional(),
            presentAddress: z.string().min(1, { message: "Present address is required" }),
            permanentAddress: z.string().min(1, { message: "Permanent address is required" }),
            guardian: createGuardianValidationSchema,
            localGuardian: createLocalGuardianValidationSchema,
            profileImg: z.string().optional(),
            admissionSemester: z.string(),
            academicDepartment: z.string(),
        })
    })
});




const updateUserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1, { message: "First name is required" })
        .max(20, { message: "First Name can not be more than 20 characters" })
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'First name should be in capitalize format',
        }).optional(),
    middleName: z.string().optional(),
    lastName: z.string()
        // .refine(value => validator.isAlpha(value), { message: "Last name is not valid" })
        .min(1, { message: "Last name is required" }).optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: "Father's name is required" }).optional(),
    fatherOccupation: z.string().min(1, { message: "Father's occupation is required" }).optional(),
    fatherContactNo: z.string().min(1, { message: "Father's contact number is required" }).optional(),
    motherName: z.string().min(1, { message: "Mother's name is required" }).optional(),
    motherOccupation: z.string().min(1, { message: "Mother's occupation is required" }).optional(),
    motherContactNo: z.string().min(1, { message: "Mother's contact number is required" }).optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: "Local guardian's name is required" }).optional(),
    occupation: z.string().min(1, { message: "Local guardian's occupation is required" }).optional(),
    address: z.string().min(1, { message: "Local guardian's address is required" }).optional(),
    contactNo: z.string().min(1, { message: "Local guardian's contact number is required" }).optional(),
});

const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema.optional(),
            gender: z.enum(['male', 'female', 'other']).optional(),
            dateOfBirth: z.string().optional().optional(),
            email: z.string()
                .min(1, { message: "Email is required" })
                .email({ message: "Email is not a valid email type" }).optional(),
            contactNo: z.string().min(1, { message: "Contact number is required" }).optional(),
            emergencyContactNo: z.string().min(1, { message: "Emergency contact number is required" }).optional(),
            bloodGroup: z.enum(["A", "AB", "B", "O", "Rh+", "Rh-"]).optional(),
            presentAddress: z.string().min(1, { message: "Present address is required" }).optional(),
            permanentAddress: z.string().min(1, { message: "Permanent address is required" }).optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            profileImg: z.string().optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
        })
    })
});

export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};