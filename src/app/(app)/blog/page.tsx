import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";

const blogPosts = [
  { no: 1, keyword: "Model Toolkit", title: "Optimizing Your Business with Model Toolkit: A Complete Guide", href: "/blog/optimizing-your-business-with-model-toolkit" },
  { no: 2, keyword: "Productivity tools", title: "10 Strategic Models to Boost Your Productivity", href: "/blog/10-best-productivity-tools" },
  { no: 3, keyword: "Business models", title: "Understanding Various Business Models for Startup Growth", href: "/blog/understanding-various-business-models-for-startup-growth" },
  { no: 4, keyword: "Business strategy", title: "Formulating a Strong Business Strategy: Step-by-Step", href: "/blog/formulating-a-strong-business-strategy-step-by-step" },
  { no: 5, keyword: "Innovation", title: "Driving Innovation in Your Company: Frameworks and Ideas", href: "/blog/driving-innovation-in-your-company" },
  { no: 6, keyword: "Execution planning", title: "From Idea to Action: Keys to Successful Business Plan Execution", href: "/blog/from-idea-to-action-keys-to-successful-business-plan-execution" },
  { no: 7, keyword: "Personal development", title: "5 Personal Development Models to Reach Your Full Potential" },
  { no: 8, keyword: "Productivity enhancement", title: "Productivity Enhancement Secrets: Effective Strategies and Tools" },
  { no: 9, keyword: "Free tools", title: "Best Free Tools for Business Planning and Productivity" },
  { no: 10, keyword: "Strategic planning", title: "A Complete Guide to Strategic Planning for Small Businesses" },
  { no: 11, keyword: "Eisenhower Matrix", title: "Prioritize Your Tasks: A Guide to Mastering the Eisenhower Matrix" },
  { no: 12, keyword: "Eisenhower Matrix", title: "How the Eisenhower Matrix Changes the Way You Work" },
  { no: 13, keyword: "Task prioritization", title: "Task Prioritization Techniques: Managing Time More Effectively" },
  { no: 14, keyword: "Time management", title: "Time Management Strategies for Busy Professionals" },
  { no: 15, keyword: "SWOT Analysis", title: "Conducting an Effective SWOT Analysis for Competitive Advantage" },
  { no: 16, keyword: "Strengths weaknesses opportunities threats", title: "Identifying Your Business's Strengths, Weaknesses, Opportunities, and Threats" },
  { no: 17, keyword: "Pareto Principle", title: "The 80/20 Rule: Maximizing Results with the Pareto Principle" },
  { no: 18, keyword: "80/20 rule", title: "Applying the 80/20 Rule in Productivity and Life" },
  { no: 19, keyword: "Business Model Canvas", title: "Building a Solid Business Model Canvas for Your Startup" },
  { no: 20, keyword: "Business Model Canvas", title: "Deconstructing the Business Model Canvas: Key Elements for Success" },
  { no: 21, keyword: "Maslow's Hierarchy", title: "Understanding Employee Motivation with Maslow's Hierarchy of Needs" },
  { no: 22, keyword: "Johari Window", title: "Uncovering Your Blind Spots with the Johari Window for Better Communication" },
  { no: 23, keyword: "Johari Window", title: "Using the Johari Window for Self-Improvement and Team Relationships" },
  { no: 24, keyword: "Boston Matrix", title: "Positioning Your Products: A Guide to the Boston Consulting Group Matrix" },
  { no: 25, keyword: "Boston Consulting Group Matrix", title: "Product Portfolio Strategy with the BCG Matrix" },
  { no: 26, keyword: "Porter's Five Forces", title: "Analyzing Industry Competitiveness with Porter's Five Forces" },
  { no: 27, keyword: "Porter's Five Forces", title: "Understanding the Competitive Landscape: Applications of Porter's Five Forces" },
  { no: 28, keyword: "AIDA Model", title: "Building Effective Marketing Campaigns with the AIDA Model" },
  { no: 29, keyword: "Tuckman's Stages", title: "Tuckman's Stages of Team Development: From Forming to Performing" },
  { no: 30, keyword: "Tuckman's Stages", title: "Managing Team Dynamics: Applying Tuckman's Stages" },
  { no: 31, keyword: "McKinsey 7S Framework", title: "Measuring Organizational Health with the McKinsey 7S Framework" },
  { no: 32, keyword: "McKinsey 7S Framework", title: "Implementing the McKinsey 7S Framework for Organizational Change" },
  { no: 33, keyword: "ADKAR Model", title: "Managing Organizational Change with the ADKAR Model" },
  { no: 34, keyword: "Gantt Chart", title: "Planning Projects Efficiently Using a Gantt Chart" },
  { no: 35, keyword: "Gantt Chart", title: "A Practical Guide to Creating Gantt Charts for Project Management" },
  { no: 36, keyword: "Fishbone Diagram", title: "Identifying Root Causes with the Fishbone Diagram" },
  { no: 37, keyword: "Fishbone Diagram", title: "Problem Cause Analysis: Using the Fishbone Diagram" },
  { no: 38, keyword: "RACI Matrix", title: "Defining Roles and Responsibilities with the RACI Matrix" },
  { no: 39, keyword: "RACI Matrix", title: "Improving Project Accountability with the RACI Matrix" },
  { no: 40, keyword: "SCAMPER Model", title: "Sparking Creativity and Innovation with the SCAMPER Model" },
  { no: 41, keyword: "Diffusion of Innovations", title: "Understanding How Innovations Spread: The Theory of Diffusion of Innovations" },
  { no: 42, keyword: "Diffusion of Innovations", title: "Innovation Adoption Strategies: Lessons from Diffusion Theory" },
  { no: 43, keyword: "Flow Model", title: "Achieving Flow State for Maximum Productivity" },
  { no: 44, keyword: "FlowModel", title: "Optimizing User Experience with the Flow Model Concept" },
  { no: 45, keyword: "Change Management", title: "Successful Change Management Strategies in the Digital Era" },
  { no: 46, keyword: "Change Management", title: "Keys to Successful Change Management Implementation in Organizations" },
  { no: 47, keyword: "Communication Model", title: "Enhancing Effective Communication: Understanding Various Communication Models" },
  { no: 48, keyword: "Career planning", title: "Planning Your Dream Career: Tools and Strategies" },
  { no: 49, keyword: "Decision making", title: "Effective Decision-Making Frameworks for Leaders" },
  { no: 50, keyword: "Goal setting", title: "Setting SMART Goals: A Complete Guide to Achieving Your Dreams" },
  { no: 51, keyword: "Project management", title: "Basic Principles of Project Management for Beginners" },
  { no: 52, keyword: "Strategic frameworks", title: "Choosing the Right Strategic Framework for Your Business" },
  { no: 53, keyword: "Business analysis", title: "The Role of Business Analysis in Identifying Growth Opportunities" },
  { no: 54, keyword: "Organizational development", title: "Building Adaptive Organizations: An Organizational Development Approach" },
  { no: 55, keyword: "Personal growth", title: "Practical Steps for Sustainable Personal Growth" },
  { no: 56, keyword: "Efficiency tools", title: "Boosting Work Efficiency with the Best Digital Tools" },
  { no: 57, keyword: "Performance improvement", title: "Performance Improvement Strategies for Teams and Individuals" },
  { no: 58, keyword: "Idea generation", title: "Creative Idea Generation Techniques for Business Innovation" },
  { no: 59, keyword: "Risk assessment", title: "Conducting a Comprehensive Risk Assessment for Your Project" },
  { no: 60, keyword: "Team collaboration", title: "Enhancing Team Collaboration in a Hybrid Work Environment" },
  { no: 61, keyword: "Market analysis", title: "How to Conduct In-depth Market Analysis for New Opportunities" },
  { no: 62, keyword: "Leadership development", title: "Leadership Development Programs to Shape Future Leaders" },
  { no: 63, keyword: "Business planning", title: "Comprehensive Business Planning for Startups and SMEs" },
  { no: 64, keyword: "Strategic thinking", title: "Developing Strategic Thinking Skills for Leaders" },
  { no: 65, keyword: "Problem solving", title: "Structured Problem Solving Techniques for Complex Issues" },
  { no: 66, keyword: "Organizational structure", title: "Designing Effective Organizational Structures for Growth" },
  { no: 67, keyword: "Customer segmentation", title: "Understanding Your Customers: A Guide to Customer Segmentation" },
  { no: 68, keyword: "Value proposition", title: "Crafting a Compelling Value Proposition for Your Product" },
  { no: 69, keyword: "Competitive advantage", title: "Building Sustainable Competitive Advantage in Your Industry" },
  { no: 70, keyword: "Resource allocation", title: "Optimizing Resource Allocation for Project Success" },
  { no: 71, keyword: "Risk management", title: "Essential Principles of Risk Management in Business" },
  { no: 72, keyword: "Stakeholder management", title: "Effective Stakeholder Management for Project Success" },
  { no: 73, keyword: "Performance metrics", title: "Key Performance Metrics for Business Growth" },
  { no: 74, keyword: "Innovation process", title: "The Innovation Process: From Idea to Market" },
  { no: 75, keyword: "Strategic alignment", title: "Achieving Strategic Alignment Across Your Organization" },
  { no: 76, keyword: "Change resistance", title: "Overcoming Change Resistance in the Workplace" },
  { no: 77, keyword: "Communication strategy", title: "Developing a Robust Communication Strategy for Your Business" },
  { no: 78, keyword: "Decision making tools", title: "Top Decision-Making Tools for Business Leaders" },
  { no: 79, keyword: "Goal setting frameworks", title: "Popular Goal Setting Frameworks for Personal and Professional Success" },
  { no: 80, keyword: "Project lifecycle", title: "Understanding the Project Lifecycle: Phases and Best Practices" },
  { no: 81, keyword: "Business growth", title: "Strategies for Sustainable Business Growth and Expansion" },
  { no: 82, keyword: "Organizational culture", title: "Shaping a Positive Organizational Culture for High Performance" },
  { no: 83, keyword: "Self-improvement", title: "Practical Steps for Continuous Self-Improvement" },
  { no: 84, keyword: "Workflow optimization", title: "Optimizing Workflows for Increased Efficiency and Productivity" },
  { no: 85, keyword: "Performance management", title: "Modern Approaches to Performance Management" },
  { no: 86, keyword: "Brainstorming techniques", title: "Unleashing Creativity: Effective Brainstorming Techniques" },
  { no: 87, keyword: "Market research", title: "Conducting Effective Market Research for Business Insights" },
  { no: 88, keyword: "Team building", title: "Strategies for Effective Team Building and Cohesion" },
  { no: 89, keyword: "Leadership styles", title: "Exploring Different Leadership Styles and Their Impact" },
  { no: 90, keyword: "Strategic analysis", title: "Tools and Techniques for Strategic Analysis" },
  { no: 91, keyword: "Operational efficiency", title: "Boosting Operational Efficiency in Your Business Operations" },
  { no: 92, keyword: "Customer journey", title: "Mapping the Customer Journey for Enhanced Experience" },
  { no: 93, keyword: "Product development", title: "The Stages of Successful Product Development" },
  { no: 94, keyword: "Market entry strategy", title: "Developing a Market Entry Strategy for New Products/Services" },
  { no: 95, keyword: "Business expansion", title: "Planning for Business Expansion and New Market Opportunities" },
  { no: 96, keyword: "Talent management", title: "Best Practices in Talent Management and Development" },
  { no: 97, keyword: "Conflict resolution", title: "Effective Conflict Resolution Strategies for Teams" },
  { no: 98, keyword: "Negotiation skills", title: "Mastering Negotiation Skills for Business Success" },
  { no: 99, keyword: "Digital transformation", title: "Navigating Digital Transformation in Modern Business" },
  { no: 100, keyword: "Strategic planning models", title: "Comparing Different Strategic Planning Models for Your Needs" },
];


const BlogPostCard = ({ post }: { post: (typeof blogPosts)[0] }) => {
  const isPublished = !!post.href;

  const cardContent = (
    <Card className={cn(
        "flex flex-col h-full",
        isPublished 
          ? "transition-all duration-200 hover:shadow-md hover:-translate-y-1"
          : "bg-muted/50"
      )}>
      <CardHeader>
        <Badge variant="secondary" className="w-fit">{post.keyword}</Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <h2 className={cn(
            "text-lg font-semibold font-headline",
            !isPublished && "text-muted-foreground"
          )}>{post.title}</h2>
      </CardContent>
    </Card>
  );

  if (isPublished) {
    return <Link href={post.href}>{cardContent}</Link>;
  }

  return <div className="cursor-not-allowed">{cardContent}</div>;
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
