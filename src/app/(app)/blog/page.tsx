

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BlogCardImage } from "@/components/blog-card-image";

const blogPosts = [
  { no: 104, keyword: "Innovation Tools", title: "Streamlining Innovation: How to Get a Quote for Collaborative Tools like Model Toolkit", href: "/blog/streamlining-innovation-how-to-get-a-quote", publishedOn: "August 5, 2024", imageHint: "streamline innovation" },
  { no: 103, keyword: "Visual Tools", title: "Model Toolkit vs. The Classics: Comparing Modern Visual Tools for Business Strategy", href: "/blog/model-toolkit-vs-the-classics", publishedOn: "August 4, 2024", imageHint: "modern tools" },
  { no: 102, keyword: "Innovation Platforms", title: "Beyond the Canvas: The Top Platforms for Business Model Innovation You Need to Know", href: "/blog/beyond-the-canvas", publishedOn: "August 3, 2024", imageHint: "innovation platforms" },
  { no: 16, keyword: "Visual Strategy", title: "Beyond the Business Plan: How Visual Strategy Tools Can Transform Your Startup", href: "/blog/beyond-the-business-plan", publishedOn: "August 2, 2024", imageHint: "dynamic strategy" },
  { no: 15, keyword: "SWOT Analysis", title: "Conducting an Effective SWOT Analysis for Competitive Advantage", href: "/blog/conducting-an-effective-swot-analysis-for-competitive-advantage", publishedOn: "August 1, 2024", imageHint: "competitive advantage" },
  { no: 14, keyword: "Time management", title: "Time Management Strategies for Busy Professionals", href: "/blog/time-management-strategies-for-busy-professionals", publishedOn: "July 31, 2024", imageHint: "time management" },
  { no: 13, keyword: "Task prioritization", title: "Task Prioritization Techniques: Managing Time More Effectively", href: "/blog/task-prioritization-techniques-managing-time-more-effectively", publishedOn: "July 30, 2024", imageHint: "master time" },
  { no: 12, keyword: "Eisenhower Matrix", title: "How the Eisenhower Matrix Changes the Way You Work", href: "/blog/how-the-eisenhower-matrix-changes-the-way-you-work", publishedOn: "July 29, 2024", imageHint: "transform work" },
  { no: 11, keyword: "Eisenhower Matrix", title: "Prioritize Your Tasks: A Guide to Mastering the Eisenhower Matrix", href: "/blog/prioritize-your-tasks-a-guide-to-mastering-the-eisenhower-matrix", publishedOn: "July 28, 2024", imageHint: "focus matters" },
  { no: 10, keyword: "Strategic planning", title: "A Complete Guide to Strategic Planning for Small Businesses", href: "/blog/a-complete-guide-to-strategic-planning-for-small-businesses", publishedOn: "July 27, 2024", imageHint: "small business" },
  { no: 9, keyword: "Free tools", title: "Best Free Tools for Business Planning and Productivity", href: "/blog/best-free-tools-for-business-planning-and-productivity", publishedOn: "July 26, 2024", imageHint: "powerful free" },
  { no: 8, keyword: "Productivity enhancement", title: "Productivity Enhancement Secrets: Effective Strategies and Tools", href: "/blog/productivity-enhancement-secrets-effective-strategies-and-tools", publishedOn: "July 25, 2024", imageHint: "boost output" },
  { no: 1, keyword: "Model Toolkit", title: "Optimizing Your Business with Model Toolkit: A Complete Guide", href: "/blog/optimizing-your-business-with-model-toolkit", publishedOn: "July 24, 2024", imageHint: "business strategy" },
  { no: 2, keyword: "Productivity tools", title: "10 Strategic Models to Boost Your Productivity", href: "/blog/10-best-productivity-tools", publishedOn: "July 23, 2024", imageHint: "smarter thinking" },
  { no: 3, keyword: "Business models", title: "Understanding Various Business Models for Startup Growth", href: "/blog/understanding-various-business-models-for-startup-growth", publishedOn: "July 22, 2024", imageHint: "startup growth" },
  { no: 4, keyword: "Business strategy", title: "Formulating a Strong Business Strategy: Step-by-Step", href: "/blog/formulating-a-strong-business-strategy-step-by-step", publishedOn: "July 21, 2024", imageHint: "chart course" },
  { no: 5, keyword: "Innovation", title: "Driving Innovation in Your Company: Frameworks and Ideas", href: "/blog/driving-innovation-in-your-company", publishedOn: "July 20, 2024", imageHint: "new ideas" },
  { no: 6, keyword: "Execution planning", title: "From Idea to Action: Keys to Successful Business Plan Execution", href: "/blog/from-idea-to-action-keys-to-successful-business-plan-execution", publishedOn: "July 19, 2024", imageHint: "idea action" },
  { no: 7, keyword: "Personal development", title: "5 Personal Development Models to Reach Your Full Potential", href: "/blog/5-personal-development-models-to-reach-your-full-potential", publishedOn: "July 18, 2024", imageHint: "personal growth" },
  { no: 17, keyword: "Strengths weaknesses opportunities threats", title: "Identifying Your Business's Strengths, Weaknesses, Opportunities, and Threats" },
  { no: 18, keyword: "Pareto Principle", title: "The 80/20 Rule: Maximizing Results with the Pareto Principle" },
  { no: 19, keyword: "80/20 rule", title: "Applying the 80/20 Rule in Productivity and Life" },
  { no: 20, keyword: "Business Model Canvas", title: "Building a Solid Business Model Canvas for Your Startup" },
  { no: 21, keyword: "Business Model Canvas", title: "Deconstructing the Business Model Canvas: Key Elements for Success" },
  { no: 22, keyword: "Maslow's Hierarchy", title: "Understanding Employee Motivation with Maslow's Hierarchy of Needs" },
  { no: 23, keyword: "Johari Window", title: "Uncovering Your Blind Spots with the Johari Window for Better Communication" },
  { no: 24, keyword: "Johari Window", title: "Using the Johari Window for Self-Improvement and Team Relationships" },
  { no: 25, keyword: "Boston Matrix", title: "Positioning Your Products: A Guide to the Boston Consulting Group Matrix" },
  { no: 26, keyword: "Boston Consulting Group Matrix", title: "Product Portfolio Strategy with the BCG Matrix" },
  { no: 27, keyword: "Porter's Five Forces", title: "Analyzing Industry Competitiveness with Porter's Five Forces" },
  { no: 28, keyword: "Porter's Five Forces", title: "Understanding the Competitive Landscape: Applications of Porter's Five Forces" },
  { no: 29, keyword: "AIDA Model", title: "Building Effective Marketing Campaigns with the AIDA Model" },
  { no: 30, keyword: "Tuckman's Stages", title: "Tuckman's Stages of Team Development: From Forming to Performing" },
  { no: 31, keyword: "Tuckman's Stages", title: "Managing Team Dynamics: Applying Tuckman's Stages" },
  { no: 32, keyword: "McKinsey 7S Framework", title: "Measuring Organizational Health with the McKinsey 7S Framework" },
  { no: 33, keyword: "McKinsey 7S Framework", title: "Implementing the McKinsey 7S Framework for Organizational Change" },
  { no: 34, keyword: "ADKAR Model", title: "Managing Organizational Change with the ADKAR Model" },
  { no: 35, keyword: "Gantt Chart", title: "Planning Projects Efficiently Using a Gantt Chart" },
  { no: 36, keyword: "Gantt Chart", title: "A Practical Guide to Creating Gantt Charts for Project Management" },
  { no: 37, keyword: "Fishbone Diagram", title: "Identifying Root Causes with the Fishbone Diagram" },
  { no: 38, keyword: "Fishbone Diagram", title: "Problem Cause Analysis: Using the Fishbone Diagram" },
  { no: 39, keyword: "RACI Matrix", title: "Defining Roles and Responsibilities with the RACI Matrix" },
  { no: 40, keyword: "RACI Matrix", title: "Improving Project Accountability with the RACI Matrix" },
  { no: 41, keyword: "SCAMPER Model", title: "Sparking Creativity and Innovation with the SCAMPER Model" },
  { no: 42, keyword: "Diffusion of Innovations", title: "Understanding How Innovations Spread: The Theory of Diffusion of Innovations" },
  { no: 43, keyword: "Diffusion of Innovations", title: "Innovation Adoption Strategies: Lessons from Diffusion Theory" },
  { no: 44, keyword: "Flow Model", title: "Achieving Flow State for Maximum Productivity" },
  { no: 45, keyword: "FlowModel", title: "Optimizing User Experience with the Flow Model Concept" },
  { no: 46, keyword: "Change Management", title: "Successful Change Management Strategies in the Digital Era" },
  { no: 47, keyword: "Change Management", title: "Keys to Successful Change Management Implementation in Organizations" },
  { no: 48, keyword: "Communication Model", title: "Enhancing Effective Communication: Understanding Various Communication Models" },
  { no: 49, keyword: "Career planning", title: "Planning Your Dream Career: Tools and Strategies" },
  { no: 50, keyword: "Decision making", title: "Effective Decision-Making Frameworks for Leaders" },
  { no: 51, keyword: "Goal setting", title: "Setting SMART Goals: A Complete Guide to Achieving Your Dreams" },
  { no: 52, keyword: "Project management", title: "Basic Principles of Project Management for Beginners" },
  { no: 53, keyword: "Strategic frameworks", title: "Choosing the Right Strategic Framework for Your Business" },
  { no: 54, keyword: "Business analysis", title: "The Role of Business Analysis in Identifying Growth Opportunities" },
  { no: 55, keyword: "Organizational development", title: "Building Adaptive Organizations: An Organizational Development Approach" },
  { no: 56, keyword: "Personal growth", title: "Practical Steps for Sustainable Personal Growth" },
  { no: 57, keyword: "Efficiency tools", title: "Boosting Work Efficiency with the Best Digital Tools" },
  { no: 58, keyword: "Performance improvement", title: "Performance Improvement Strategies for Teams and Individuals" },
  { no: 59, keyword: "Idea generation", title: "Creative Idea Generation Techniques for Business Innovation" },
  { no: 60, keyword: "Risk assessment", title: "Conducting a Comprehensive Risk Assessment for Your Project" },
  { no: 61, keyword: "Team collaboration", title: "Enhancing Team Collaboration in a Hybrid Work Environment" },
  { no: 62, keyword: "Market analysis", title: "How to Conduct In-depth Market Analysis for New Opportunities" },
  { no: 63, keyword: "Leadership development", title: "Leadership Development Programs to Shape Future Leaders" },
  { no: 64, keyword: "Business planning", title: "Comprehensive Business Planning for Startups and SMEs" },
  { no: 65, keyword: "Strategic thinking", title: "Developing Strategic Thinking Skills for Leaders" },
  { no: 66, keyword: "Problem solving", title: "Structured Problem Solving Techniques for Complex Issues" },
  { no: 67, keyword: "Organizational structure", title: "Designing Effective Organizational Structures for Growth" },
  { no: 68, keyword: "Customer segmentation", title: "Understanding Your Customers: A Guide to Customer Segmentation" },
  { no: 69, keyword: "Value proposition", title: "Crafting a Compelling Value Proposition for Your Product" },
  { no: 70, keyword: "Competitive advantage", title: "Building Sustainable Competitive Advantage in Your Industry" },
  { no: 71, keyword: "Resource allocation", title: "Optimizing Resource Allocation for Project Success" },
  { no: 72, keyword: "Risk management", title: "Essential Principles of Risk Management in Business" },
  { no: 73, keyword: "Stakeholder management", title: "Effective Stakeholder Management for Project Success" },
  { no: 74, keyword: "Performance metrics", title: "Key Performance Metrics for Business Growth" },
  { no: 75, keyword: "Innovation process", title: "The Innovation Process: From Idea to Market" },
  { no: 76, keyword: "Strategic alignment", title: "Achieving Strategic Alignment Across Your Organization" },
  { no: 77, keyword: "Change resistance", title: "Overcoming Change Resistance in the Workplace" },
  { no: 78, keyword: "Communication strategy", title: "Developing a Robust Communication Strategy for Your Business" },
  { no: 79, keyword: "Decision making tools", title: "Top Decision-Making Tools for Business Leaders" },
  { no: 80, keyword: "Goal setting frameworks", title: "Popular Goal Setting Frameworks for Personal and Professional Success" },
  { no: 81, keyword: "Project lifecycle", title: "Understanding the Project Lifecycle: Phases and Best Practices" },
  { no: 82, keyword: "Business growth", title: "Strategies for Sustainable Business Growth and Expansion" },
  { no: 83, keyword: "Organizational culture", title: "Shaping a Positive Organizational Culture for High Performance" },
  { no: 84, keyword: "Self-improvement", title: "Practical Steps for Continuous Self-Improvement" },
  { no: 85, keyword: "Workflow optimization", title: "Optimizing Workflows for Increased Efficiency and Productivity" },
  { no: 86, keyword: "Performance management", title: "Modern Approaches to Performance Management" },
  { no: 87, keyword: "Brainstorming techniques", title: "Unleashing Creativity: Effective Brainstorming Techniques" },
  { no: 88, keyword: "Market research", title: "Conducting Effective Market Research for Business Insights" },
  { no: 89, keyword: "Team building", title: "Strategies for Effective Team Building and Cohesion" },
  { no: 90, keyword: "Leadership styles", title: "Exploring Different Leadership Styles and Their Impact" },
  { no: 91, keyword: "Strategic analysis", title: "Tools and Techniques for Strategic Analysis" },
  { no: 92, keyword: "Operational efficiency", title: "Boosting Operational Efficiency in Your Business Operations" },
  { no: 93, keyword: "Customer journey", title: "Mapping the Customer Journey for Enhanced Experience" },
  { no: 94, keyword: "Product development", title: "The Stages of Successful Product Development" },
  { no: 95, keyword: "Market entry strategy", title: "Developing a Market Entry Strategy for New Products/Services" },
  { no: 96, keyword: "Business expansion", title: "Planning for Business Expansion and New Market Opportunities" },
  { no: 97, keyword: "Talent management", title: "Best Practices in Talent Management and Development" },
  { no: 98, keyword: "Conflict resolution", title: "Effective Conflict Resolution Strategies for Teams" },
  { no: 99, keyword: "Negotiation skills", title: "Mastering Negotiation Skills for Business Success" },
  { no: 100, keyword: "Digital transformation", title: "Navigating Digital Transformation in Modern Business" },
  { no: 101, keyword: "Strategic planning models", title: "Comparing Different Strategic Planning Models for Your Needs" },
].sort((a, b) => (b.publishedOn || "").localeCompare(a.publishedOn || ""));


const BlogPostCard = ({ post }: { post: (typeof blogPosts)[number] & { imageUrl?: string, imageHint?: string } }) => {
  const isPublished = !!post.href;

  const cardContent = (
    <Card className={cn(
        "flex flex-col h-full overflow-hidden",
        isPublished 
          ? "transition-all duration-200 hover:shadow-md hover:-translate-y-1"
          : "bg-muted/50"
      )}>
      
      <div className="relative aspect-video bg-muted/20">
        {isPublished && post.href ? (
          <BlogCardImage href={post.href} />
        ) : post.imageUrl && (
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={post.imageHint}
            />
        )}
      </div>

      <div className="flex flex-col flex-grow p-4">
        <Badge variant="secondary" className="w-fit mb-2">{post.keyword}</Badge>
        <h2 className={cn(
            "text-lg font-semibold font-headline flex-grow",
            !isPublished && "text-muted-foreground"
          )}>{post.title}</h2>
        {isPublished && post.publishedOn && (
          <p className="text-xs text-muted-foreground mt-2">{post.publishedOn}</p>
        )}
      </div>
    </Card>
  );

  if (isPublished) {
    return <Link href={post.href}>{cardContent}</Link>;
  }

  return <div className="cursor-not-allowed h-full">{cardContent}</div>;
};

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-headline">Blog</h1>
        <p className="text-xl text-muted-foreground">Insights on productivity, strategy, and innovation.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.no} post={post} />
        ))}
      </div>
    </div>
  );
}
