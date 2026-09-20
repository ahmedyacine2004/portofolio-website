import projectMark from '@/assets/icons/learnhub-mark.svg';

import type {
  UIUXProjectOverviewData,
  UIUXPrototypeData,
  UIUXUserFlowData,
  UIUXWireframesData,
} from './insight-analytics';

export const LEARNHUB_LMS_OVERVIEW_DATA: UIUXProjectOverviewData = {
  projectName: 'LearnHub LMS',
  badgeText: 'UI/UX DESIGN',
  status: 'Completed',
  category: 'EdTech / Learning Management System',
  tagline: 'A learning workspace that keeps momentum visible and support close at hand.',
  description:
    'End-to-end product design for an LMS that helps learners find the right path, continue in small focused sessions, and gives educators a clearer view of where support is needed.',
  heroImageUrl: projectMark.src,
  metadata: [
    { label: 'Role', value: 'Lead Product Designer' },
    { label: 'Timeline', value: '6 Months (Q3 2024 - Q1 2025)' },
    { label: 'Platform', value: 'Responsive Web & Mobile' },
    { label: 'Team', value: '2 Designers, 7 Engineers, 1 UXR' },
  ],
  metrics: [
    {
      label: 'Course Completion',
      value: '78%',
      change: '+28%',
      description: 'Learners completed more courses after the redesigned study path.',
    },
    {
      label: 'Weekly Learning Streaks',
      value: '64%',
      change: '+35%',
      description: 'More learners returned each week after progress became actionable.',
    },
    {
      label: 'Instructor Response Time',
      value: '18h',
      change: '-42%',
      description: 'Clearer feedback queues helped instructors respond sooner.',
    },
  ],
  problemStatement:
    'Learners entered an LMS through a dense dashboard and had to remember where they left off. Educators saw completion numbers but not the moments where students became blocked, while discussions and feedback lived in separate surfaces.',
  solutionStatement:
    'LearnHub creates one focused learning loop: a clear next lesson, lightweight practice, timely feedback, and educator signals that make intervention possible before a learner drops out.',
  designProcess: [
    {
      step: '01',
      title: 'Observe the Classroom',
      description: 'Interviewed learners, instructors, and program coordinators.',
    },
    {
      step: '02',
      title: 'Map Momentum',
      description: 'Mapped the moments from course intent to practice, feedback, and return.',
    },
    {
      step: '03',
      title: 'Test the Loop',
      description: 'Tested course discovery, lesson focus, and feedback workflows with real users.',
    },
    {
      step: '04',
      title: 'Refine for Access',
      description: 'Improved responsive layouts, keyboard flow, and content hierarchy.',
    },
  ],
  keyFeatures: [
    {
      title: 'Guided Course Discovery',
      description: 'Find the right course through goals, level, time, and learner intent.',
      icon: 'Search',
    },
    {
      title: 'Focused Study Sessions',
      description: 'Move through lessons, practice, and discussion without losing context.',
      icon: 'MessageSquare',
    },
    {
      title: 'Actionable Progress',
      description: 'See the next step as a learner and the support signal as an educator.',
      icon: 'Progress',
    },
    {
      title: 'Feedback Workspace',
      description: 'Review submissions, leave useful feedback, and keep the learner moving.',
      icon: 'MessageSquare',
    },
  ],
  colorPalette: [
    { name: 'Study Indigo', hex: '#5367C8' },
    { name: 'Progress Green', hex: '#38A67C' },
    { name: 'Focus Cyan', hex: '#2FA7B8' },
    { name: 'Ink Navy', hex: '#25354D' },
  ],
  tools: ['Figma', 'FigJam', 'Maze', 'Notion'],
};

export const LEARNHUB_LMS_USER_FLOW_DATA: UIUXUserFlowData = {
  projectName: 'LearnHub LMS',
  badgeText: 'USER FLOWS',
  category: 'Learning Momentum & Teaching Workflows',
  description:
    'Three connected journeys support discovery, focused study, and timely educator feedback.',
  totalFlowsCount: 3,
  activeFlowId: 'start-learning',
  userFlows: [
    {
      id: 'start-learning',
      title: 'Find and Start a Course',
      persona: 'Returning Learner',
      description:
        'Choose a useful course and reach the first meaningful lesson without dashboard friction.',
      estimatedTime: '6 Minutes',
      avgCompletionRate: '91%',
      frictionPoint: 'Comparing courses with different time commitments.',
      steps: [
        {
          id: 'learn-1',
          stepNumber: '01',
          screenName: 'Learning Home',
          userAction: 'Chooses a goal or continues a saved course',
          systemResponse: 'Shows a focused next lesson and relevant course paths',
          nodeType: 'screen',
        },
        {
          id: 'learn-2',
          stepNumber: '02',
          screenName: 'Course Preview',
          userAction: 'Compares level, duration, and outcomes',
          systemResponse: 'Summarizes workload, modules, and learner reviews',
          nodeType: 'action',
        },
        {
          id: 'learn-3',
          stepNumber: '03',
          screenName: 'First Lesson',
          userAction: 'Starts the first lesson and saves the course',
          systemResponse: "Creates a study plan and remembers the learner's position",
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'complete-practice',
      title: 'Complete a Practice Task',
      persona: 'Focused Learner',
      description: 'Move from lesson content to practice, reflection, and a clear next step.',
      estimatedTime: '12 Minutes',
      avgCompletionRate: '83%',
      frictionPoint: 'Knowing whether an answer is ready to submit.',
      steps: [
        {
          id: 'practice-1',
          stepNumber: '01',
          screenName: 'Lesson Focus',
          userAction: 'Reviews the concept and opens practice',
          systemResponse: 'Carries the key lesson context into the exercise',
          nodeType: 'screen',
        },
        {
          id: 'practice-2',
          stepNumber: '02',
          screenName: 'Practice Task',
          userAction: 'Completes an activity and requests a hint',
          systemResponse: 'Provides progressive guidance without revealing the answer',
          nodeType: 'action',
        },
        {
          id: 'practice-3',
          stepNumber: '03',
          screenName: 'Feedback Ready',
          userAction: 'Submits work for review',
          systemResponse: 'Confirms submission and shows the next recommended lesson',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
    {
      id: 'support-learners',
      title: 'Support Learners',
      persona: 'Course Instructor',
      description: 'Spot blocked learners, review work, and respond with feedback from one queue.',
      estimatedTime: '7 Minutes',
      avgCompletionRate: '88%',
      frictionPoint: 'Prioritizing feedback across multiple courses.',
      steps: [
        {
          id: 'support-1',
          stepNumber: '01',
          screenName: 'Teaching Overview',
          userAction: 'Opens the feedback queue',
          systemResponse: 'Prioritizes overdue work and learners showing stalled progress',
          nodeType: 'screen',
        },
        {
          id: 'support-2',
          stepNumber: '02',
          screenName: 'Submission Review',
          userAction: 'Reads the submission and adds a comment',
          systemResponse: 'Attaches feedback to the exact rubric criterion',
          nodeType: 'action',
        },
        {
          id: 'support-3',
          stepNumber: '03',
          screenName: 'Feedback Sent',
          userAction: 'Publishes feedback and marks the review complete',
          systemResponse: 'Notifies the learner and updates the teaching signal',
          nodeType: 'outcome',
          isKeyMilestone: true,
        },
      ],
    },
  ],
};

export const LEARNHUB_LMS_WIREFRAMES_DATA: UIUXWireframesData = {
  projectName: 'LearnHub LMS',
  badgeText: 'WIREFRAMES',
  category: 'Wireframing & Learning Information Architecture',
  description:
    'Structural blueprints for learner momentum, focused lessons, and educator feedback.',
  activeScreenId: 'learning-home',
  designSystemSpecs: {
    gridSystem: '12-column desktop grid with 4-column responsive mobile layout',
    typographyScale: 'Major Third (1.250) with 16px base',
    spacingUnit: '8px baseline grid',
    touchTargetMin: '44 x 44 px minimum interactive area',
  },
  screens: [
    {
      id: 'learning-home',
      title: 'Learning Home',
      fidelity: 'Mid-Fidelity',
      deviceTarget: 'Responsive Web (1440 x 900 px)',
      description:
        'A learner home that makes the next lesson, active courses, and support visible at a glance.',
      layoutGrid: '12-column dashboard with a persistent course navigation rail',
      componentsUsed: [
        'Next Lesson Card',
        'Course Progress',
        'Study Plan',
        'Activity Feed',
        'Course Navigation',
      ],
      annotations: [
        {
          id: 'home-ann-1',
          number: 1,
          title: 'Next Lesson',
          description: 'Puts one clear action above a long list of course tiles.',
          xPercentage: 55,
          yPercentage: 22,
        },
        {
          id: 'home-ann-2',
          number: 2,
          title: 'Momentum Signal',
          description:
            'Shows streak and progress as encouragement rather than a competitive score.',
          xPercentage: 55,
          yPercentage: 48,
        },
        {
          id: 'home-ann-3',
          number: 3,
          title: 'Support Feed',
          description: "Keeps instructor replies and due dates in the learner's working context.",
          xPercentage: 55,
          yPercentage: 76,
        },
      ],
    },
    {
      id: 'lesson-focus',
      title: 'Lesson Focus',
      fidelity: 'High-Fidelity',
      deviceTarget: 'Responsive Web (1440 x 900 px)',
      description:
        'A distraction-light lesson view connecting content, notes, practice, and discussion.',
      layoutGrid: 'Reading column with sticky lesson outline and contextual practice panel',
      componentsUsed: [
        'Lesson Header',
        'Progress Stepper',
        'Content Canvas',
        'Notes Panel',
        'Practice CTA',
      ],
      annotations: [
        {
          id: 'lesson-ann-1',
          number: 1,
          title: 'Lesson Context',
          description: 'Shows the outcome and estimated time before the learner begins.',
          xPercentage: 50,
          yPercentage: 16,
        },
        {
          id: 'lesson-ann-2',
          number: 2,
          title: 'Reading Progress',
          description: 'Makes position visible without turning the page into a progress dashboard.',
          xPercentage: 50,
          yPercentage: 50,
        },
        {
          id: 'lesson-ann-3',
          number: 3,
          title: 'Practice Handoff',
          description: 'Connects the concept to an immediate application while context is fresh.',
          xPercentage: 50,
          yPercentage: 86,
        },
      ],
    },
    {
      id: 'teaching-queue',
      title: 'Teaching Feedback Queue',
      fidelity: 'Low-Fidelity',
      deviceTarget: 'Responsive Web (1440 x 900 px)',
      description:
        'An instructor queue that prioritizes learner support over raw activity reporting.',
      layoutGrid: 'Filterable two-column queue with persistent submission detail panel',
      componentsUsed: [
        'Course Filter',
        'Priority Queue',
        'Learner Signal',
        'Rubric Panel',
        'Feedback Composer',
      ],
      annotations: [
        {
          id: 'queue-ann-1',
          number: 1,
          title: 'Priority Queue',
          description: 'Surfaces overdue or stalled learners before routine activity.',
          xPercentage: 28,
          yPercentage: 24,
        },
        {
          id: 'queue-ann-2',
          number: 2,
          title: 'Learner Context',
          description: 'Shows recent attempts and lesson position beside the submission.',
          xPercentage: 68,
          yPercentage: 48,
        },
        {
          id: 'queue-ann-3',
          number: 3,
          title: 'Feedback Composer',
          description:
            'Anchors comments to a rubric criterion so feedback is specific and actionable.',
          xPercentage: 68,
          yPercentage: 82,
        },
      ],
    },
  ],
};

export const LEARNHUB_LMS_PROTOTYPE_DATA: UIUXPrototypeData = {
  projectName: 'LearnHub LMS',
  badgeText: 'PROTOTYPE',
  category: 'High-Fidelity Learning Interaction Design',
  description:
    'A high-fidelity prototype for finding a course, completing a lesson, and receiving useful feedback.',
  deviceFrame: 'Responsive Desktop (1440 x 900 px)',
  defaultScreenId: 'proto-home',
  figmaEmbedUrl: 'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com',
  screens: [
    {
      id: 'proto-home',
      name: 'Learning Home',
      type: 'Home',
      description: 'Learner home with next lesson, course progress, and recent support.',
      hotspots: [
        {
          id: 'home-h1',
          label: 'Start Next Lesson',
          actionType: 'Tap',
          targetScreenId: 'proto-lesson',
          position: { xPercentage: 10, yPercentage: 30, widthPercentage: 80, heightPercentage: 12 },
        },
        {
          id: 'home-h2',
          label: 'Browse Courses',
          actionType: 'Tap',
          targetScreenId: 'proto-catalog',
          position: { xPercentage: 10, yPercentage: 52, widthPercentage: 80, heightPercentage: 10 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Course Progress Load',
          effect: 'Progress ring resolves into the next recommended lesson',
          duration: '420ms',
        },
      ],
    },
    {
      id: 'proto-catalog',
      name: 'Course Catalog',
      type: 'Analytics',
      description: 'Course discovery with goal, level, workload, and outcome filters.',
      hotspots: [
        {
          id: 'catalog-h1',
          label: 'Open Course Preview',
          actionType: 'Tap',
          targetScreenId: 'proto-preview',
          position: { xPercentage: 10, yPercentage: 35, widthPercentage: 80, heightPercentage: 15 },
        },
        {
          id: 'catalog-h2',
          label: 'Back to Learning Home',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 5, widthPercentage: 22, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Filter Select',
          effect: 'Results update in place while the selected learning goal stays visible',
          duration: '260ms',
        },
      ],
    },
    {
      id: 'proto-preview',
      name: 'Course Preview',
      type: 'Cards',
      description:
        'Course overview balancing outcomes, time commitment, modules, and learner reviews.',
      hotspots: [
        {
          id: 'preview-h1',
          label: 'Save Course',
          actionType: 'Tap',
          targetScreenId: 'proto-lesson',
          position: { xPercentage: 10, yPercentage: 82, widthPercentage: 80, heightPercentage: 10 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Save Course',
          effect: 'Course bookmark fills and the study plan confirmation appears',
          duration: '300ms',
        },
      ],
    },
    {
      id: 'proto-lesson',
      name: 'Lesson Focus',
      type: 'Transfer',
      description: 'Focused lesson content with progress, notes, and a direct practice handoff.',
      hotspots: [
        {
          id: 'lesson-h1',
          label: 'Start Practice',
          actionType: 'Tap',
          targetScreenId: 'proto-feedback',
          position: { xPercentage: 10, yPercentage: 82, widthPercentage: 80, heightPercentage: 10 },
        },
        {
          id: 'lesson-h2',
          label: 'Back to Home',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 5, yPercentage: 5, widthPercentage: 18, heightPercentage: 5 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Lesson Complete',
          effect: 'The progress stepper advances and practice becomes the active focus',
          duration: '380ms',
        },
      ],
    },
    {
      id: 'proto-feedback',
      name: 'Feedback Ready',
      type: 'Success',
      description:
        'Submission confirmation with next lesson guidance and a clear feedback expectation.',
      hotspots: [
        {
          id: 'feedback-h1',
          label: 'Return to Learning Home',
          actionType: 'Tap',
          targetScreenId: 'proto-home',
          position: { xPercentage: 10, yPercentage: 86, widthPercentage: 80, heightPercentage: 8 },
        },
      ],
      microInteractions: [
        {
          trigger: 'Submission Sent',
          effect: 'Confirmation state appears with a gentle progress pulse',
          duration: '480ms',
        },
      ],
    },
  ],
};
