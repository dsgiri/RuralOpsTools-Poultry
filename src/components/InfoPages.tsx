import { Shield, Info, Scale, Mail } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-line pb-4">
        <Info className="w-8 h-8 text-board" />
        <h1 className="text-3xl font-serif text-ink tracking-tight">About Poultry</h1>
      </div>
      
      <div className="space-y-6 text-ink-soft prose max-w-none">
        <p className="text-lg">
          Poultry is a part of the RuralOpsTools network — a suite of free, ad-supported tools designed for rural operations, homesteaders, and small-scale farmers.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Offline-First Design</h2>
        <p>
          This app runs entirely in your browser. There is no cloud backend, and we do not store your data on our servers. All your egg logs, coop checks, and flock health records stay on your device using local storage.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">The RuralOpsTools Network</h2>
        <p>
          Built by Microtree LLC in Texas, our goal is to provide simple, reliable, and free digital tools for folks managing land, livestock, and rural infrastructure.
        </p>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-line pb-4">
        <Shield className="w-8 h-8 text-board" />
        <h1 className="text-3xl font-serif text-ink tracking-tight">Privacy Policy</h1>
      </div>
      
      <div className="space-y-6 text-ink-soft prose max-w-none">
        <p className="text-sm text-steel uppercase tracking-wide">Last Updated: October 2023</p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Data Storage</h2>
        <p>
          No account is required to use Poultry. All data entered into this application (egg logs, coop checks, health records) is stored exclusively via `localStorage` on your own device. It is never transmitted to, or stored on, our servers.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Cookies and AdSense</h2>
        <p>
          We use Google AdSense to serve ads, which helps keep this tool free. Google uses cookies to serve ads based on your prior visits to this website or other websites. 
        </p>
        <p>
          Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-rust hover:underline">Google Ads Settings</a>. For more information, visit <a href="https://aboutads.info" target="_blank" rel="noreferrer" className="text-rust hover:underline">aboutads.info</a>.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Analytics</h2>
        <p>
          We may use basic, anonymized analytics to understand aggregate usage of the tool (e.g., page views). This data cannot be used to identify you personally.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Children's Privacy</h2>
        <p>
          This site is not directed at children under the age of 13. We do not knowingly collect personal information from children.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Contact</h2>
        <p>
          For privacy inquiries, please contact: <a href="mailto:support@ruralopstools.com" className="text-rust hover:underline">support@ruralopstools.com</a>
        </p>
      </div>
    </div>
  );
}

export function Legal() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-line pb-4">
        <Scale className="w-8 h-8 text-board" />
        <h1 className="text-3xl font-serif text-ink tracking-tight">Legal & Disclaimer</h1>
      </div>
      
      <div className="space-y-6 text-ink-soft prose max-w-none">
        <div className="p-6 bg-kraft border border-line">
          <p className="font-medium text-ink">
            Poultry is provided for general informational purposes only. It does not constitute veterinary, agricultural, or professional advice. Consult a veterinarian or your local extension office for flock health concerns.
          </p>
        </div>
        
        <h2 className="text-xl font-serif text-ink mt-8">Terms of Use</h2>
        <p>
          By using this tool, you agree that you use it at your own risk. Microtree LLC is not responsible for any loss, damage, or harm resulting from the use of this software.
        </p>
        
        <h2 className="text-xl font-serif text-ink mt-8">Data Loss</h2>
        <p>
          Because all data is stored locally on your device, clearing your browser data, cookies, or local storage will permanently delete your records. We cannot recover lost data.
        </p>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex items-center gap-3 mb-8 border-b-2 border-line pb-4">
        <Mail className="w-8 h-8 text-board" />
        <h1 className="text-3xl font-serif text-ink tracking-tight">Contact Us</h1>
      </div>
      
      <div className="space-y-6 text-ink-soft prose max-w-none">
        <p>
          If you have questions, feedback, or issues with Poultry or the RuralOpsTools network, we'd love to hear from you.
        </p>
        
        <div className="mt-8 p-6 border border-line bg-kraft-light flex flex-col items-center justify-center gap-4 text-center">
          <Mail className="w-8 h-8 text-rust" />
          <div>
            <h3 className="font-serif text-ink text-lg">Email Support</h3>
            <a href="mailto:support@ruralopstools.com" className="text-rust hover:underline text-lg font-medium">
              support@ruralopstools.com
            </a>
          </div>
          <p className="text-sm mt-2 text-ink-soft max-w-sm">
            We aim to respond to all inquiries within 2-3 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
