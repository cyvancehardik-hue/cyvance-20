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
				signature: {
					DEFAULT: 'hsl(var(--signature))',
					muted: 'hsl(var(--signature-muted))'
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
				// Refined typography - editorial, not decorative
				display: ['Inter', 'SF Pro Display', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				sans: ['Inter', 'SF Pro Text', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['SF Mono', 'ui-monospace', 'Menlo', 'monospace']
			},
			fontSize: {
				// Reading-optimized scale
				'xs': ['0.75rem', { lineHeight: '1.5' }],
				'sm': ['0.875rem', { lineHeight: '1.6' }],
				'base': ['1rem', { lineHeight: '1.7', letterSpacing: '-0.011em' }],
				'lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '-0.014em' }],
				'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.017em' }],
				'2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.019em' }],
				'3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.021em' }],
				'4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.023em' }],
				'5xl': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
				'6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.027em' }],
				'7xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			transitionTimingFunction: {
				'narrative': 'cubic-bezier(0.22, 0.03, 0.26, 1)',
				'intent': 'cubic-bezier(0.32, 0, 0.24, 1)',
				'ambient': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'settle': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
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
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(8px)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.97)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(24px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-6px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'glow-pulse': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' }
				},
				'node-pulse': {
					'0%': { boxShadow: '0 0 0 0 hsl(var(--signature) / 0.4)' },
					'70%': { boxShadow: '0 0 0 8px hsl(var(--signature) / 0)' },
					'100%': { boxShadow: '0 0 0 0 hsl(var(--signature) / 0)' }
				},
				'marquee': {
					from: { transform: 'translateX(0)' },
					to: { transform: 'translateX(-50%)' }
				},
				'gradient-x': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.3s ease-narrative',
				'accordion-up': 'accordion-up 0.3s ease-narrative',
				'fade-in': 'fade-in 0.6s ease-narrative both',
				'fade-out': 'fade-out 0.4s ease-narrative both',
				'scale-in': 'scale-in 0.5s ease-settle both',
				'slide-up': 'slide-up 0.7s ease-narrative both',
				'float': 'float 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
				'node-pulse': 'node-pulse 2.5s ease-out infinite',
				'marquee': 'marquee 40s linear infinite',
				'gradient-x': 'gradient-x 4s ease infinite'
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
