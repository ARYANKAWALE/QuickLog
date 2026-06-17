import { Link } from "react-router-dom";
import { Zap, Share2, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 border-t border-separator">
      <div className="max-w-6xl mx-auto px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 ">
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex flex-row items-center gap-2 mb-4">
              <Zap size={24} className="text-primary" />
              <h1 className="text-xl font-bold text-primary">
                QuickLog
              </h1>
            </div>
            <p className="text-secondary max-w-sm leading-relaxed text-sm">
              The modern standard for<br />
              performance-based fitness<br />
              and nutrition tracking.
            </p>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-on-surface font-semibold">Product</h2>
              <ul className="flex flex-col gap-4 text-secondary text-sm">
                <li><Link to="#" className="hover:text-on-surface transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Workout Builder</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Integrations</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-on-surface font-semibold">Company</h2>
              <ul className="flex flex-col gap-4 text-secondary text-sm">
                <li><Link to="#" className="hover:text-on-surface transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Careers</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-on-surface font-semibold">Legal</h2>
              <ul className="flex flex-col gap-4 text-secondary text-sm">
                <li><Link to="#" className="hover:text-on-surface transition-colors">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-on-surface transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-separator mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-secondary font-medium text-sm">
          <p>© 2024 QuickLog Performance. All rights reserved.</p>
          <div className="flex items-center gap-5 text-secondary">
            <button className="hover:text-on-surface transition-colors cursor-pointer"><Share2 size={20} /></button>
            <button className="hover:text-on-surface transition-colors cursor-pointer"><Globe size={20} /></button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
