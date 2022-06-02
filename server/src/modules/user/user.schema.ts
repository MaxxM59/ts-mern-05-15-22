import {object, string, TypeOf} from 'zod';

export const registerUserSchema = {
    body: object({
        username: string({required_error: 'Username is required !'}),
        email: string({required_error: 'Email is required !'}).email('You need a valid email !'),
        // Password min 6 & max 64 characters
        password: string({required_error: 'Password is required !'})
            .min(6, 'Password must be at least 6 characters long.')
            .max(64, 'Password should not be longer than 64 characters.'),
        confirmPassword: string({required_error: 'Password is required !'}),
    }).refine(
        // Check if password is the same than confirmPassword
        (data) => data.password === data.confirmPassword,
        {
            message: 'Passwords do not match. Please try again.',
            path: ['confirPassword'],
        }
    ),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
