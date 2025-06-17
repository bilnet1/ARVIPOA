import { Cookie, Settings, Shield, Eye, Globe, Monitor } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Cookie className="h-16 w-16 text-orange-600 mr-4 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                <Settings className="w-3 h-3 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Cookie Policy
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-2">
              Akosombo River View Land and Island Property Owners Association LBG
            </p>
            <p className="text-lg text-gray-600 mb-4">Understanding Our Cookie Usage</p>
            <p className="text-sm text-gray-500">Last Updated: December 27, 2024</p>
          </div>
        </div>

        {/* Cookie Types Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <Shield className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Essential Cookies</h3>
            <p className="text-gray-600 text-sm">Required for website functionality and security</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <Eye className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Analytics Cookies</h3>
            <p className="text-gray-600 text-sm">Help us understand website usage patterns</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
            <Settings className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">Functionality Cookies</h3>
            <p className="text-gray-600 text-sm">Enhance performance and user experience</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          
          {/* What are Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Cookie className="h-8 w-8 text-orange-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">What are Cookies?</h2>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-8">
              <p className="text-gray-700 text-lg mb-6">
                Cookies are small data files that are placed on your computer or mobile device when you visit our website at 
                <strong> https://www.arvipoa.org</strong>. Cookies are widely used by website owners to make their websites work 
                more efficiently and provide reporting information.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-800 mb-3">First-Party Cookies</h3>
                  <p className="text-sm text-gray-700">
                    Cookies set by ARVIPOA directly on our website to ensure proper functionality and enhance your experience.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold text-amber-800 mb-3">Third-Party Cookies</h3>
                  <p className="text-sm text-gray-700">
                    Cookies set by external parties to provide additional features like analytics, advertising, and interactive content.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why We Use Cookies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Why Do We Use Cookies?</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-4">Technical Operation</h3>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li>• Essential website functionality</li>
                  <li>• User session management</li>
                  <li>• Security features</li>
                  <li>• Error prevention</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4">User Experience</h3>
                <ul className="text-sm text-green-700 space-y-2">
                  <li>• Remember your preferences</li>
                  <li>• Improve site performance</li>
                  <li>• Personalized content</li>
                  <li>• Language settings</li>
                </ul>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-4">Analytics & Insights</h3>
                <ul className="text-sm text-purple-700 space-y-2">
                  <li>• Track website usage</li>
                  <li>• Understand user behavior</li>
                  <li>• Improve our services</li>
                  <li>• Marketing effectiveness</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookie Types */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Monitor className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Types of Cookies We Use</h2>
            </div>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">Essential Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies are strictly necessary for the website to function and cannot be disabled.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <strong className="text-gray-800">Name:</strong><br />
                      <span className="text-green-600">XSRF-TOKEN</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Purpose:</strong><br />
                      <span className="text-gray-600">Site security - prevents Cross-Site Request Forgery attacks</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Provider:</strong><br />
                      <span className="text-gray-600">www.arvipoa.org</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Expires:</strong><br />
                      <span className="text-gray-600">2 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Analytics and Customization Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies collect information about how you use our website to help us improve our services.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <strong className="text-gray-800">Name:</strong><br />
                      <span className="text-blue-600">s7</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Purpose:</strong><br />
                      <span className="text-gray-600">Gather data regarding site usage and user behavior</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Service:</strong><br />
                      <span className="text-gray-600">Adobe Analytics</span>
                    </div>
                    <div>
                      <strong className="text-gray-800">Expires:</strong><br />
                      <span className="text-gray-600">2 hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-800 mb-4">Performance and Functionality Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies enhance the performance and functionality of our website but are non-essential to their use.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    Without these cookies, certain functionality (like videos or interactive features) may become unavailable. 
                    However, the core website will still function properly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cookie Control */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Eye className="h-8 w-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">How Can You Control Cookies?</h2>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
              <p className="text-gray-700 text-lg mb-6">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights 
                by setting your preferences in the Cookie Consent Manager or through your browser settings.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-purple-800 mb-4">Cookie Consent Manager</h3>
                  <div className="bg-white rounded-lg p-4">
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li>• Found in the notification banner</li>
                      <li>• Available on our website</li>
                      <li>• Select which categories to accept or reject</li>
                      <li>• Essential cookies cannot be rejected</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-blue-800 mb-4">Browser Controls</h3>
                  <div className="bg-white rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-center p-2 bg-gray-50 rounded">Chrome</div>
                      <div className="text-center p-2 bg-gray-50 rounded">Firefox</div>
                      <div className="text-center p-2 bg-gray-50 rounded">Safari</div>
                      <div className="text-center p-2 bg-gray-50 rounded">Edge</div>
                      <div className="text-center p-2 bg-gray-50 rounded">Internet Explorer</div>
                      <div className="text-center p-2 bg-gray-50 rounded">Opera</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Other Tracking Technologies */}
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-cyan-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Other Tracking Technologies</h2>
            </div>

            <div className="bg-cyan-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-cyan-800 mb-4">Web Beacons</h3>
              <p className="text-gray-700 mb-4">
                We may use web beacons (also called "tracking pixels" or "clear gifs") - tiny graphics files that contain 
                a unique identifier that enable us to recognize when someone has visited our website or opened an email.
              </p>

              <h3 className="text-lg font-bold text-cyan-800 mb-4">Flash Cookies (Local Shared Objects)</h3>
              <p className="text-gray-700 mb-4">
                Our website may use Flash Cookies for fraud prevention and site operations. You can adjust Flash player 
                settings to control Flash Cookies storage through the Website Storage Settings Panel.
              </p>
            </div>
          </section>

          {/* Updates and Contact */}
          <section className="bg-gray-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Policy Updates and Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Policy Updates</h4>
                <p className="text-sm text-gray-600">
                  We may update this Cookie Policy from time to time to reflect changes to the cookies we use or 
                  for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly 
                  to stay informed about our use of cookies and related technologies.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Contact Us</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Address:</strong> GES Madina Office, Presec, Accra Central</p>
                  <p><strong>P.O. Box:</strong> CT3797, GM-006-0328</p>
                  <p><strong>Email:</strong> support@arvipoa.org</p>
                  <p><strong>WhatsApp:</strong> +233548411284</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}