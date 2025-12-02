import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			backgroundSize: {
				'300%': '300%',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				display: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0', opacity: '0' },
					to: { height: 'var(--radix-accordion-content-height)', opacity: '1' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)', opacity: '1' },
					to: { height: '0', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'glow-pulse': {
					'0%, 100%': { filter: 'drop-shadow(0 0 0px hsl(var(--neon-blue)/0))' },
					'50%': { filter: 'drop-shadow(0 0 16px hsl(var(--neon-blue)/0.55))' }
				},
				'node-pulse': {
					'0%': { boxShadow: '0 0 0 0 hsl(var(--neon-blue)/0.6)' },
					'70%': { boxShadow: '0 0 0 10px hsl(var(--neon-blue)/0)' },
					'100%': { boxShadow: '0 0 0 0 hsl(var(--neon-blue)/0)' }
				},
				'marquee': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' }
				},
				'gradient-x': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' }
				},
				'shimmer': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'premium-float': {
					'0%, 100%': { transform: 'translateY(0) rotateX(0deg)' },
					'50%': { transform: 'translateY(-20px) rotateX(5deg)' }
				},
				'particle-rise': {
					'0%': { opacity: '0', transform: 'translateY(100px) scale(0)' },
					'20%': { opacity: '1' },
					'80%': { opacity: '1' },
					'100%': { opacity: '0', transform: 'translateY(-100px) scale(1.5)' }
				},
				'border-flow': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' }
				},
				'holographic': {
					'0%, 100%': { 
						backgroundPosition: '0% 50%',
						filter: 'hue-rotate(0deg)'
					},
					'50%': { 
						backgroundPosition: '100% 50%',
						filter: 'hue-rotate(30deg)'
					}
				},
				'cyber-scan': {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'50%': { opacity: '1' },
					'100%': { transform: 'translateY(100%)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.4s ease-out both',
				'float': 'float 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2.2s ease-in-out infinite',
				'node-pulse': 'node-pulse 2s ease-out infinite',
				'marquee': 'marquee 30s linear infinite',
				'gradient-x': 'gradient-x 3s ease infinite',
				'shimmer': 'shimmer 3s ease-in-out infinite',
				'premium-float': 'premium-float 4s ease-in-out infinite',
				'particle-rise': 'particle-rise 6s ease-in-out infinite',
				'border-flow': 'border-flow 3s ease-in-out infinite',
				'holographic': 'holographic 3s ease-in-out infinite',
				'cyber-scan': 'cyber-scan 4s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
