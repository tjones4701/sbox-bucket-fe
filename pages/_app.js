import 'antd/dist/antd.dark.min.css';
import "reflect-metadata";
import PageLayout from "../src/components/layouts/PageLayout";
import '../static/jank-empty.less';
import '../styles/colors.scss';
import '../styles/globals.less';



function MyApp({ Component, pageProps }) {
    return (
        <>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>
        </>
    );
}

export default MyApp
