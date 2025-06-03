import { SiGithub , SiLinkedin } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="bg-gray-800/50 backdrop-blur-sm text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start gap-8 relative">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Lock Your Money</h3>
            <p className="text-sm">Secure your savings. Control your spending.</p>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-semibold text-white">Made with ❤️ by Json</h3>
          </div>

          <div className='md:ml-auto'>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a href="http://github.com/Json604"  target= "_blank" className="hover:text-primary-500 transition-colors"><SiGithub className='h-5 w-5'/></a>
              <a href="https://www.linkedin.com/in/kartikey10121/" target="_blank" className="hover:text-primary-500 transition-colors"><SiLinkedin className='h-5 w-5'/></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Lock Your Money. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;