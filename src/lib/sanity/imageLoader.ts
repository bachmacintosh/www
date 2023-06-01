export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }): string {
  const defaultQuality = 75;
  return `${src}?auto=format&w=${width}&fit=max&q=${quality ?? defaultQuality}`;
}
