export type SiteContent = {
  nav: {
    hero: string;
    work: string;
    experience: string;
    capabilities: string;
    about: string;
    contact: string;
  };
  hero: {
    name: string;
    title: string;
    subtitle: string;
    intro: string;
    button1: string;
    button2: string;
    linkedin: string;
    email: string;
  };
  work: {
    title: string;
    cards: Array<{
      num: string;
      title: string;
      tag: string;
      context: string;
      responsibility: string;
      actions: string;
      results: string;
      skills: string;
    }>;
    labels: {
      context: string;
      responsibility: string;
      actions: string;
      results: string;
    };
  };
  experience: {
    title: string;
    entries: Array<{
      date: string;
      role: string;
      company: string;
      location: string;
      summary: string;
    }>;
  };
  capabilities: {
    title: string;
    groups: Array<{
      name: string;
      desc: string;
    }>;
  };
  about: {
    title: string;
    text: string[];
  };
  education: {
    label: string;
    school: string;
    period: string;
    degrees: string;
  };
  contact: {
    title: string;
    heading: string;
    body: string;
    bodyExtra: string;
    email: string;
    emailLabel: string;
    linkedin: string;
    linkedinLabel: string;
    button: string;
  };
};
