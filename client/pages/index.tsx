import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import {ReactElement} from 'react';
import HomePageLayout from '../layout/Home';

//  XXXXXXXXXXXXXXXX
// GO BACK TO 2h 00'
// ^^^^^^^^^^^^^^^^^^

const Home = () => {
    return <div className={styles.container}></div>;
};

Home.getLayout = function (page: ReactElement) {
    return <HomePageLayout>{page}</HomePageLayout>;
};

export default Home;

