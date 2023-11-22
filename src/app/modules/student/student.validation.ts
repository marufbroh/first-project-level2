import { z, ZodError } from 'zod';

const userNameValidationSchema = z.object({
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

const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, { message: "Father's name is required" }),
    fatherOccupation: z.string().min(1, { message: "Father's occupation is required" }),
    fatherContactNo: z.string().min(1, { message: "Father's contact number is required" }),
    motherName: z.string().min(1, { message: "Mother's name is required" }),
    motherOccupation: z.string().min(1, { message: "Mother's occupation is required" }),
    motherContactNo: z.string().min(1, { message: "Mother's contact number is required" }),
});

const localGuardianValidationSchema = z.object({
    name: z.string().min(1, { message: "Local guardian's name is required" }),
    occupation: z.string().min(1, { message: "Local guardian's occupation is required" }),
    address: z.string().min(1, { message: "Local guardian's address is required" }),
    contactNo: z.string().min(1, { message: "Local guardian's contact number is required" }),
});

const studentValidationSchema = z.object({
    id: z.string().min(1, { message: "ID is required" }),
    password: z.string().max(20),
    name: userNameValidationSchema,
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
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(["active", "blocked"]).default("active"),
});

export default studentValidationSchema;