import { MetadataRoute } from 'next';
import { BlogType } from '@/service/webApi/resourceStation/type';

type Link = {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

async function getAllProjects(type = 'projects') {
  const response = await fetch('https://api.hackquest.io/v1/' + type);
  if (!response.ok) return [];

  const json = await response.json();
  const data = json.data || (Array.isArray(json) ? json : []);
  return data.map((item: BlogType) => {
    const { id, alias, updatedAt } = item;
    return {
      id,
      alias,
      updatedAt
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const hackathons = await getAllProjects('hackathons');
  const blogs = await getAllProjects('blogs');
  const glossaries = await getAllProjects('glossaries');
  const learningTracks = await getAllProjects('learning-tracks');
  const courses = await getAllProjects('courses');

  const base: Link[] = [
    {
      url: 'https://www.hackquest.io/',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: 'https://www.hackquest.io/learning-track',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://www.hackquest.io/learning-track?track=Specialization',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...learningTracks.map((track: BlogType) => ({
      url: `https://www.hackquest.io/learning-track/${track.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/electives',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://www.hackquest.io/practices',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...courses.map((course: BlogType) => ({
      url: `https://www.hackquest.io/practices/${course.id}`,
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...blogs.map((blog: BlogType) => ({
      url: `https://www.hackquest.io/blog/${blog.alias}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/hackathon',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...hackathons.map((hackathon: BlogType) => ({
      url: `https://www.hackquest.io/hackathon/${hackathon.alias}`,
      lastModified: new Date(hackathon.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    ...projects.map((project: BlogType) => ({
      url: `https://www.hackquest.io/hackathon/projects/${project.alias}`,
      lastModified: new Date(project.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/glossary',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...glossaries.map((glossary: BlogType) => ({
      url: `https://www.hackquest.io/glossary/${glossary.alias}`,
      lastModified: new Date(glossary.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7
    })),
    {
      url: 'https://www.hackquest.io/advocate',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: 'https://www.hackquest.io/events',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ];

  const languages = ['en', 'zh'];
  return languages.reduce((acc, lang) => {
    acc.push(
      ...base.map((item: Link) => {
        return {
          ...item,
          url: item.url.replace('https://www.hackquest.io/', `https://www.hackquest.io/${lang}/`)
        };
      })
    );
    return acc;
  }, [] as Link[]);
}
