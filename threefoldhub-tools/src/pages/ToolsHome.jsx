import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowRight } from 'lucide-react';

const toolCategories = [
  {
    id: 'legal',
    title: 'Legal Documents',
    description: 'Contracts and policies to protect your agency',
    icon: FileText,
    color: 'from-red-500 to-orange-500',
    tools: [
      { path: '/agreement', name: 'Basic Agreement', desc: 'Standard services contract' },
      { path: '/advance-payment', name: 'Advance Payment Policy', desc: 'Deposit and payment terms' },
      { path: '/kill-fee', name: 'Kill Fee Policy', desc: 'Project cancellation terms' },
      { path: '/file-delivery', name: 'File Delivery Policy', desc: 'Deliverable handover terms' },
    ]
  },
  {
    id: 'onboarding',
    title: 'Client Onboarding',
    description: 'Get clients ready for a successful project',
    icon: ArrowRight,
    color: 'from-blue-500 to-cyan-500',
    tools: [
      { path: '/onboarding', name: 'Onboarding Document', desc: 'Client welcome & checklist' },
      { path: '/scope-of-work', name: 'Scope of Work', desc: 'Detailed project scope' },
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Invoices',
    description: 'Professional invoice templates',
    icon: Download,
    color: 'from-green-500 to-emerald-500',
    tools: [
      { path: '/invoice', name: 'Invoice Template', desc: 'Generate professional invoices' },
    ]
  }
];

const ToolCard = ({ tool, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <Link
      to={tool.path}
      className="group block p-6 bg-surface rounded-2xl border border-primary/5 hover:border-primary/10 hover-lift"
    >
      <h4 className="font-heading font-medium text-lg mb-2 group-hover:translate-x-1 transition-transform">
        {tool.name}
      </h4>
      <p className="text-sm text-primary/50">{tool.desc}</p>
    </Link>
  </motion.div>
);

const CategorySection = ({ category, categoryIndex }) => (
  <section className="py-12 md:py-16 border-b border-primary/5 last:border-b-0">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
          <category.icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold">{category.title}</h2>
          <p className="text-primary/50">{category.description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {category.tools.map((tool, idx) => (
          <ToolCard key={tool.path} tool={tool} index={categoryIndex * 0.1 + idx * 0.05} />
        ))}
      </div>
    </div>
  </section>
);

const ToolsHome = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
            Agency Tools
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-semibold tracking-tight mb-4">
            Document Generators
          </h1>
          <p className="text-xl text-primary/50 max-w-2xl mx-auto">
            Create professional legal documents, onboarding forms, and invoices for your web design agency. All documents generate to downloadable PDFs.
          </p>
        </motion.div>

        {toolCategories.map((category, idx) => (
          <CategorySection key={category.id} category={category} categoryIndex={idx} />
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 bg-surface rounded-3xl border border-primary/5 text-center"
        >
          <h3 className="text-xl font-heading font-medium mb-2">Need custom documents?</h3>
          <p className="text-primary/50 mb-4">We can create additional tools tailored to your agency's specific workflow.</p>
          <a
            href="https://threefoldhub.in/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-surface rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolsHome;