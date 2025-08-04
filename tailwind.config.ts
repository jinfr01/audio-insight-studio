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
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				'border-hover': 'hsl(var(--border-hover))',
				input: 'hsl(var(--input))',
				'input-focus': 'hsl(var(--input-focus))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					subtle: 'hsl(var(--surface-subtle))',
					muted: 'hsl(var(--surface-muted))',
				},
				
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					tertiary: 'hsl(var(--text-tertiary))',
					placeholder: 'hsl(var(--text-placeholder))',
				},
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					hover: 'hsl(var(--primary-hover))',
					foreground: 'hsl(var(--primary-foreground))',
					subtle: 'hsl(var(--primary-subtle))',
					muted: 'hsl(var(--primary-muted))',
				},
				
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					hover: 'hsl(var(--secondary-hover))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					subtle: 'hsl(var(--success-subtle))',
				},
				
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					subtle: 'hsl(var(--warning-subtle))',
				},
				
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					subtle: 'hsl(var(--destructive-subtle))',
				},
				
				processing: {
					DEFAULT: 'hsl(var(--processing))',
					foreground: 'hsl(var(--processing-foreground))',
					subtle: 'hsl(var(--processing-subtle))',
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
					foreground: 'hsl(var(--card-foreground))',
					header: 'hsl(var(--card-header))',
				},
				
				waveform: {
					DEFAULT: 'hsl(var(--waveform))',
					muted: 'hsl(var(--waveform-muted))',
				},
				
				timeline: {
					segment: 'hsl(var(--timeline-segment))',
				},
				
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					border: 'hsl(var(--sidebar-border))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			boxShadow: {
				'subtle': 'var(--shadow-subtle)',
				'medium': 'var(--shadow-medium)',
				'large': 'var(--shadow-large)',
				'glow': 'var(--shadow-glow)',
			},
			transitionTimingFunction: {
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': { 
						boxShadow: '0 0 5px hsl(var(--primary) / 0.3)',
						transform: 'scale(1)'
					},
					'50%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.5), 0 0 30px hsl(var(--primary) / 0.3)',
						transform: 'scale(1.02)'
					}
				},
				'progress-fill': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'progress-fill': 'progress-fill 1s ease-out forwards',
				'fade-in': 'fade-in 0.3s ease-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
