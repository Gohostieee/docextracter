export interface ExtractionPreset {
  id: string;
  name: string;
  description: string;
  guide: string;
}

export const EXTRACTION_PRESETS: ExtractionPreset[] = [
  {
    id: 'api-documentation',
    name: 'API Documentation URLs',
    description: 'Extract URLs to API reference docs, endpoints, and examples',
    guide: `Find and extract all URLs that link to documentation`
  },
  {
    id: 'library-documentation',
    name: 'Library/Framework Docs',
    description: 'Extract URLs to library guides, tutorials, and references',
    guide: `Find and extract URLs that link to library/framework documentation including:
- Official documentation home pages
- Getting started and installation guides
- API reference and method documentation
- Tutorial and example pages
- Configuration and setup guides
- Migration and upgrade guides
- Community guides and best practices
- Plugin and extension documentation
Prioritize official documentation and comprehensive guides.`
  },
  {
    id: 'tutorial-guides',
    name: 'Tutorials & Learning URLs',
    description: 'Extract URLs to tutorials, courses, and learning materials',
    guide: `Find and extract URLs that link to educational content including:
- Step-by-step tutorial pages
- Video course and lesson links
- Interactive coding exercises
- Code example repositories (GitHub, CodePen, etc.)
- Learning path and curriculum pages
- Workshop and bootcamp materials
- Blog posts with practical examples
- Community learning resources
Focus on URLs that provide hands-on learning experiences.`
  },
  {
    id: 'github-resources',
    name: 'GitHub & Repository URLs',
    description: 'Extract URLs to GitHub repos, issues, and project resources',
    guide: `Find and extract URLs that link to development resources including:
- GitHub repository main pages
- Issue tracker and bug report URLs
- Pull request and code review links
- Release and changelog pages
- Wiki and documentation in repos
- Code example and demo repositories
- Fork and contribution links
- Project roadmap and planning pages
Focus on URLs that provide access to source code and project information.`
  },
  {
    id: 'reference-specs',
    name: 'Specifications & References',
    description: 'Extract URLs to official specs, standards, and reference docs',
    guide: `Find and extract URLs that link to technical specifications including:
- Official specification documents
- RFC and standard documentation
- Schema and format definitions
- Protocol and API specifications
- Compliance and certification guides
- Technical white papers
- Standard library references
- Browser compatibility and support pages
Prioritize authoritative and official specification sources.`
  },
  {
    id: 'community-resources',
    name: 'Community & Support URLs',
    description: 'Extract URLs to forums, Q&A, and community resources',
    guide: `Find and extract URLs that link to community resources including:
- Stack Overflow question and answer pages
- Reddit discussion threads and subreddits
- Discord, Slack, and chat community links
- Forum and discussion board URLs
- FAQ and help center pages
- Support and troubleshooting guides
- Community wiki and knowledge bases
- Meetup and event pages
Focus on URLs where developers can get help and engage with the community.`
  },
  {
    id: 'tools-utilities',
    name: 'Tools & Utility URLs',
    description: 'Extract URLs to development tools, generators, and utilities',
    guide: `Find and extract URLs that link to development tools including:
- Online code generators and builders
- Testing and validation tools
- Converter and transformer utilities
- Package manager and registry pages
- IDE plugins and extension pages
- CLI tool documentation
- Deployment and hosting service docs
- Monitoring and analytics tool guides
Focus on URLs for tools that aid in development workflow.`
  }
];

export const CUSTOM_PRESET_ID = 'custom';