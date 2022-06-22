import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useMutation } from 'react-query';
import { registerUser } from '../../api';

function RegisterPage() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });
    const mutation = useMutation<string, AxiosError, Parameters<typeof registerUser>['0']>(registerUser, {
        onMutate: () => {
            showNotification({
                id: 'register',
                title: 'Creating account',
                message: 'Please wait...',
                loading: true,
            });
        },
        onSuccess: () => {
            updateNotification({
                id: 'register',
                title: 'Success',
                message: 'Successfully created account',
            });

            router.push('/auth/login');
        },
        onError: () => {
            updateNotification({
                id: 'register',
                title: 'Error',
                message: 'Could not create account',
            });
        },
    });
    return (
        <>
            <Head>
                <title>Register User</title>
            </Head>
            <Container>
                <Title>Register</Title>
                <Paper withBorder shadow='md' p={30} mt='{30}' radius='md'>
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                        <TextInput
                            label='Email'
                            placeholder='johndoe.example.fr'
                            required
                            {...form.getInputProps('email')}></TextInput>
                        <TextInput
                            label='Username'
                            placeholder='MySuperCoolUserName'
                            required
                            {...form.getInputProps('username')}></TextInput>
                        <PasswordInput
                            label='Password'
                            placeholder='A Strong Password'
                            required
                            {...form.getInputProps('password')}></PasswordInput>
                        <PasswordInput
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            required
                            {...form.getInputProps('confirmPassword')}></PasswordInput>
                        <Button type='submit'>Register</Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}
export default RegisterPage;
