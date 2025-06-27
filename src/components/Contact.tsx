import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';

const contactMethods = [
	{
		icon: <Mail className="w-6 h-6 text-cyan-400" />,
		label: 'Email',
		value: 'sravanistar99@gmail.com',
		link: 'mailto:sravanistar99@gmail.com',
	},
	{
		icon: <Linkedin className="w-6 h-6 text-cyan-400" />,
		label: 'LinkedIn',
		value: 'linkedin.com/in/sravaniofficial',
		link: 'https://www.linkedin.com/in/sravaniofficial/',
	},
	{
		icon: <Github className="w-6 h-6 text-cyan-400" />,
		label: 'GitHub',
		value: 'github.com/eternalsunshine1707',
		link: 'https://github.com/eternalsunshine1707',
	},
	{
		icon: <MapPin className="w-6 h-6 text-cyan-400" />,
		label: 'Location',
		value: 'Arlington, Virginia',
		link: null,
	},
];

const Contact = () => (
	<section
		id="contact"
		className="min-h-screen bg-dark-950 py-24 relative overflow-hidden"
	>
		{/* Background Decoration */}
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			<div className="absolute w-[500px] h-[500px] -bottom-48 -right-24 bg-cyan-500/20 rounded-full blur-[120px]" />
			<div className="absolute w-[400px] h-[400px] top-1/3 -left-24 bg-purple-500/20 rounded-full blur-[100px]" />
		</div>
		<div className="container mx-auto px-4 lg:px-8 relative z-10">
			<div className="max-w-3xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="flex items-center justify-center gap-3 mb-4">
						<span className="w-8 h-8 text-cyan-400">✦</span>
						<h1 className="text-4xl lg:text-5xl font-bold text-white">
							GET IN TOUCH
						</h1>
						<span className="w-8 h-8 text-cyan-400">✦</span>
					</div>
					<div className="flex flex-col items-center gap-4">
						<p className="text-gray-400 max-w-2xl">
							I'm currently on the lookout for new internship or full-time
							opportunities, and I'm excited to connect!
						</p>
						<p className="text-gray-400 max-w-2xl">
							Whether you have a question, a potential collaboration, or just
							want to say hi, don't hesitate to reach out. I'll do my best to get
							back to you quickly - We might just create something amazing
							together!
						</p>
					</div>
				</div>
				{/* Unique Contact Card List */}
				<div className="flex flex-col items-center">
					<div className="w-full flex flex-col md:flex-row justify-center gap-6">
						{contactMethods.map((method) => (
							<div
								key={method.label}
								className="flex-1 min-w-[200px] max-w-xs flex flex-col items-center gap-2 bg-gradient-to-b from-cyan-900/30 to-purple-900/30 border border-white/10 rounded-xl px-6 py-6 shadow-none hover:scale-[1.03] transition-transform"
							>
								<div className="flex items-center justify-center bg-cyan-400/10 rounded-full w-12 h-12 mb-2">
									{method.icon}
								</div>
								<div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-1">
									{method.label}
								</div>
								{method.link ? (
									<a
										href={method.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white text-base font-medium hover:text-cyan-400 transition-colors text-center break-all"
									>
										{method.value}
									</a>
								) : (
									<span className="text-white text-base font-medium text-center">
										{method.value}
									</span>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	</section>
);

export default Contact;