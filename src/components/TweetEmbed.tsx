'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

type TwitterWindow = Window & {
  twttr?: {
    widgets: {
      createTweet: (
        id: string,
        element: HTMLElement,
        options: Record<string, string | boolean>
      ) => Promise<HTMLElement | undefined>;
    };
  };
};

export default function TweetEmbed({ id }: { id: string }) {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const twitter = (window as TwitterWindow).twttr;
    const host = container.current;
    if (!ready || !host || !twitter?.widgets) return;

    const colorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    let generation = 0;

    const renderTweet = () => {
      const currentGeneration = ++generation;
      const mount = document.createElement('div');
      host.replaceChildren(mount);
      setLoaded(false);
      twitter.widgets.createTweet(id, mount, {
        conversation: 'none',
        align: 'center',
        dnt: true,
        theme: colorScheme.matches ? 'dark' : 'light',
      }).then((element) => {
        if (currentGeneration === generation) setLoaded(Boolean(element));
      }).catch(() => {
        if (currentGeneration === generation) setLoaded(false);
      });
    };

    renderTweet();
    colorScheme.addEventListener('change', renderTweet);
    return () => {
      generation++;
      colorScheme.removeEventListener('change', renderTweet);
      host.replaceChildren();
    };
  }, [id, ready]);

  return (
    <div className="not-prose my-8">
      <div ref={container} />
      {!loaded && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <a href={`https://x.com/sama/status/${id}`} target="_blank" rel="noopener noreferrer">
            View Sam Altman’s endorsement on X
          </a>
        </p>
      )}
      <Script src="https://platform.twitter.com/widgets.js" onReady={() => setReady(true)} />
    </div>
  );
}
