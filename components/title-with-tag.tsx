'use client'

import { motion } from 'framer-motion'

interface TitleWithTagProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

const TitleWithTag: React.FC<TitleWithTagProps> = ({
  children,
  className = '',
  as: Tag = 'h2'
}) => (
  <Tag className={`flex items-center gap-2 md:gap-3 ${className}`}>
    <motion.span
      className="inline-block h-6 w-2 origin-bottom rounded-sm bg-blue-500 md:h-8 md:w-1.5 md:rounded-full lg:h-10"
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
    <motion.span
      className="md:text-balance"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </Tag>
)

export default TitleWithTag
