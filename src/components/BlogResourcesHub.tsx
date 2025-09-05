import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Shield, 
  TrendingUp, 
  Search, 
  Clock, 
  User, 
  ChevronRight,
  Flame,
  Star,
  Eye,
  Download,
  ExternalLink,
  Filter,
  Calendar,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  { id: 'all', label: 'All Resources', icon: BookOpen },
  { id: 'blogs', label: 'Blogs', icon: FileText },
  { id: 'case-studies', label: 'Case Studies', icon: Shield },
  { id: 'research', label: 'Research Papers', icon: TrendingUp },
  { id: 'whitepapers', label: 'Whitepapers', icon: Download },
  { id: 'alerts', label: 'Security Alerts', icon: Flame }
];

const mockResources = [
  {
    id: 1,
    title: "Zero Trust Architecture: A Complete Enterprise Guide",
    category: "whitepapers",
    image: "/api/placeholder/400/200",
    excerpt: "Comprehensive framework for implementing zero trust security across enterprise infrastructure with practical deployment strategies.",
    author: "Dr. Sarah Chen",
    readTime: "12 min",
    trending: true,
    featured: true,
    date: "2024-01-15",
    views: "2.4k",
    tags: ["Zero Trust", "Enterprise", "Security"]
  },
  {
    id: 2,
    title: "Advanced Persistent Threats: Detection & Response",
    category: "research",
    image: "/api/placeholder/400/200", 
    excerpt: "Deep analysis of APT tactics and next-generation defense mechanisms using AI-powered threat hunting techniques.",
    author: "Marcus Rodriguez",
    readTime: "8 min",
    trending: false,
    featured: false,
    date: "2024-01-10",
    views: "1.8k",
    tags: ["APT", "AI", "Detection"]
  },
  {
    id: 3,
    title: "Fortune 500 Cloud Security Transformation",
    category: "case-studies",
    image: "/api/placeholder/400/200",
    excerpt: "How we secured a global enterprise's multi-cloud infrastructure and reduced security incidents by 94%.",
    author: "Alex Thompson",
    readTime: "15 min",
    trending: true,
    featured: true,
    date: "2024-01-08",
    views: "3.2k",
    tags: ["Cloud", "Case Study", "Enterprise"]
  },
  {
    id: 4,
    title: "CRITICAL: New Vulnerability in Enterprise VPNs",
    category: "alerts",
    image: "/api/placeholder/400/200",
    excerpt: "Immediate action required: Zero-day vulnerability affecting major VPN solutions. Patches and mitigation strategies inside.",
    author: "Security Team",
    readTime: "3 min",
    trending: false,
    featured: false,
    date: "2024-01-12",
    views: "5.1k",
    tags: ["Critical", "VPN", "Zero-day"]
  },
  {
    id: 5,
    title: "AI-Powered Threat Hunting: The Future is Now",
    category: "blogs",
    image: "/api/placeholder/400/200",
    excerpt: "Exploring machine learning algorithms that can predict and prevent cyber attacks before they happen.",
    author: "Jennifer Wu",
    readTime: "6 min",
    trending: true,
    featured: false,
    date: "2024-01-05",
    views: "1.9k",
    tags: ["AI", "ML", "Threat Hunting"]
  },
  {
    id: 6,
    title: "Kubernetes Security Best Practices 2024",
    category: "blogs",
    image: "/api/placeholder/400/200",
    excerpt: "Essential security configurations and monitoring strategies for production Kubernetes environments.",
    author: "David Park",
    readTime: "10 min",
    trending: false,
    featured: false,
    date: "2024-01-03",
    views: "2.1k",
    tags: ["Kubernetes", "DevOps", "Security"]
  }
];

const BlogResourcesHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterSticky, setIsFilterSticky] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isCardsInView = useInView(cardsRef, { once: true });
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    const handleScroll = () => {
      if (filterRef.current) {
        const filterTop = filterRef.current.offsetTop;
        setIsFilterSticky(window.scrollY > filterTop - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredResources = mockResources.filter(resource => resource.featured);

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Cyber Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 170, 255, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 170, 255, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        
        {/* Animated Gradient Waves */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[hsl(var(--neon-blue)/0.05)] via-transparent to-[hsl(var(--cyber-purple)/0.05)]"
        />
        
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[hsl(var(--neon-cyan)/0.03)] via-transparent to-[hsl(var(--electric-green)/0.03)]"
        />

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[hsl(var(--neon-blue))] rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Hero Zone */}
        <motion.div 
          ref={heroRef}
          className="pt-20 pb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-full bg-gradient-to-r from-[hsl(var(--neon-blue)/0.15)] to-[hsl(var(--cyber-purple)/0.15)] border border-[hsl(var(--neon-blue)/0.3)] backdrop-blur-sm"
            initial={{ scale: 0 }}
            animate={isHeroInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <BookOpen className="w-5 h-5 text-[hsl(var(--neon-blue))]" />
            <span className="text-sm font-medium">Intelligence Hub</span>
          </motion.div>

          <motion.h1 
            className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            📚 Knowledge Hub
            <br />
            <span className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--cyber-purple))] bg-clip-text text-transparent">
              Stay Ahead of Threats
            </span>
          </motion.h1>

          <motion.p 
            className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Your central command for cybersecurity intelligence. Access cutting-edge research, 
            real-world case studies, and actionable insights from our security experts.
          </motion.p>
        </motion.div>

        {/* Featured Resources Carousel */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Flame className="w-6 h-6 text-[hsl(var(--neon-cyan))]" />
            <h2 className="font-display text-2xl md:text-3xl">Featured Insights</h2>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredResources.map((resource, index) => (
              <motion.article
                key={resource.id}
                className="min-w-[400px] p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-300 group cursor-pointer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--neon-blue)/0.2)] to-[hsl(var(--cyber-purple)/0.2)] border border-[hsl(var(--neon-blue)/0.3)] flex items-center justify-center group-hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.4)] transition-all duration-300">
                    <Star className="w-8 h-8 text-[hsl(var(--neon-blue))]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(cat => cat.id === resource.category)?.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs text-[hsl(var(--neon-cyan))]">
                        Featured
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-[hsl(var(--neon-blue))] transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {resource.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {resource.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {resource.views}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        {/* Resource Grid */}
        <motion.section 
          ref={cardsRef}
          className="py-16"
          initial={{ opacity: 0 }}
          animate={isCardsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource, index) => (
              <motion.article
                key={resource.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100 
                }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  scale: 1.02
                }}
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                {/* Card Container with Glassmorphism */}
                <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-lg border border-border/50 hover:border-[hsl(var(--neon-blue)/0.5)] transition-all duration-500 overflow-hidden group-hover:shadow-[0_20px_40px_hsl(var(--neon-blue)/0.15)]">
                  
                  {/* Animated Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--neon-blue)/0.05)] to-[hsl(var(--cyber-purple)/0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            resource.category === 'alerts' 
                              ? 'bg-red-500/20 text-red-400 border-red-500/30' 
                              : ''
                          }`}
                        >
                          {categories.find(cat => cat.id === resource.category)?.label}
                        </Badge>
                        {resource.trending && (
                          <Badge variant="outline" className="text-xs text-[hsl(var(--neon-cyan))] border-[hsl(var(--neon-cyan)/0.5)]">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                        {resource.featured && (
                          <Badge variant="outline" className="text-xs text-[hsl(var(--electric-green))] border-[hsl(var(--electric-green)/0.5)]">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Image Placeholder */}
                    <div className="w-full h-48 mb-4 rounded-lg bg-gradient-to-br from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] border border-[hsl(var(--neon-blue)/0.2)] flex items-center justify-center group-hover:shadow-[inset_0_0_20px_hsl(var(--neon-blue)/0.1)] transition-all duration-300">
                      <FileText className="w-12 h-12 text-[hsl(var(--neon-blue)/0.6)]" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl mb-3 line-clamp-2 group-hover:text-[hsl(var(--neon-blue))] transition-colors duration-300">
                      {resource.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                      {resource.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span 
                          key={tagIndex}
                          className="px-2 py-1 text-xs rounded-md bg-[hsl(var(--neon-blue)/0.1)] text-[hsl(var(--neon-blue))] border border-[hsl(var(--neon-blue)/0.2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {resource.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {resource.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {resource.views}
                        </span>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="ghost"
                        className="h-8 w-8 p-0 group-hover:bg-[hsl(var(--neon-blue)/0.1)] group-hover:text-[hsl(var(--neon-blue))] transition-all duration-300"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--neon-blue)/0.1)] to-[hsl(var(--cyber-purple)/0.1)] blur-xl" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* No Results Message */}
          {filteredResources.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </motion.section>

        {/* Load More CTA */}
        <motion.div 
          className="text-center pb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button 
            size="lg"
            variant="outline"
            className="group hover:border-[hsl(var(--neon-blue))] hover:shadow-[0_0_20px_hsl(var(--neon-blue)/0.2)] transition-all duration-300"
          >
            Load More Resources
            <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogResourcesHub;