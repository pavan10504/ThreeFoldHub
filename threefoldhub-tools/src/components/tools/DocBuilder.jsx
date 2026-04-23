import { useState } from 'react';
import { Download, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeUp from './FadeUp';

const DocBuilder = ({ 
  title, 
  description,
  fields, 
  onGenerate,
  defaultValues = {},
  previewContent
}) => {
  const [formData, setFormData] = useState(defaultValues);
  const [showPreview, setShowPreview] = useState(true);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onGenerate(formData);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="mb-12">
          <h1 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-primary/50">{description}</p>
          )}
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <FadeUp delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading font-medium">Form Details</h2>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="lg:hidden flex items-center gap-2 text-sm text-primary/50 hover:text-primary transition-colors"
                >
                  {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
              </div>

              <div className="space-y-6 bg-surface p-6 md:p-8 rounded-2xl border border-primary/5">
                {fields.map((field) => (
                  <FormField 
                    key={field.name}
                    field={field}
                    value={formData[field.name] || ''}
                    onChange={(value) => handleChange(field.name, value)}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="w-full py-4 px-6 bg-accent text-surface font-medium rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Generate PDF
              </motion.button>
            </div>
          </FadeUp>

          <FadeUp delay={0.2} className="hidden lg:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-heading font-medium mb-4">Preview</h2>
              <div className="bg-bg-tert rounded-2xl p-4 md:p-8 min-h-[600px] pdf-preview">
                {previewContent ? previewContent(formData) : (
                  <div className="flex items-center justify-center h-full text-primary/30">
                    <p>Fill the form to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ field, value, onChange }) => {
  const label = field.label || field.name;
  const isRequired = field.required;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">
        {label}
        {isRequired && <span className="text-accent ml-1">*</span>}
      </label>
      
      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm focus:outline-none focus:border-accent resize-none transition-colors"
        />
      ) : field.type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
        >
          <option value="">Select...</option>
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : field.type === 'number' ? (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
          step={field.step || 1}
          className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
        />
      ) : field.type === 'date' ? (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
        />
      ) : (
        <input
          type={field.type || 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className="w-full p-3 bg-bg-base border border-primary/10 rounded-lg text-sm focus:outline-none focus:border-accent transition-colors"
        />
      )}
      
      {field.hint && (
        <p className="text-xs text-primary/40">{field.hint}</p>
      )}
    </div>
  );
};

export default DocBuilder;