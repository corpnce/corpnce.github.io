import type { APIRoute } from 'astro';

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, { expires: number; data: { jobs: unknown[]; source: string } }>();

type NormalizedJob = {
  title: string;
  company_name: string;
  candidate_required_location?: string;
  job_type?: string;
  url: string;
  description?: string;
  tags?: string[];
};

const normalizeRemotive = (data: any): NormalizedJob[] =>
  Array.isArray(data?.jobs)
    ? data.jobs.map((job: any) => ({
        title: job.title,
        company_name: job.company_name,
        candidate_required_location: job.candidate_required_location,
        job_type: job.job_type,
        url: job.url,
      }))
    : [];

const normalizeArbeitnow = (data: any): NormalizedJob[] =>
  Array.isArray(data?.data)
    ? data.data.map((job: any) => ({
        title: job.title,
        company_name: job.company_name,
        candidate_required_location: job.location,
        job_type: Array.isArray(job.tags) && job.tags.length ? job.tags[0] : undefined,
        url: job.url,
        description: job.description,
        tags: Array.isArray(job.tags) ? job.tags : [],
      }))
    : [];

export const GET: APIRoute = async ({ url }) => {
  const keyword = url.searchParams.get('keyword')?.trim() || '';
  const cacheKey = `remotive:${keyword.toLowerCase()}`;
  const now = Date.now();
  const cached = cache.get(cacheKey);

  if (cached && cached.expires > now) {
    return new Response(JSON.stringify(cached.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
    });
  }

  try {
    if (keyword) {
      const search = `?search=${encodeURIComponent(keyword)}`;
      const remotiveUrl = `https://remotive.com/api/remote-jobs${search}`;
      const remotiveResponse = await fetch(remotiveUrl, {
        headers: { Accept: 'application/json' },
      });

      if (remotiveResponse.ok) {
        const remotiveData = await remotiveResponse.json();
        const normalized = normalizeRemotive(remotiveData);
        if (normalized.length) {
          const payload = { jobs: normalized, source: 'remotive' };
          cache.set(cacheKey, { expires: now + CACHE_TTL_MS, data: payload });
          return new Response(JSON.stringify(payload), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
          });
        }
      }
    }
  } catch (error) {
    console.error('Remotive fetch failed:', error);
  }

  try {
    const arbeitnowUrl = `https://www.arbeitnow.com/api/job-board-api`;
    const arbeitnowResponse = await fetch(arbeitnowUrl, {
      headers: { Accept: 'application/json' },
    });

    if (!arbeitnowResponse.ok) {
      throw new Error(`Arbeitnow error: ${arbeitnowResponse.status}`);
    }

    const arbeitnowData = await arbeitnowResponse.json();
    const allJobs = normalizeArbeitnow(arbeitnowData);
    const tokens = keyword
      ? keyword.toLowerCase().split(/\s+/).filter(Boolean)
      : [];
    const filteredJobs = tokens.length
      ? allJobs.filter((job) => {
          const haystack = [
            job.title,
            job.description || '',
            job.company_name || '',
            ...(job.tags || []),
          ]
            .join(' ')
            .toLowerCase();
          return tokens.some((token) => haystack.includes(token));
        })
      : allJobs;
    const jobsToReturn = filteredJobs.length ? filteredJobs : allJobs;
    const payload = {
      jobs: jobsToReturn,
      source: 'arbeitnow',
      keywordFallback: filteredJobs.length === 0 && tokens.length > 0,
    };
    cache.set(cacheKey, { expires: now + CACHE_TTL_MS, data: payload });
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300' },
    });
  } catch (error) {
    console.error('Arbeitnow fetch failed:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch jobs' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
