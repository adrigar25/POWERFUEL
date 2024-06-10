import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import NavigationBar from "@components/navigation/NavigationBar";
import Footer from "@components/footer/Footer";
import { useAppContext } from '@context/AppContext';
import { Head } from './head';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { webTitle } = useAppContext();

  const adminPaths = ['/admin/', '/users/', '/cart', '/web', '/home'];
  const isFullScreen = adminPaths.some(path => router.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen ">
      <Head title={webTitle} />
      <NavigationBar />
      <div className={`${isFullScreen ? '': 'flex justify-center'}`}>
        <motion.main
          key={router.route} 
          className={`${isFullScreen?'':'max-w-[1000px] overflow-x-auto'}`}
        >
          {children}
        </motion.main>
      </div>
      <Footer />
    </div>
  );
}