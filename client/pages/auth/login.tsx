import { Button, Container, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useMutation } from 'react-query';
import { loginUser } from '../../api';

function LoginPage() {
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
        },
    });
    const mutation = useMutation<string, AxiosError, Parameters<typeof loginUser>['0']>(loginUser, {
        onSuccess: () => {
            router.push('/');
        },
        onError: () => {
            updateNotification({
                id: 'register',
                title: 'Error',
                message: 'There was an error, please try again',
            });
        },
    });
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Container>
                <Title>Login</Title>
                <Paper withBorder shadow='md' p={30} mt='{30}' radius='md'>
                    <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
                        <TextInput
                            label='Email'
                            placeholder='johndoe.example.fr'
                            required
                            {...form.getInputProps('email')}></TextInput>

                        <PasswordInput
                            label='Password'
                            placeholder='A Strong Password'
                            required
                            {...form.getInputProps('password')}></PasswordInput>

                        <Button type='submit'>Login</Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
}
export default LoginPage;
