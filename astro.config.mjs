import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import legacyNotes from './scripts/remark-legacy-notes.mjs';

export default defineConfig({
  site: 'https://minchangsung0223.github.io',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      remarkPlugins: [legacyNotes, remarkMath],
      rehypePlugins: [[rehypeKatex, { strict: 'warn', throwOnError: true }]],
    }),
  },
  integrations: [starlight({
    title: "Minchang's Notes",
    description: 'Personal notes on robotics, mathematics and programming.',
    customCss: ['@fontsource/noto-sans-kr/400.css', '@fontsource/noto-sans-kr/600.css', 'katex/dist/katex.min.css', './src/styles/custom.css'],
    components: { Hero: './src/components/NotesHome.astro' },
    social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/MinchangSung0223/MinchangSung0223.github.io' }],
    sidebar: [
    {
        "label": "Mathematics",
        "items": [
            {
                "label": "Linear Algebra",
                "items": [{ "autogenerate": {
                    "directory": "mathematics/linear-algebra"
                } }]
            },
            {
                "label": "Matrix Calculus",
                "items": [{ "autogenerate": {
                    "directory": "mathematics/matrix-calculus"
                } }]
            },
            {
                "label": "Lie Group",
                "items": [{ "autogenerate": {
                    "directory": "mathematics/lie-group"
                } }]
            },
            {
                "label": "CGA",
                "items": [{ "autogenerate": {
                    "directory": "mathematics/cga"
                } }]
            }
        ]
    },
    {
        "label": "Robotics",
        "items": [
            {
                "label": "Kinematics",
                "items": [{ "autogenerate": {
                    "directory": "robotics/kinematics"
                } }]
            },
            {
                "label": "Dynamics",
                "items": [{ "autogenerate": {
                    "directory": "robotics/dynamics"
                } }]
            },
            {
                "label": "Calibration",
                "items": [{ "autogenerate": {
                    "directory": "robotics/calibration"
                } }]
            },
            {
                "label": "Control",
                "items": [{ "autogenerate": {
                    "directory": "robotics/control"
                } }]
            }
        ]
    },
    {
        "label": "Engineering",
        "items": [
            {
                "label": "ROS2",
                "items": [{ "autogenerate": {
                    "directory": "engineering/ros2"
                } }]
            },
            {
                "label": "EtherCAT",
                "items": [{ "autogenerate": {
                    "directory": "engineering/ethercat"
                } }]
            },
            {
                "label": "Real-Time",
                "items": [{ "autogenerate": {
                    "directory": "engineering/real-time"
                } }]
            },
            {
                "label": "Simulation",
                "items": [{ "autogenerate": {
                    "directory": "engineering/simulation"
                } }]
            }
        ]
    },
    {
        "label": "Programming",
        "items": [
            {
                "label": "C/C++",
                "items": [{ "autogenerate": {
                    "directory": "programming/c-cpp"
                } }]
            },
            {
                "label": "Python",
                "items": [{ "autogenerate": {
                    "directory": "programming/python"
                } }]
            },
            {
                "label": "MATLAB",
                "items": [{ "autogenerate": {
                    "directory": "programming/matlab"
                } }]
            }
        ]
    }
],
  })],
});

// Legacy note compatibility includes nested TeX rendering.
