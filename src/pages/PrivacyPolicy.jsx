import LegalLayout from '../components/ui/LegalLayout';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <p>
          At ThreeFoldHub, we value your privacy and are deeply committed to protecting your personal information. This Privacy Policy outlines how our web design studio collects, uses, and safeguards your data when you interact with our website or utilize our services. We strive to be transparent about our privacy practices, ensuring your peace of mind while we help you build an impactful digital presence.
        </p>
      )
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <p>When you browse our website, submit an inquiry, or communicate with our team, we may collect the following personal information:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Personal Details:</strong> Your name.</li>
            <li><strong>Contact Information:</strong> Email address and phone number (e.g., WhatsApp).</li>
            <li><strong>Communications:</strong> Messages and requirements sent through our contact forms or direct emails.</li>
            <li><strong>Usage Data:</strong> Basic, non-identifying website usage data to help us understand how visitors interact with our content.</li>
          </ul>
        </>
      )
    },
    {
      id: "how-we-use",
      title: "3. How We Use Information",
      content: (
        <>
          <p>We do not sell or rent your data. The information we collect is strictly used to provide and enhance our services. Specifically, it may be used to:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Respond promptly and accurately to your inquiries and project requests.</li>
            <li>Communicate with you regarding our services, timelines, and project updates.</li>
            <li>Improve the functionality, layout, and overall user experience of our website.</li>
            <li>Provide ongoing customer support and technical assistance.</li>
          </ul>
        </>
      )
    },
    {
      id: "cookies",
      title: "4. Cookies and Tracking",
      content: (
        <p>
          Our website may utilize basic cookies or minimal analytics tools. These are purely meant to understand anonymous website traffic patterns—such as identifying which pages are most popular or detecting navigation errors. This helps us continually refine and improve your browsing experience. You can always manage your cookie preferences through your personal web browser's settings.
        </p>
      )
    },
    {
      id: "third-party",
      title: "5. Third Party Services",
      content: (
        <>
          <p>To safely operate our studio and provide you with high-quality services, we occasionally rely on trusted third-party partners. These parties are restricted from using your personal information for any purpose other than providing these essential functions:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Hosting Providers:</strong> Specifically for hosting our website and securely storing client project files (e.g., Vercel, GitHub).</li>
            <li><strong>Analytics Tools:</strong> To monitor basic site performance safely without intrusive tracking.</li>
            <li><strong>Messaging Platforms:</strong> Including email routing providers (like FormSubmit) and direct messaging (like WhatsApp) utilized to facilitate our conversations.</li>
          </ul>
        </>
      )
    },
    {
      id: "data-protection",
      title: "6. Data Protection",
      content: (
        <p>
          We implement commercially reasonable security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please be aware that no transmission of data over the internet or any system of electronic storage is 100% secure.
        </p>
      )
    },
    {
      id: "user-rights",
      title: "7. User Rights",
      content: (
        <>
          <p>You inherently possess the right to control your personal data. At any time, you can contact us to formally request:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Access to the personal data we currently hold about you.</li>
            <li>Modifications, updates, or corrections to any inaccurate information.</li>
            <li>Complete deletion and removal of your personal information from our active records.</li>
          </ul>
        </>
      )
    },
    {
      id: "contact",
      title: "8. Contact Information",
      content: (
        <p>
          If you have any questions, concerns, or requests relating to this Privacy Policy or the ways in which we handle your data, please contact us directly using the information below:
          <br /><br />
          <strong>Email:</strong> <a href="mailto:hubthreefold@gmail.com" className="text-accent underline hover:text-primary transition-colors">hubthreefold@gmail.com</a>
          <br />
          <strong>Phone:</strong> <a href="tel:+919980157156" className="text-accent underline hover:text-primary transition-colors">+91 99801 57156</a>
        </p>
      )
    },
    {
      id: "policy-updates",
      title: "9. Policy Updates",
      content: (
        <p>
          Our studio and the web landscape are continually evolving. As such, we may update this privacy policy occasionally to reflect changes in our practices or changes in applicable data protection laws. We encourage you to review this page periodically for the latest updates on our privacy practices.
        </p>
      )
    }
  ];

  return (
    <LegalLayout 
      title="Privacy Policy"
      date="March 07, 2026"
      sections={sections}
    />
  );
};

export default PrivacyPolicy;
