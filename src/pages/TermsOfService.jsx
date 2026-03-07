import LegalLayout from '../components/ui/LegalLayout';

const TermsOfService = () => {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <p>
          Welcome to ThreeFoldHub! We are a web design studio dedicated to crafting beautiful digital experiences for local businesses. By accessing, browsing, or utilizing our website and design services, you agree to be bound by these clear, fair, and professional Terms of Service. Please read them carefully to understand your rights, responsibilities, and our mutually beneficial relationship.
        </p>
      )
    },
    {
      id: "services",
      title: "2. Services",
      content: (
        <>
          <p>We specialize in providing comprehensive digital solutions specifically crafted for the growth of small businesses and local shops. Our core offerings include:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Website Design:</strong> Concept creation, wireframing, and visual aesthetic planning.</li>
            <li><strong>Website Development:</strong> Coding and building robust, responsive, and cross-browser functional web pages.</li>
            <li><strong>Consultation:</strong> Strategic advice on your digital presence, basic SEO principles, and optimal user experiences.</li>
          </ul>
        </>
      )
    },
    {
      id: "client-responsibilities",
      title: "3. Client Responsibilities",
      content: (
        <>
          <p>To ensure your project is completed swiftly and beautifully, successful collaboration requires your active participation. Clients are fully expected and required to:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li>Provide accurate, comprehensive information regarding your business, goals, and target audience.</li>
            <li>Supply necessary, uncopyrighted content early in the process, including raw text, specific branding guidelines, and high-quality images.</li>
            <li>Deliver timely, constructive feedback at key project milestones to prevent delays.</li>
          </ul>
        </>
      )
    },
    {
      id: "payments",
      title: "4. Payments",
      content: (
        <>
          <p>We believe in transparent, honest pricing. All project payments must adhere strictly to the mutually agreed pricing structure scoped before the project's inception. We offer straightforward tiers:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2">
            <li><strong>Basic Plan:</strong> Simple, professional single-page presence.</li>
            <li><strong>Professional Plan:</strong> Strong multi-page presence with custom animations and integrations.</li>
            <li><strong>Enterprise Plan:</strong> Fully loaded digital experience including Chatbots and CMS.</li>
            <li><strong>Custom Packages:</strong> Tailored architecture based entirely on quoted requirements.</li>
          </ul>
          <p className="mt-4 text-sm text-gray-400 italic">
            * Note that domain names and premium third-party add-ons are charged separately.
          </p>
        </>
      )
    },
    {
      id: "intellectual-property",
      title: "5. Intellectual Property",
      content: (
        <>
          <p>Upon final and complete payment for your chosen service, all final website designs, custom code components, and deliverables become the exclusive intellectual property of the client.</p>
          <p className="mt-4">
            However, we take deep pride in our handcrafted work. ThreeFoldHub respectfully retains the right to display screen captures, link references, and case studies of completed projects gracefully within our public portfolio and marketing materials.
          </p>
        </>
      )
    },
    {
      id: "limitation-of-liability",
      title: "6. Limitation of Liability",
      content: (
        <p>
          While we strive for absolute perfection, ThreeFoldHub operates utilizing various external, third-party services. We are not legally or financially responsible for indirect, consequential, or incidental damages or loss of data caused by third-party failures, server downtimes, unendorsed hosting issues, domain expiration, or unforeseen software vulnerabilities beyond our immediate control.
        </p>
      )
    },
    {
      id: "changes-to-services",
      title: "7. Changes to Services",
      content: (
        <p>
          The digital landscape evolves continually. We reserve the right to modify, suspend, or discontinue components of our services—including adjustments to our standard pricing tiers—at our discretion over time. Existing projects already under a signed or paid agreement will, of course, honor their original pricing.
        </p>
      )
    },
    {
      id: "termination",
      title: "8. Termination",
      content: (
        <p>
          Both parties maintain mutual respect. We reserve the right to respectfully pause or terminate an ongoing project or client relationship if these professional terms are severely violated, including instances of non-payment, extreme unresponsiveness, or hostile communication.
        </p>
      )
    },
    {
      id: "contact",
      title: "9. Contact Information",
      content: (
        <p>
          If you have questions, require clarification on any of our terms, or simply want to chat about a new project, please reach out via:
          <br /><br />
          <strong>Email:</strong> <a href="mailto:hubthreefold@gmail.com" className="text-accent underline hover:text-primary transition-colors">hubthreefold@gmail.com</a>
          <br />
          <strong>Phone:</strong> <a href="tel:+919980157156" className="text-accent underline hover:text-primary transition-colors">+91 99801 57156</a>
        </p>
      )
    }
  ];

  return (
    <LegalLayout 
      title="Terms of Service"
      date="March 07, 2026"
      sections={sections}
    />
  );
};

export default TermsOfService;
